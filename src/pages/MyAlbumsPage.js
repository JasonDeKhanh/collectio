import { useState, useEffect } from "react";

import AppBar1 from "../components/AppBar1";
import AlbumOptionsButton from "../components/MyAlbumsPage/AlbumOptionsButton";

import CreateNewAlbumPopup from "../components/CreateNewAlbumPopup";

import styles from "./MyAlbumsPage.module.css";

import firebase from "@firebase/app";
import "@firebase/firestore";
import "@firebase/storage";

import withWidth, { isWidthUp } from "@material-ui/core/withWidth";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import { FirebaseAuthConsumer } from "@react-firebase/auth";

//import duck from "../components/CreateNewAlbumPopup/duck.jpg";

function MyAlbumsPage(props) {
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

  useEffect(() => {
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    db.collection("users").doc(uid).set({ albums: albums });
  }, [albums]);

  // Grid List style

  function getCols(screenWidth) {
    if (isWidthUp("lg", screenWidth)) {
      return 5;
    }

    if (isWidthUp("md", screenWidth)) {
      return 3;
    }

    return 2;
  }

  const cols = getCols(props.width);

  const useStyles = makeStyles((theme) => ({
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

  const albumsList = useStyles();

  return (
    <div>
      <div>
        <CreateNewAlbumPopup
          trigger={buttonPopup}
          setTrigger={setButtonPopup}
          db={db}
        />
      </div>

      <br></br>

      <AlbumList
        albumsList={albumsList}
        cols={cols}
        setButtonPopup={setButtonPopup}
        albums={albums}
      />
    </div>
  );
}

function AlbumList(props) {
  const { albumsList, cols, setButtonPopup, albums } = props;

  return (
    <div>
      <div className={albumsList.root}>
        <GridList cellHeight={200} cols={cols} className={albumsList.gridList}>
          <GridListTile key="Subheader" cols={1} style={{ height: "auto" }}>
            {/* <ListSubheader component="div"> */}
            <button
              className={styles.buttonCreateAlbum}
              onClick={() => setButtonPopup(true)}
            >
              {" "}
              Create New Album +{" "}
            </button>
            {/* </ListSubheader> */}
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
                    className={albumsList.icon}
                  >
                    <AlbumOptionsButton docID={album.id} />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    </div>
  );
}

export default withWidth()(MyAlbumsPage);
