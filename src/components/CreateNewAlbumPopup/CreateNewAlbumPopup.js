import React from "react";

import { useState } from "react";

import Popup from "../Popup";

function CreateNewAlbumPopup(props) {
  const buttonPopup = props.trigger;
  const setButtonPopup = props.setTrigger;

  return (
    <div>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <h1>Create New Album</h1>

        <br></br>
        <form>
          <div>
            <label htmlFor="album-name">Album Name:</label>
            <br />
            <input type="text" name="name" id="album-name" />
          </div>
          <br></br>
          Orientation:
          <div>
            <input
              type="radio"
              name="orientation"
              id="album-orientation-portrait"
            />
            <label htmlFor="album-orientation-portrait">Portrait</label>
            <input
              type="radio"
              name="orientation"
              id="album-orientation-landscape"
            />
            <label htmlFor="album-orientation-landscape">Landscape</label>
          </div>
        </form>
        <br></br>
        <button> Create new album </button>
      </Popup>
    </div>
  );
}

export default CreateNewAlbumPopup;
