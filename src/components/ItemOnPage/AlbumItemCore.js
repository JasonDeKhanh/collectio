import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

import { useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import AddBoxIcon from "@material-ui/icons/AddBox";

import { fade } from "@material-ui/core/styles/colorManipulator";

import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import BuildIcon from "@material-ui/icons/Build";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import firebase from "@firebase/app";
import "@firebase/firestore";
import "@firebase/storage";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

// added items card style
// const useStylesCard = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//     height: "100%",
//     border: "1px solid #B5B5B5",
//   },
//   cardTitle: {
//     fontSize: [16],
//     overflow: "hidden",
//   },
//   media: {
//     // height: "100%",
//     //width: 200,
//     height: "70%",
//     display: "flex",
//     objectFit: "cover",
//     margin: "auto",
//     marginTop: 5,
//     marginBottom: 5,
//   },
//   header: {
//     height: 35,
//     overflow: "hidden",
//     display: "block",
//     paddingTop: 13,
//     paddingBottom: 0,
//   },
//   button: {
//     margin: "auto",
//     width: 20,
//     height: 20,
//     paddingLeft: 0,
//   },
// }));

const useStylesItem = makeStyles((theme) => ({
  // root: {
  //   display: "flex",
  //   //flexWrap: "wrap",
  //   justifyContent: "space-evenly",
  //   overflow: "hidden",
  //   backgroundColor: theme.palette.background.paper,
  // },
  // gridList: {
  //   width: "100%",
  // },
  // gridTile: {},
  // icon: {
  //   color: "rgba(255, 255, 255, 0.54)",
  // },
  // buttonCreateAlbum: {
  //   backgroundColor: "#5FC9FF",
  //   height: 200,
  //   width: "100%",
  //   margin: "auto",
  //   fontSize: 20,
  //   color: "white",
  //   fontWeight: "fontWeightBold",
  // },
  gridListTileBarCover: {
    height: "100%",
    background: "transparent",
  },
  gridListTileBar: {
    background: "transparent",
  },

  iconButton: {
    background: fade("#BDBDBD", 0.8),
    "&:hover": {
      background: fade("#f00", 0.75),
    },
    border: "1px solid #717171",
  },
}));

function AlbumItemCore(props) {
  const {
    albumPages, // pages array
    currPageNum,
    setCurrPageNum,
    currID,
    currPage,
    setCurrPage,
    setAlbumPages,
    itemsAdded,
    setItemsAdded,
    thisItem,
    importedItems,
    setImportedItems,
  } = props;

  // const cardClasses = useStylesCard();
  const itemClasses = useStylesItem();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const db = firebase.firestore();
  const uid = firebase.auth().currentUser?.uid;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    const tempItemsAdded = Object.assign([], itemsAdded);
    for (var i = 0; i < tempItemsAdded.length; i++) {
      if (tempItemsAdded[i].id === thisItem.id) {
        tempItemsAdded.splice(i, 1);
        break;
      }
    }

    // update firebase
    db.collection("users")
      .doc(uid)
      .collection("albums")
      .doc(currID)
      .collection("itemsAdded")
      .doc(thisItem?.id)
      .delete()
      .then(setItemsAdded(tempItemsAdded)) // update "local" array
      .then(() => {
        // add deleted item to the importedItem list
        const tempImportedItems = Object.assign([], importedItems);
        // tempImportedItems.push(thisItem);

        // update importedItem firebase
        var lastID;
        var finalImportedItem;
        db.collection("users")
          .doc(uid)
          .collection("albums")
          .doc(currID)
          .collection("importedItems")
          .add(thisItem)
          .then((docRef) => {
            lastID = docRef?.id;
          })
          .then(() => {
            db.collection("users")
              .doc(uid)
              .collection("albums")
              .doc(currID)
              .collection("importedItems")
              .doc(lastID)
              .update({
                id: lastID,
              });
            finalImportedItem = {
              ...thisItem,
              id: lastID,
            };
          })
          .then(tempImportedItems.push(finalImportedItem))
          .then(setImportedItems(tempImportedItems)); // update "local" array
      });
  };

  return (
    // <Card className={cardClasses.root}>
    //   {/* <CardHeader
    //     className={cardClasses.header}
    //     title={thisItem.name}
    //     classes={{ title: cardClasses.cardTitle }}
    //   /> */}
    //   <CardMedia
    //     className={cardClasses.media}
    //     image={thisItem.img}
    //     title={thisItem.name}
    //   />
    //   <CardActions disableSpacing>
    //     <Button
    //       variant="outlined"
    //       className={cardClasses.button}
    //       startIcon={<EditIcon />}
    //     >
    //       Resize
    //     </Button>
    //     <Button
    //       variant="outlined"
    //       className={cardClasses.button}
    //       startIcon={<DeleteIcon />}
    //       onClick={handleDelete}
    //     >
    //       Delete
    //     </Button>
    //   </CardActions>
    // </Card>
    <GridListTile key={thisItem.img}>
      <img
        src={thisItem.img}
        alt={thisItem.name}
        style={{
          // border: "2px solid #C8C8C8",
          height: "100%",
          width: "100%",
          // borderRadius: 5,
          // margin: "auto",
        }}
      />
      <GridListTileBar className={itemClasses.gridListTileBarCover} />
      <GridListTileBar
        className={itemClasses.gridListTileBar}
        actionIcon={
          <IconButton
            className={itemClasses.iconButton}
            aria-label={`info about ${thisItem.name}`}
          >
            <DeleteIcon fontSize="small" onClick={handleDelete} />
          </IconButton>
        }
        // style={{ width: "99.7%" }}
      />
    </GridListTile>
    // just make the tilebar background transparent or something
  );
}

export default AlbumItemCore;
