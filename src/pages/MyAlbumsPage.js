import { useState, useEffect } from "react";

import AppBar1 from "../components/AppBar1";

import CreateNewAlbumPopup from "../components/CreateNewAlbumPopup";

import styles from "../components/CreateNewAlbumButton.module.css";

import firebase from "@firebase/app";
import "@firebase/firestore";

function MyAlbumsPage() {
  const [buttonPopup, setButtonPopup] = useState(false);

  const db = firebase.firestore();

  return (
    <div>
      <main>
        <button className={styles.button} onClick={() => setButtonPopup(true)}>
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
  );
}

export default MyAlbumsPage;
