import React from "react";

import { useState } from "react";

import Popup from "../Popup";

function CreateNewAlbumPopup(props) {
  const buttonPopup = props.trigger;
  const setButtonPopup = props.setTrigger;

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
    e.preventDefault();
    console.log(album);
  };

  return (
    <div>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <h1>Create New Album</h1>

        <br></br>
        <form onChange={onSubmit}>
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
