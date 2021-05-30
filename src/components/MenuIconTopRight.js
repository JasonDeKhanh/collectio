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

  return (
    <IfFirebaseAuthed>
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
            <MenuItem onClick={() => handleLogout(firebase)}>Logout</MenuItem>
          </Menu>
        </div>
      )}
    </IfFirebaseAuthed>
  );
}

export default MenuIconTopRight;
