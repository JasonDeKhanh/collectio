import React from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import {
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseUnAuthed,
} from "@react-firebase/auth";

import MyAlbumsPage from "./pages/MyAlbumsPage";
import EditAlbumPage from "./pages/EditAlbumPage";
import PageLogin from "./pages/PageLogin";

import "./styles.css";

import AppShell from "./components/AppShell";

import firebase from "@firebase/app";

export default function App() {
  return (
    <div className="App">
      <div style={{ maxWidth: "flex", margin: "0 auto" }}>
        <FirebaseAuthConsumer>
          <IfFirebaseAuthed>
            <Router>
              {/* <Route path={"myalbums"} component={MyAlbumsPage} />
              <Route path={"editalbum"} component={EditAlbumPage} /> */}
              <div>
                {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
                <Switch>
                  <Route exact path="/">
                    <AppShell />
                    <MyAlbumsPage />
                  </Route>
                  <Route path="/myalbums">
                    <AppShell />
                    <MyAlbumsPage />
                  </Route>
                  <Route path="/edit">
                    <AppShell />
                    <EditAlbumPage />
                  </Route>
                </Switch>
              </div>
            </Router>
            {/* <MyAlbumsPage /> */}
          </IfFirebaseAuthed>
          <IfFirebaseUnAuthed>
            <PageLogin />
          </IfFirebaseUnAuthed>
        </FirebaseAuthConsumer>
      </div>
    </div>
  );
}

/*
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
*/
