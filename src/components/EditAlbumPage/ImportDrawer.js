import React from "react";

import { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";

import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import { grey, red } from "@material-ui/core/colors";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import { Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

import Draggable from "react-draggable";

import MenuIconTopRight from "../MenuIconTopRight";

import firebase from "@firebase/app";
import "@firebase/firestore";
import "@firebase/storage";

import AppBar1 from "../AppBar1";
import ImportItemPopup from "./ImportItemPopup";
import ImportedItemDeleteButton from "./ImportedItemDeleteButton";
import ImportedItemAddButton from "./ImportedItemAddButton";

const drawerWidth = 240;

const useStylesDrawer = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    paddingLeft: theme.spacing(3),
  },
  myAlbums: {
    flexGrow: 1,
    textAlign: "center",
    color: "white",
  },
  myAlbumsButton: {
    width: 150,
    border: "0px",
  },
}));

// item bar style
const itemBarWidth = 50;
const useStylesItemBar = makeStyles((theme) => ({
  drawer: {
    width: itemBarWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    marginLeft: 240,
    width: itemBarWidth,
  },
}));

// card imported items style
const useStylesCard = makeStyles((theme) => ({
  root: {
    width: "90%",
    height: 300,
    border: "1px solid #B5B5B5",
  },
  cardTitle: {
    fontSize: [16],
    overflow: "hidden",
  },
  media: {
    // height: "100%",
    //width: 200,
    height: "70%",
    display: "flex",
    objectFit: "cover",
    margin: "auto",
    marginTop: 5,
    marginBottom: 5,
  },
  header: {
    height: 35,
    overflow: "hidden",
    display: "block",
    paddingTop: 13,
    paddingBottom: 0,
  },
  button: {
    margin: "auto",
    width: 20,
    height: 20,
    paddingLeft: 0,
  },
}));

export default function ImportDrawer(props) {
  const drawerClass = useStylesDrawer();
  const cardClasses = useStylesCard();
  const itemBarClasses = useStylesItemBar();

  const {
    body,
    albums,
    setAlbums,
    currID,
    importedItems,
    setImportedItems,
    albumPages,
    setAlbumPages,
    currPageNum,
    setCurrPageNum,
    itemsAdded,
    setItemsAdded,
  } = props;

  const [importPopup, setImportPopup] = useState(false);

  const db = firebase.firestore();
  const uid = firebase.auth().currentUser?.uid;

  return (
    <div className={drawerClass.root}>
      <CssBaseline />
      <AppBar position="fixed" className={drawerClass.appBar}>
        <Toolbar>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button
              variant="outlined"
              className={drawerClass.myAlbumsButton}
              component={Link}
              to="/"
            >
              <Typography variant="h6" className={drawerClass.myAlbums}>
                My Albums
              </Typography>
            </Button>
          </div>

          <Grid container justify="flex-end">
            <MenuIconTopRight justify="flex-end" />
          </Grid>
        </Toolbar>
      </AppBar>
      {/* end of app bar, drawer stuff below */}

      <div>
        <ImportItemPopup
          trigger={importPopup}
          setTrigger={setImportPopup}
          currID={currID}
          importedItems={importedItems}
          setImportedItems={setImportedItems}
          db={db}
        />
      </div>

      <Drawer
        className={drawerClass.drawer}
        variant="permanent"
        classes={{
          paper: drawerClass.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={drawerClass.drawerContainer}>
          <br></br>
          <Divider />
          <List>
            <Grid container justify="center">
              <Button
                variant="contained"
                color="primary"
                onClick={() => setImportPopup(true)}
              >
                Import Item
              </Button>
            </Grid>
          </List>
          <Divider />

          <List>
            {importedItems.map((importedItem) => (
              <div>
                {/* <GridListTile key={importedItem.img}>
                  <img
                    src={importedItem.img}
                    alt={importedItem.name}
                    style={{ width: 200, height: 200 }}
                  />
                  <GridListTileBar
                    title={importedItem.name}
                    actionIcon={
                      <IconButton
                        aria-label={`info about ${importedItem.name}`}
                        className={importedItemsList.icon}
                      ></IconButton>
                    }
                  />
                </GridListTile> */}
                <div>
                  <Grid container justify="center">
                    <Card className={cardClasses.root} variant="outlined">
                      <CardHeader
                        // titleTypographyProps={{ variant: "subtitle1" }}
                        className={cardClasses.header}
                        title={importedItem.name}
                        classes={{ title: cardClasses.cardTitle }}
                      />
                      <CardMedia
                        className={cardClasses.media}
                        image={importedItem.img}
                        title={importedItem.name}
                      />
                      <CardActions disableSpacing>
                        <IconButton
                          aria-label="share"
                          className={cardClasses.button}
                        >
                          <ImportedItemAddButton
                            importedItem={importedItem}
                            importedItemID={importedItem.id}
                            currID={currID} //current album ID
                            importedItems={importedItems}
                            setImportedItems={setImportedItems}
                            albumPages={albumPages}
                            setAlbumPages={setAlbumPages}
                            currPageNum={currPageNum}
                            setCurrPageNum={setCurrPageNum}
                            itemsAdded={itemsAdded}
                            setItemsAdded={setItemsAdded}
                          />
                        </IconButton>
                        {/* <Typography className={cardClasses.buttonLabel}>
                            {" "}
                            Add{" "}
                          </Typography> */}
                        <IconButton
                          aria-label="delete"
                          className={cardClasses.button}
                          // style={cardClasses.button}
                          // iconStyle={cardClasses.icon}
                          // tooltipStyles={cardClasses.tooltip}
                        >
                          <ImportedItemDeleteButton
                            importedItem={importedItem}
                            importedItemID={importedItem.id}
                            currID={currID} //current album ID
                            importedItems={importedItems}
                            setImportedItems={setImportedItems}
                          />
                        </IconButton>
                        {/* <Typography className={cardClasses.buttonLabel}>
                            {" "}
                            Delete{" "}
                          </Typography> */}
                      </CardActions>
                    </Card>
                  </Grid>
                </div>
                <br />
              </div>
            ))}
          </List>
        </div>
      </Drawer>
      {/* Item bar */}
      <Drawer
        className={itemBarClasses.drawer}
        variant="permanent"
        classes={{
          paper: itemBarClasses.drawerPaper,
        }}
      >
        <Toolbar />
        <Grid container justify="center">
          <Button variant="contained" color="primary">
            Test button
            {/* style this button and add other buttons shit heheeh */}
          </Button>
        </Grid>
      </Drawer>

      <main className={drawerClass.content}>{body}</main>
    </div>
  );
}
