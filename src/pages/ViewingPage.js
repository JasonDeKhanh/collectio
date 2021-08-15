import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import firebase from "@firebase/app";
import "@firebase/firestore";
import "@firebase/storage";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import NavigateNextPageButton from "../components/EditAlbumPage/NavigateNextPageButton";
import NavigatePrevPageButton from "../components/EditAlbumPage/NavigatePrevPageButton";
import ViewingPageItem from "../components/ViewingPage/ViewingPageItem";

// useStyle for the page's paper
const useStylesPaperLandscape = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 1280,
      height: 720,
    },
  },
  stuff: {
    width: 1280,
    height: 720,
  },
}));

const useStylesPaperPortrait = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: 720,
      height: 1018,
    },
  },
}));

const useStylesTitle = makeStyles((theme) => ({
  title: {
    fontFamily: "Roboto Slab",
    fontWeight: 250,
  },
}));

function ViewingPage() {
  const currID = useParams().albumID;
  const [currPageNum, setCurrPageNum] = useState(useParams().pageNum);

  const db = firebase.firestore();
  const uid = useParams().uid;

  // retrieve album data from firebase
  const [albums, setAlbums] = useState([]);
  const [currAlbum, setCurrAlbum] = useState({});
  useEffect(() => {
    const fetchName = () => {
      db.collection("users")
        .doc(uid)
        .collection("albums")
        .doc(currID)
        .get()
        .then((doc) => doc.data())
        .then((data) => setCurrAlbum(data));
    };
    fetchName();
  }, []);

  const [done1, setDone1] = useState(false);
  const [done2, setDone2] = useState(false);
  const [done3, setDone3] = useState(false);
  const [done4, setDone4] = useState(false);

  useEffect(() => {
    (async () => {
      const snapshot = await db
        .collection("users")
        .doc(uid)
        .collection("albums")
        .get();
      // .then(setDone1(true));
      const albumsArray = [];
      snapshot.forEach((doc) => {
        albumsArray.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setAlbums(albumsArray);
      setDone1(true);
    })();
  }, []);

  // obtain array of pages
  const [albumPages, setAlbumPages] = useState([]);

  useEffect(() => {
    const tempArray = [];
    const fetchAlbumPages = () => {
      db.collection("users")
        .doc(uid)
        .collection("albums")
        .doc(currID)
        .collection("pages")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            tempArray.push({
              ...doc.data(),
            });
          });
        })
        .then(() => setAlbumPages(tempArray));
    };
    fetchAlbumPages();
    setDone2(true);
  }, []);

  // retrieve current page
  const [currPage, setCurrPage] = useState(albumPages[currPageNum]);

  useEffect(() => {
    const fetchPage = () => {
      db.collection("users")
        .doc(uid)
        .collection("albums")
        .doc(currID)
        .collection("pages")
        .doc(currPageNum.toString())
        .get()
        .then((doc) => doc.data())
        .then((data) => setCurrPage(data));
    };
    fetchPage();
  }, []);

  // obtain items added to pages
  const [itemsAdded, setItemsAdded] = useState([]);
  useEffect(() => {
    const tempArray = [];
    console.log("in here");
    const fetchItemsAdded = () => {
      db.collection("users")
        .doc(uid)
        .collection("albums")
        .doc(currID)
        .collection("itemsAdded")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            tempArray.push({
              ...doc.data(),
              id: doc.id,
            });
          });
        })
        .then(() => setItemsAdded(tempArray));
    };

    fetchItemsAdded();
    setDone4(true);
  }, []);

  const useStylesTitleOnPage = makeStyles((theme) =>
    currPage?.orientation === "landscape"
      ? {
          title: {
            fontFamily: "Roboto Slab",
            fontWeight: 250,
            fontSize: 200,
          },
        }
      : {
          title: {
            fontFamily: "Roboto Slab",
            fontWeight: 250,
            fontSize: 120,
          },
        }
  );

  const paperClassesLandscape = useStylesPaperLandscape();
  const paperClassesPortrait = useStylesPaperPortrait();
  var paperClasses;
  if (currPage?.orientation === "landscape") {
    paperClasses = paperClassesLandscape;
  } else {
    paperClasses = paperClassesPortrait;
  }
  const titleClasses = useStylesTitle();
  const titleOnPageClasses = useStylesTitleOnPage();

  return (
    <div>
      <br />
      <Grid container justify="center">
        <Typography className={titleClasses.title} variant="h3">
          {currAlbum?.name}
        </Typography>
      </Grid>
      <Grid container direction="row" justify="center" alignItems="center">
        <NavigatePrevPageButton
          uid={uid}
          albumPages={albumPages}
          currPageNum={currPageNum}
          setCurrPageNum={setCurrPageNum}
          currID={currID}
          urrPage={currPage}
          setCurrPage={setCurrPage}
          itemsAdded={itemsAdded}
          setitemsAdded={setItemsAdded}
          inMode="view"
        />

        <caption>
          {currPageNum.toString() === "0"
            ? "Cover Page"
            : "Page " + currPageNum}
        </caption>

        <NavigateNextPageButton
          uid={uid}
          albumPages={albumPages}
          currPageNum={currPageNum}
          setCurrPageNum={setCurrPageNum}
          currID={currID}
          currPage={currPage}
          setCurrPage={setCurrPage}
          inMode="view"
        />
      </Grid>

      <Grid container justify="center">
        <div className={paperClasses.root}>
          <Paper elevation={18}>
            <div
              style={
                currPage?.orientation === "landscape"
                  ? { height: 720, width: 1280, position: "absolute" }
                  : { height: 1018, width: 720, position: "absolute" }
              }
            ></div>
            {currPageNum.toString() === "0" ? (
              <Grid
                container
                style={
                  currPage?.orientation === "landscape"
                    ? {
                        height: 720,
                      }
                    : {
                        height: 1018,
                      }
                }
                alignItems="center"
                justify="center"
              >
                <Box
                  style={
                    currPage?.orientation === "landscape"
                      ? {
                          width: 1050,
                          height: 550,
                          border: "1px solid #D6D6D6",

                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }
                      : {
                          width: 550,
                          height: 720,
                          border: "1px solid #D6D6D6",

                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }
                  }
                >
                  <Typography className={titleOnPageClasses.title} variant="h1">
                    {currAlbum?.name}
                  </Typography>
                </Box>
              </Grid>
            ) : null}

            {itemsAdded?.map((item) => (
              <ViewingPageItem
                thisItem={item}
                albumPages={albumPages}
                currPageNum={currPageNum}
                setCurrPageNum={setCurrPageNum}
                currID={currID}
                currPage={currPage}
                setCurrPage={setCurrPage}
                setAlbumPages={setAlbumPages}
                itemsAdded={itemsAdded}
                setItemsAdded={setItemsAdded}
              />
            ))}
          </Paper>
        </div>
      </Grid>
    </div>
  );
}

export default ViewingPage;
