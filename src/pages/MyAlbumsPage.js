import { useState, useEffect } from "react";

import AppBar1 from "../components/AppBar1";

import CreateNewAlbumPopup from "../components/CreateNewAlbumPopup";

import styles from "../components/CreateNewAlbumButton.module.css";

import firebase from "@firebase/app";
import "@firebase/firestore";

function MyAlbumsPage() {
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
        />
      </div>

      <div name="album list test">
        <h2>test album list</h2>
        {albums.map((album) => (
          <div className="album-item">
            <h4>{album.name}</h4>
            <span>
              <strong>Orientation:</strong> {album.orientation}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyAlbumsPage;
