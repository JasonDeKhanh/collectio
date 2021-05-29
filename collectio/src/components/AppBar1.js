import React from "react";
import { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";

import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";

import {
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseUnAuthed,
} from "@react-firebase/auth";

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
  };

  return (
    <div className={classes.root}>
      
        <IfFirebaseUnAuthed>
        <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1, textAlign: "left" }}>
          Login
        </Typography>
      </Toolbar>
      </AppBar>
      </IfFirebaseUnAuthed>
      <IfFirebaseAuthed>
      <AppBar position="static">

          <Toolbar>
            <IconButton
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
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              My Albums
            </Typography>

            {({ user, firebase }) => (
              <div>
                <Avatar
                  alt={user.displayName}
                  src={user.photoURL}
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                />
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => handleLogout(firebase)}>
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            )}
          
          </Toolbar>
          </AppBar>
      </IfFirebaseAuthed>
      
      
    </div>
  );
}
