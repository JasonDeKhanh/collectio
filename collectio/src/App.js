import { useState } from "react";
import {
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseUnAuthed
} from "@react-firebase/auth";
import {
  AppBar,
  Avatar,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from "@material-ui/core";

import MyAlbumsPage from "./pages/MyAlbumsPage";
import PageLogin from "./pages/PageLogin";

import "./styles.css";

import AppShell from "./components/AppShell";

export default function App() {
  return (
    <div className="App">
      <AppShell />
      <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
        <FirebaseAuthConsumer>
          <IfFirebaseAuthed>
            <MyAlbumsPage />
          </IfFirebaseAuthed>
          <IfFirebaseUnAuthed>
            <PageLogin />
          </IfFirebaseUnAuthed>
        </FirebaseAuthConsumer>
      </div>
    </div>
  );
}

{/*}
function AppShell() {
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
    <AppBar1 />
  );
}
*/}
