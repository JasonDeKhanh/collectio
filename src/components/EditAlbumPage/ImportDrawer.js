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
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

import { Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

import MenuIconTopRight from "../MenuIconTopRight";

import firebase from "@firebase/app";
import "@firebase/firestore";
import "@firebase/storage";

import AppBar1 from "../AppBar1";
import ImportItemPopup from "./ImportItemPopup";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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
  const classes = useStyles();
  const body = props.body;

  const [importPopup, setImportPopup] = useState(false);

  const db = firebase.firestore();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
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
          db={db}
        />
      </div>

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
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
          <List></List>
        </div>
      </Drawer>
      <main className={classes.content}>{body}</main>
    </div>
  );
}
