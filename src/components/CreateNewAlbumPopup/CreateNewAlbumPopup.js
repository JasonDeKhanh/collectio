import React from "react";

import { useState } from "react";

import Popup from "../Popup";

import firebase from "@firebase/app";
import "@firebase/firestore";
import "@firebase/storage";

import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

//import duck from "./duck.jpg";

function CreateNewAlbumPopup(props) {
  const buttonPopup = props.trigger;
  const setButtonPopup = props.setTrigger;
  const db = props.db;
  const storage = props.storage;

  const handleClose = () => {
    setButtonPopup(false);
  };

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

    console.log(fileUrl);

    setAlbum({
      ...album,
      coverImg: fileUrl,
    });
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

  // Modal stuff
  function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  const classes = useStyles();

  // Body of modal
  const body = (
    <div className={classes.paper}>
      <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
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
        <div>
          <button onClick={handleClose}>Cancel</button>
        </div>
      </form>
      <br></br>
    </div>
  );

  return (
    <div>
      <div>
        <Modal open={buttonPopup} onClose={handleClose}>
          {body}
        </Modal>
      </div>

      {/* <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
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
      </Popup> */}
    </div>
  );
}

export default CreateNewAlbumPopup;
