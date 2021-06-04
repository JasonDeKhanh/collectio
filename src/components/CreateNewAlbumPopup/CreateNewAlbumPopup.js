import React from "react";

import { useState } from "react";

import Popup from "../Popup";

function CreateNewAlbumPopup(props) {
  const buttonPopup = props.trigger;
  const setButtonPopup = props.setTrigger;

  return (
    <div>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <h1>Hello bleh bleh bleh</h1>
        Test test walah
        <br></br>
        <br></br>
        <button> Create new album </button>
      </Popup>
    </div>
  );
}

export default CreateNewAlbumPopup;
