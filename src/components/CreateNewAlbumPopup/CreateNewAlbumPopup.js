import React from "react";

import { useState } from "react";

import Popup from "../Popup";

import firebase from "@firebase/app";
import "@firebase/firestore";

function CreateNewAlbumPopup(props) {
  const buttonPopup = props.trigger;
  const setButtonPopup = props.setTrigger;
  const db = props.db;

  const [album, setAlbum] = useState({
    name: "",
    orientation: "",
  });

  const onChange = (e) => {
    setAlbum({
      ...album,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    //process creating album
    e.preventDefault();
    console.log(album);
    db.collection("albums").add(album);
    setButtonPopup(false);

    setAlbum({
      name: "",
      orientation: "",
    });
  };

  return (
    <div>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <h1>Create New Album</h1>

        <br></br>
        <form id="create-album-form" onSubmit={onSubmit}>
          <div>
            <label htmlFor="album-name">Album Name:</label>
            <br />
            <input
              type="text"
              value={album.name}
              onChange={onChange}
              name="name"
              id="album-name"
            />
          </div>
          <br></br>
          Orientation:
          <div value={album.orientation} onChange={onChange}>
            <input
              type="radio"
              id="portrait"
              name="orientation"
              value="portrait"
            />
            <label htmlFor="portrait">Portrait</label>
            <input
              type="radio"
              id="landscape"
              name="orientation"
              value="landscape"
            />
            <label htmlFor="landscape">Landscape</label>
          </div>
          <div>
            <button type="submit"> Create new album </button>
          </div>
        </form>
        <br></br>
      </Popup>
    </div>
  );
}

export default CreateNewAlbumPopup;
