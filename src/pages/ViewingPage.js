import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import firebase from "@firebase/app";
import "@firebase/firestore";
import "@firebase/storage";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import NavigateNextPageButton from "../components/EditAlbumPage/NavigateNextPageButton";
import NavigatePrevPageButton from "../components/EditAlbumPage/NavigatePrevPageButton";
import ViewingPageItem from "../components/ViewingPage/ViewingPageItem";

// useStyle for the page's paper
const useStylesPaperLandscape = makeStyles((theme) => ({
  root: {
    // display: "flex",
    // flexWrap: "wrap",
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
      height: 1280,
    },
  },
}));

function ViewingPage() {
  const currID = useParams().albumID;
  const currPageFromLink = useParams().pageNum;
  const [currPageNum, setCurrPageNum] = useState(useParams().pageNum);

  const db = firebase.firestore();
  const uid = firebase.auth().currentUser?.uid;

  // retrieve album data from firebase
  const [albums, setAlbums] = useState([]);

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

  const paperClassesLandscape = useStylesPaperLandscape();
  const paperClassesPortrait = useStylesPaperPortrait();
  var paperClasses;
  if (currPage?.orientation === "landscape") {
    paperClasses = paperClassesLandscape;
  } else {
    paperClasses = paperClassesPortrait;
  }

  return (
    <div>
      <div>Hello, this is the Viewing Page for album:</div>
      <br />
      <div>
        Id: {currID} and on page: {currPageFromLink}
      </div>
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

        <caption> Page {currPageNum}</caption>

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
                  : { height: 1280, width: 720, position: "absolute" }
              }
            >
              <Grid container justify="center">
                <h2>Page Number : {currPage?.pgNum}</h2>
              </Grid>
            </div>
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
