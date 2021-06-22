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
}));

export default function AppBar1() {
  const classes = useStyles();

  /*
  const [anchorEl, setAnchorEl] = useState(null);

  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  
  const handleLogout = (firebase) => {
    handleClose();
    firebase.auth().signOut();
  };*/

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
              {/*<IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <Tooltip title="Add new Album" aria-label="add">
                  <Fab color="primary" className={classes.fab}>
                    <AddIcon />
                  </Fab>
                </Tooltip>
              </IconButton>*/}

              <Button
                href="#text-buttons"
                color="white"
                variant="outlined"
                component={Link}
                to="/"
              >
                My Albums
              </Button>

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
