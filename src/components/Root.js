import React from "react";

import MyAlbumsPage from "../pages/MyAlbumsPage";
import AppShell from "./AppShell";

function Root() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-10 col-xs-offset-1">
          <AppShell />
        </div>
      </div>
      <hr />
    </div>
  );
}

export default Root;
