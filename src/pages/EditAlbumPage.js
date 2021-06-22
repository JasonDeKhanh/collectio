import react from "react";
import ImportDrawer from "../components/EditAlbumPage/ImportDrawer";
import AppShell from "../components/AppShell";

function EditAlbumPage() {
  return (
    <div>
      <br></br>
      <h1>Edit Page</h1>
      <div>
        <AppShell />
      </div>
      <div>
        <ImportDrawer />
      </div>
    </div>
  );
}

export default EditAlbumPage;
