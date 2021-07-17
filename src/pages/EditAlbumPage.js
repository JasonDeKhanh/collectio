import react from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import ReactLoading from "react-loading";

import ImportDrawer from "../components/EditAlbumPage/ImportDrawer";
import AppShell from "../components/AppShell";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import NavigateNextRoundedIcon from "@material-ui/icons/NavigateNextRounded";
import NavigateBeforeRoundedIcon from "@material-ui/icons/NavigateBeforeRounded";
import Grid from "@material-ui/core/Grid";

import Draggable from "react-draggable";
import { Button, Typography } from "@material-ui/core";

import firebase from "@firebase/app";
import "@firebase/firestore";
import "@firebase/storage";

import Page from "../components/Page/Page";
import NavigatePrevPageButton from "../components/EditAlbumPage/NavigatePrevPageButton";
import NavigateNextPageButton from "../components/EditAlbumPage/NavigateNextPageButton";
import AddPageButton from "../components/EditAlbumPage/AddPageButton";

// prev next page button style
// const useStylesNavigateButton = makeStyles((theme) => ({
//   root: {
//     "& > *": {
//       margin: theme.spacing(1),
//     },
//   },
// }));

function EditAlbumPage() {
  // const navigateButtonClassese = useStylesNavigateButton();

  const db = firebase.firestore();
  const uid = firebase.auth().currentUser?.uid;

  // retrieve albums data from firestore
  const [albums, setAlbums] = useState([]);

  const [done1, setDone1] = useState(false);
  const [done2, setDone2] = useState(false);
  const [done3, setDone3] = useState(false);

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

  const currID = useParams().albumID; // ID of current album being edited

  // obtain page number
  const [currPageNum, setCurrPageNum] = useState(useParams().pageNum);
  console.log("curr page num: " + currPageNum);
  console.log("currID: " + currID);

  // const tempAlbums = Object.assign([], albums);
  var currAlbum;
  // run through albums array
  // THIS IS NOT WORKING FOR SOME REASON, BUT IT IS NOT BEING USED ANYWAY, DO NOT DELETE, MIGHT BE HANDY LATER
  for (var i = 0; i < albums.length; i++) {
    if (albums[i]?.id === currID) {
      // currAlbum = albums[i];
      currAlbum = {
        ...albums[i],
        id: currID,
      };
      break;
    }
  }

  console.log("currAlbum: " + currAlbum);

  // retrieve imported items tied to album being edited
  const [importedItems, setImportedItems] = useState([]);
  useEffect(() => {
    (async () => {
      const snapshot = await db
        .collection("users")
        .doc(uid)
        .collection("albums")
        .doc(currID)
        .collection("importedItems")
        .get();
      // .then(setDone3(true));
      const itemsArray = [];
      snapshot.forEach((doc) => {
        itemsArray.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setImportedItems(itemsArray);
      setDone3(true);
    })();
  }, []);

  //
  // obtain array of pages
  const [albumPages, setAlbumPages] = useState([]);
  // useEffect(() => {
  //   (async () => {
  //     const snapshot = await db
  //       .collection("users")
  //       .doc(uid)
  //       .collection("albums")
  //       .doc(currID)
  //       .collection("pages")
  //       .get();
  //     // .then(setDone2(true));
  //     const pagesArray = [];
  //     snapshot.forEach((doc) => {
  //       pagesArray.push({
  //         ...doc.data(),
  //       });
  //     });

  //     // setAlbumPages(pagesArray);
  //     // if (!albumPages.length === 0) {
  //     //   setDone2(true);
  //     // }
  //     setAlbumPages(pagesArray);
  //     setDone2(true);
  //   })();
  // }, []);
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

  //

  // test

  //

  console.log("album length:" + albumPages.length);
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

  console.log("what the fuck" + currPage?.orientation);

  const body = !(done1 & done2 & done3) ? (
    <Grid container justify="center">
      <ReactLoading type={"bars"} color={"#3c54b4"} height={100} width={100} />
    </Grid>
  ) : (
    <div>
      <Grid container direction="row" justify="center" alignItems="center">
        <NavigatePrevPageButton
          albumPages={albumPages}
          currPageNum={currPageNum}
          setCurrPageNum={setCurrPageNum}
          currID={currID}
          urrPage={currPage}
          setCurrPage={setCurrPage}
        />

        <caption> Page {currPageNum}</caption>

        <NavigateNextPageButton
          albumPages={albumPages}
          currPageNum={currPageNum}
          setCurrPageNum={setCurrPageNum}
          currID={currID}
          urrPage={currPage}
          setCurrPage={setCurrPage}
        />

        {/* <IconButton aria-label="nextPage" color="primary">
            <NavigateNextRoundedIcon />
          </IconButton> */}
      </Grid>

      <Grid container justify="center">
        <AddPageButton
          albumPages={albumPages}
          currID={currID}
          currPage={currPage}
        />
      </Grid>

      <Grid container justify="center">
        <div>
          <Page
            albumPages={albumPages}
            currPageNum={currPageNum}
            setCurrPageNum={setCurrPageNum}
            currID={currID}
            currPage={currPage}
            setCurrPage={setCurrPage}
            itemsThisPage={currPage?.itemsOnPage}
            setAlbumPages={setAlbumPages}
          />
        </div>
      </Grid>

      {/* for next page button or something, can just get the "pages".length or something to prevent going out of bound 
        , when creating the new page, the orientation will = currAlbum.orientation

        FOR WEDNESDAY 7 JULY - figure out how to put divs in a row, to put the prev and next button 
      */}
    </div>
  );

  return (
    <div>
      <br></br>
      <h1>Edit Page</h1>
      <div>
        <ImportDrawer
          body={body}
          albums={albums}
          setAlbums={setAlbums}
          currID={currID}
          importedItems={importedItems}
          setImportedItems={setImportedItems}
          albumPages={albumPages}
          setAlbumPages={setAlbumPages}
          currPageNum={currPageNum}
          setCurrPageNum={setCurrPageNum}
        />
      </div>
    </div>
  );
}

export default EditAlbumPage;
