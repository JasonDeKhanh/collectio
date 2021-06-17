import React from "react";

import { useState } from "react";

import Popup from "../Popup";

import firebase from "@firebase/app";
import "@firebase/firestore";
import "@firebase/storage";

//import duck from "./duck.jpg";

function CreateNewAlbumPopup(props) {
  const buttonPopup = props.trigger;
  const setButtonPopup = props.setTrigger;
  const db = props.db;
  const storage = props.storage;

  const [fileUrl, setFileUrl] = useState(null);

  const [album, setAlbum] = useState({
    coverImg: "",
    name: "",
    orientation: "",
  });

  const onChange = (e) => {
    setAlbum({
      ...album,
      coverImg: fileUrl,
      [e.target.name]: e.target.value,
    });
  };

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
  };

  const onSubmit = (e) => {
    //process creating album
    e.preventDefault();
    console.log(album);

    const uid = firebase.auth().currentUser?.uid;

    db.collection("users").doc(uid).collection("albums").add(album);
    setButtonPopup(false);

    setAlbum({
      coverImg: "",
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
          <br></br>
          <div>
            <input type="file" onChange={onFileChange} />
          </div>
          <br></br>
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
