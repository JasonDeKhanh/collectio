import react from "react";
import { useState, useEffect } from "react";

import ImportDrawer from "../components/EditAlbumPage/ImportDrawer";
import AppShell from "../components/AppShell";

import firebase from "@firebase/app";
import "@firebase/firestore";
import "@firebase/storage";

import { useParams } from "react-router-dom";

function EditAlbumPage() {
  const db = firebase.firestore();
  const uid = firebase.auth().currentUser?.uid;

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

  const { currID } = useParams();

  const tempAlbums = Object.assign([], albums);
  let currAlbum;
  // now let's try to delete using array search ;--;
  for (var i = 0; i < tempAlbums.length; i++) {
    if (tempAlbums[i].id === currID) {
      currAlbum = tempAlbums[i];
      break;
    }
  }

  const body = (
    <div>
      <h1>blablablbalbablabla</h1>
      <h2> bleh bleh bleh bleh</h2>
      <h3> blu blu blu blu blu blu blu</h3>
      <button> click me </button>
      <h2>{currID}</h2>
    </div>
  );

  return (
    <div>
      <br></br>
      <h1>Edit Page</h1>
      <div>
        <ImportDrawer body={body} />
      </div>
    </div>
  );
}

export default EditAlbumPage;
