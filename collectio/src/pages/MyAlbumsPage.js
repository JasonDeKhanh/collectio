import { useState } from "react";

import AppBar1 from "../components/AppBar1";

import CreateNewAlbumPopup from "../components/CreateNewAlbumPopup";

import styles from "../components/CreateNewAlbumButton.module.css";

function MyAlbumsPage() {
  const [buttonPopup, setButtonPopup] = useState(false);

  return (
    <div>
      <main>
        <button className={styles.button} onClick={() => setButtonPopup(true)}> Create New Album </button>
      </main>
      <CreateNewAlbumPopup trigger={buttonPopup} setTrigger={setButtonPopup} />
    </div>
  );
}

export default MyAlbumsPage;
