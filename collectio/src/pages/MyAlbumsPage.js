import { useState } from "react";

import AppBar1 from "../components/AppBar1";
import SpacingGrid from "../components/Grid";

import CreateNewAlbumPopup from "../components/CreateNewAlbum";

function MyAlbumsPage() {
  const [buttonPopup, setButtonPopup] = useState(false);

  return (
    <div>
      <main>
        <button onClick={() => setButtonPopup(true)}> Create New Album </button>
      </main>

      <CreateNewAlbumPopup trigger={buttonPopup} setTrigger={setButtonPopup} />
    </div>
  );
}

export default MyAlbumsPage;
