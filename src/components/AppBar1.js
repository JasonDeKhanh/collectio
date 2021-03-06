import React from "react";

import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import { AppBar, Toolbar, Typography, Button, Grid } from "@material-ui/core";

import { IfFirebaseAuthed, IfFirebaseUnAuthed } from "@react-firebase/auth";

import MenuIconTopRight from "./MenuIconTopRight";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
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

export default function AppBar1() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <IfFirebaseUnAuthed>
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1, textAlign: "left" }}>
              Login
            </Typography>
          </Toolbar>
        </IfFirebaseUnAuthed>
        <IfFirebaseAuthed>
          <AppBar position="static">
            <Toolbar>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="outlined"
                  className={classes.myAlbumsButton}
                  component={Link}
                  to="/"
                >
                  <Typography variant="h6" className={classes.myAlbums}>
                    My Albums
                  </Typography>
                </Button>
              </div>

              <Grid container justify="flex-end">
                <MenuIconTopRight justify="flex-end" />
              </Grid>
            </Toolbar>
          </AppBar>
        </IfFirebaseAuthed>
      </AppBar>
    </div>
  );
}
