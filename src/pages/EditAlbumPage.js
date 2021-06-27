import react from "react";
import { useState, useEffect } from "react";

import ImportDrawer from "../components/EditAlbumPage/ImportDrawer";
import AppShell from "../components/AppShell";

import firebase from "@firebase/app";
import "@firebase/firestore";
import "@firebase/storage";

import { useParams } from "react-router-dom";

import Page from "../components/Page/Page";

function EditAlbumPage() {
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

  // const tempAlbums = Object.assign([], albums);
  let currAlbum;
  // run through albums array
  for (var i = 0; i < albums.length; i++) {
    if (albums[i].id === currID) {
      currAlbum = albums[i];
      break;
    }
  }

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

  const body = (
    <div>
      {/* <h2>{currAlbum?.name}</h2>
      <img
        src={currAlbum?.coverImg}
        alt={currAlbum?.title}
        style={{ width: "1000px" }}
      /> */}
      <Page />
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
        />
      </div>
    </div>
  );
}

export default EditAlbumPage;
