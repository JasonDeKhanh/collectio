import react from "react";
import { useState, useEffect } from "react";
import { useParams, useRouteMatch } from "react-router-dom";

import ReactLoading from "react-loading";

import ImportDrawer from "../components/EditAlbumPage/ImportDrawer";

import Grid from "@material-ui/core/Grid";

import firebase from "@firebase/app";
import "@firebase/firestore";
import "@firebase/storage";

import Page from "../components/Page/Page";
import NavigatePrevPageButton from "../components/EditAlbumPage/NavigatePrevPageButton";
import NavigateNextPageButton from "../components/EditAlbumPage/NavigateNextPageButton";
import AddPageButton from "../components/EditAlbumPage/AddPageButton";

function EditAlbumPage() {
  const db = firebase.firestore();
  const uid = firebase.auth().currentUser?.uid;

  // retrieve albums data from firestore
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

  const currID = useParams().albumID; // ID of current album being edited

  // obtain page number
  const [currPageNum, setCurrPageNum] = useState(useParams().pageNum);

  // obtain currAlbum
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
            });
          });
        })
        .then(() => setItemsAdded(tempArray));
    };

    fetchItemsAdded();
    setDone4(true);
  }, []);

  // const handleRefresh = () => {
  //   const tempArray = [];
  //   const fetchItemsAdded = () => {
  //     db.collection("users")
  //       .doc(uid)
  //       .collection("albums")
  //       .doc(currID)
  //       .collection("itemsAdded")
  //       .get()
  //       .then((querySnapshot) => {
  //         querySnapshot.forEach(function (doc) {
  //           // doc.data() is never undefined for query doc snapshots
  //           tempArray.push({
  //             ...doc.data(),
  //           });
  //         });
  //       })
  //       .then(setItemsAdded(tempArray));
  //   };
  //   fetchItemsAdded();
  // };

  const body = !(done1 & done2 & done3 & done4) ? (
    <Grid container justify="center">
      <ReactLoading type={"bars"} color={"#3c54b4"} height={100} width={100} />
    </Grid>
  ) : (
    <div>
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
          inMode="edit"
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
          inMode="edit"
        />
      </Grid>

      <Grid container justify="center">
        <div>
          <Page
            currAlbum={currAlbum}
            albumPages={albumPages}
            currPageNum={currPageNum}
            setCurrPageNum={setCurrPageNum}
            currID={currID}
            currPage={currPage}
            setCurrPage={setCurrPage}
            // itemsThisPage={currPage?.itemsOnPage}
            setAlbumPages={setAlbumPages}
            itemsAdded={itemsAdded}
            setItemsAdded={setItemsAdded}
            importedItems={importedItems}
            setImportedItems={setImportedItems}
          />
        </div>
      </Grid>

      <Grid container justify="center">
        <AddPageButton
          albumPages={albumPages}
          setAlbumPages={setAlbumPages}
          currID={currID}
          currPage={currPage}
        />
      </Grid>
    </div>
  );

  const { url, path } = useRouteMatch();
  console.log("url routeMatch = " + url + " path routeMatch = " + path);

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
          itemsAdded={itemsAdded}
          setItemsAdded={setItemsAdded}
        />
      </div>
    </div>
  );
}

export default EditAlbumPage;
