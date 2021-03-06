import React from "react";

import { useState } from "react";

import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import BuildIcon from "@material-ui/icons/Build";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import LooksIcon from "@material-ui/icons/Looks";
import DeleteIcon from "@material-ui/icons/Delete";
import ShareIcon from "@material-ui/icons/Share";

import firebase from "@firebase/app";
import "@firebase/firestore";
import "@firebase/storage";

import ShareAlbumPopup from "../ShareAlbumPopup";

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

export default function AlbumOptionsButton(props) {
  const db = firebase.firestore();
  const uid = props.uid;
  const thisAlbum = props.album;
  const albums = props.albums;
  const setAlbums = props.setAlbums;

  const [sharePopup, setSharePopup] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    const tempAlbums = Object.assign([], albums);
    // now let's try to delete using array search ;--;
    for (var i = 0; i < tempAlbums.length; i++) {
      if (tempAlbums[i].id === thisAlbum.id) {
        tempAlbums.splice(i, 1);
        break;
      }
    }

    setAlbums(tempAlbums);

    db.collection("users")
      .doc(uid)
      .collection("albums")
      .doc(thisAlbum.id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const handleShare = () => {
    setSharePopup(true);
  };

  return (
    <div>
      <div>
        <ShareAlbumPopup
          trigger={sharePopup}
          setTrigger={setSharePopup}
          currAlbum={thisAlbum}
          uid={uid}
        />
      </div>

      <IconButton
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        onClick={handleClick}
        style={{
          backgroundColor: "#E5E5E5",
          borderRadius: 100,
          width: 30,
          height: 30,
        }}
      >
        <BuildIcon />
      </IconButton>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem component={Link} to={"/edit/" + thisAlbum.id + "/0"}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Edit" />
        </StyledMenuItem>

        <StyledMenuItem
          component={Link}
          to={"/view/" + uid + "/" + thisAlbum.id + "/0"}
        >
          <ListItemIcon>
            <LooksIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="View" />
        </StyledMenuItem>

        <StyledMenuItem onClick={handleShare}>
          <ListItemIcon>
            <ShareIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Share" />
        </StyledMenuItem>

        <StyledMenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
