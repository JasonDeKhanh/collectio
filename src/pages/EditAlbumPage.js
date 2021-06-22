import react from "react";

import ImportDrawer from "../components/EditAlbumPage/ImportDrawer";
import AppShell from "../components/AppShell";

const body = (
  <div>
    <h1>blablablbalbablabla</h1>
    <h2> bleh bleh bleh bleh</h2>
    <h3> blu blu blu blu blu blu blu</h3>
    <button> click me </button>
  </div>
);

function EditAlbumPage() {
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
