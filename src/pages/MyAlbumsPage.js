import { useState, useEffect } from "react";

import AppBar1 from "../components/AppBar1";
import AlbumOptionsButton from "../components/MyAlbumsPage/AlbumOptionsButton";
import SearchBar from "../components/SearchBar";

import CreateNewAlbumPopup from "../components/CreateNewAlbumPopup";

import "./MyAlbumsPage.module.css";

import firebase from "@firebase/app";
import "@firebase/firestore";
import "@firebase/storage";

import withWidth, { isWidthUp } from "@material-ui/core/withWidth";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import AddBoxIcon from "@material-ui/icons/AddBox";

import { FirebaseAuthConsumer } from "@react-firebase/auth";

import Button from "@material-ui/core/Button";
import ShareAlbumPopup from "../components/ShareAlbumPopup";

//import duck from "../components/CreateNewAlbumPopup/duck.jpg";

function MyAlbumsPage(props) {
  const [buttonPopup, setButtonPopup] = useState(false);

  const db = firebase.firestore();

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
          ...doc.data(),
          id: doc.id,
        });
      });
      setAlbums(albumsArray);
    })();
  }, []);

  // detect changes in albums and update firestore
  // useEffect(() => {
  //   const uid = firebase.auth().currentUser?.uid;
  //   const db = firebase.firestore();
  //   db.collection("users").doc(uid).set({ albums: albums });
  // }, [albums]);
  // DOESN'T WORK, DELETE LATER

  // Grid List style

  function getCols(screenWidth) {
    if (isWidthUp("lg", screenWidth)) {
      return 5;
    }

    if (isWidthUp("md", screenWidth)) {
      return 3;
    }

    if (isWidthUp("sm", screenWidth)) {
      return 2;
    }

    return 1;
  }

  const cols = getCols(props.width);

  const useStylesAlbums = makeStyles((theme) => ({
    root: {
      display: "flex",
      //flexWrap: "wrap",
      justifyContent: "space-evenly",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: "100%",
    },
    gridTile: {},
    icon: {
      color: "rgba(255, 255, 255, 0.54)",
    },
    buttonCreateAlbum: {
      backgroundColor: "#5FC9FF",
      height: 200,
      width: "100%",
      margin: "auto",
      fontSize: 20,
      color: "white",
      fontWeight: "fontWeightBold",
    },
  }));

  const albumsList = useStylesAlbums();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredalbums = albums.filter((album) =>
    album.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <br></br>
      <Grid container justify="center">
        <SearchBar handleChange={(e) => setSearchTerm(e.target.value)} />
      </Grid>

      <div>
        <CreateNewAlbumPopup
          trigger={buttonPopup}
          setTrigger={setButtonPopup}
          db={db}
          albums={albums}
          setAlbums={setAlbums}
        />
      </div>

      <br></br>

      <AlbumList
        uid={uid}
        albumsList={albumsList}
        cols={cols}
        setButtonPopup={setButtonPopup}
        albums={filteredalbums}
        setAlbums={setAlbums}
        // shareTrigger={sharePopup}
        // setShareTrigger={setSharePopup}
      />
    </div>
  );
}

function AlbumList(props) {
  const { uid, albumsList, cols, setButtonPopup, albums, setAlbums } = props;

  // const [sharePopup, setSharePopup] = useState(false);

  return (
    <div>
      <div className={albumsList.root}>
        <GridList
          cellHeight={200}
          spacing={20}
          cols={cols}
          className={albumsList.gridList}
        >
          <GridListTile key="Subheader" cols={1} style={{ height: "auto" }}>
            {/* <ListSubheader component="div"> */}

            <Button
              className={albumsList.buttonCreateAlbum}
              onClick={() => setButtonPopup(true)}
            >
              Create New Album
              <br />
              <AddBoxIcon />
            </Button>
            {/* </ListSubheader> */}
          </GridListTile>
          {albums.map((album) => (
            <GridListTile key={album.img}>
              <img
                src={album.coverImg}
                alt={album.title}
                style={{
                  border: "2px solid #C8C8C8",
                  height: "98%",
                  width: "98.5%",
                  borderRadius: 5,
                  margin: "auto",
                }}
              />
              <GridListTileBar
                title={album.name}
                actionIcon={
                  <IconButton
                    aria-label={`info about ${album.title}`}
                    className={albumsList.icon}
                  >
                    <AlbumOptionsButton
                      uid={uid}
                      album={album}
                      albums={albums}
                      setAlbums={setAlbums}
                      // shareTrigger={sharePopup}
                      // setShareTrigger={setSharePopup}
                    />
                  </IconButton>
                }
                style={{ width: "99.7%" }}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    </div>
  );
}

export default withWidth()(MyAlbumsPage);
