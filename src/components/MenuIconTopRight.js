import { useState } from "react";
import {
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseUnAuthed,
} from "@react-firebase/auth";
import {
  AppBar,
  Avatar,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Grid,
  makeStyles,
} from "@material-ui/core";

function MenuIconTopRight() {
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

  const useStyles = makeStyles({
    avatar: {},
  });

  const classes = useStyles();

  return (
    <IfFirebaseAuthed>
      {({ user, firebase }) => (
        <div>
          <Grid container justify="flex-end" spacing={24}>
            <Avatar
              className={classes.avatar}
              alt={user.displayName}
              src={user.photoURL}
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            />
          </Grid>

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleLogout(firebase)}>Logout</MenuItem>
          </Menu>
        </div>
      )}
    </IfFirebaseAuthed>
  );
}

export default MenuIconTopRight;
