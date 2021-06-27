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

import { Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

import MenuIconTopRight from "../MenuIconTopRight";

import firebase from "@firebase/app";
import "@firebase/firestore";
import "@firebase/storage";

import AppBar1 from "../AppBar1";
import ImportItemPopup from "./ImportItemPopup";

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
    padding: theme.spacing(3),
  },
}));

export default function ImportDrawer(props) {
  const drawerClass = useStylesDrawer();
  const { body, albums, setAlbums, currID, importedItems, setImportedItems } =
    props;

  const [importPopup, setImportPopup] = useState(false);

  const db = firebase.firestore();

  // imported items style
  const useStylesImportedItems = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: "90%",
      height: "100%",
    },
    icon: {
      color: "rgba(255, 255, 255, 0.54)",
    },
  }));

  const importedItemsList = useStylesImportedItems();

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
            <Button variant="outlined" component={Link} to="/">
              <Typography
                variant="h6"
                style={{ flexGrow: 1, textAlign: "left", color: "white" }}
              >
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

                <Grid container justify="center">
                  <img
                    src={importedItem.img}
                    alt={importedItem.name}
                    style={{
                      width: 200,
                      height: 200,
                    }}
                  />
                </Grid>
                <Grid container justify="center">
                  <button>add</button> <button>delete</button>
                </Grid>

                <Divider />
                <br />
              </div>
            ))}
          </List>
        </div>
      </Drawer>
      <main className={drawerClass.content}>{body}</main>
    </div>
  );
}
