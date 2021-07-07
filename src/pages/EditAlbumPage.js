import react from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import ImportDrawer from "../components/EditAlbumPage/ImportDrawer";
import AppShell from "../components/AppShell";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import NavigateNextRoundedIcon from "@material-ui/icons/NavigateNextRounded";
import NavigateBeforeRoundedIcon from "@material-ui/icons/NavigateBeforeRounded";
import Grid from "@material-ui/core/Grid";

import firebase from "@firebase/app";
import "@firebase/firestore";
import "@firebase/storage";

import Page from "../components/Page/Page";
import NavigatePrevPageButton from "../components/EditAlbumPage/NavigatePrevPageButton";
import NavigateNextPageButton from "../components/EditAlbumPage/NavigateNextPageButton";

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
      const itemsArray = [];
      snapshot.forEach((doc) => {
        itemsArray.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setImportedItems(itemsArray);
    })();
  }, []);

  //
  // obtain array of pages
  const [albumPages, setAlbumPages] = useState([]);
  useEffect(() => {
    (async () => {
      const snapshot = await db
        .collection("users")
        .doc(uid)
        .collection("albums")
        .doc(currID)
        .collection("pages")
        .get();
      const pagesArray = [];
      snapshot.forEach((doc) => {
        pagesArray.push({
          ...doc.data(),
        });
      });
      setAlbumPages(pagesArray);
    })();
  }, []);
  //
  console.log(
    "log here here, albumPages[currPageNum].bgColor: " + albumPages[0]?.bgColor
  );

  const [currPage, setCurrPage] = useState(albumPages[currPageNum]);
  console.log("log beneath here then, " + currPage?.bgColor);
  // setCurrPage(albumPages[0]);

  const body = (
    <div>
      {/* <h2>{currAlbum?.name}</h2>
      <img
        src={currAlbum?.coverImg}
        alt={currAlbum?.title}
        style={{ width: "1000px" }}
      /> */}

      {/* pass current page items into this page object */}

      <Grid container justify="center">
        <Grid>
          <div>
            {/* <div className={navigateButtonClassese}> */}
            {/* <IconButton
            aria-label="prevPage"
            color="primary"
            component={Link}
            to={"/edit/" + currID + "/0"}
          >
            <NavigateBeforeRoundedIcon />
          </IconButton> */}

            <NavigatePrevPageButton
              albumPages={albumPages}
              currPageNum={currPageNum}
              setCurrPageNum={setCurrPageNum}
              currID={currID}
              urrPage={currPage}
              setCurrPage={setCurrPage}
            />

            <subtitle> Page {currPageNum}</subtitle>

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
          </div>
        </Grid>
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
