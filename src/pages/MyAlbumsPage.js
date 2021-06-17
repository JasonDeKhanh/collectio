import { useState, useEffect } from "react";

import AppBar1 from "../components/AppBar1";

import CreateNewAlbumPopup from "../components/CreateNewAlbumPopup";

import styles from "../components/CreateNewAlbumButton.module.css";

import firebase from "@firebase/app";
import "@firebase/firestore";
import "@firebase/storage";

import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import { FirebaseAuthConsumer } from "@react-firebase/auth";

//import duck from "../components/CreateNewAlbumPopup/duck.jpg";

function MyAlbumsPage() {
  const [buttonPopup, setButtonPopup] = useState(false);

  const db = firebase.firestore();

  //const storage = firebase.storage();

  const [albums, setAlbums] = useState([]);

  const uid = firebase.auth().currentUser?.uid;

  useEffect(() => {
    (async () => {
      const snapshot = await db
        .collection("users")
        .doc(uid)
        .collection("albums")
        .get();
      const albumsArray = [];
      snapshot.forEach((doc) => {
        albumsArray.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setAlbums(albumsArray);
    })();
  }, []);

  return (
    <div>
      <div>
        <main>
          <button
            className={styles.button}
            onClick={() => setButtonPopup(true)}
          >
            {" "}
            Create New Album{" "}
          </button>
        </main>

        <CreateNewAlbumPopup
          trigger={buttonPopup}
          setTrigger={setButtonPopup}
          db={db}
          //storage={storage}
        />
      </div>

      <div name="album list test">
        <h2>test album list</h2>
        {albums.map((album) => (
          <div className="album-item">
            <h4>{album.name}</h4>
            <img src={album.coverImg} alt="album picture" />
            <span>
              <strong>Orientation:</strong> {album.orientation}
            </span>
          </div>
        ))}
      </div>

      <div name="album-list">
        <div className={albums.root}>
          <GridList cellHeight={180} className={albums.gridList}>
            <GridListTile key="Subheader" cols={4} style={{ height: "auto" }}>
              <ListSubheader component="div">Albums</ListSubheader>
            </GridListTile>
            {albums.map((album) => (
              <GridListTile key={album.img}>
                <img src={album.coverImg} alt={album.title} />
                <GridListTileBar
                  title={album.name}
                  /*subtitle={
                    <span>by: {album.author}}</span>
                    //re add in the future if we want authors
                  }*/
                  actionIcon={
                    <IconButton
                      aria-label={`info about ${album.title}`}
                      className={albums.icon}
                    >
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
      </div>
    </div>
  );
}

export default MyAlbumsPage;
