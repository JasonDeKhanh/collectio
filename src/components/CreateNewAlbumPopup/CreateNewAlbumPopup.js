import React from "react";

import { useState } from "react";

import firebase from "@firebase/app";
import "@firebase/firestore";
import "@firebase/storage";

import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

function CreateNewAlbumPopup(props) {
  const buttonPopup = props.trigger;
  const setButtonPopup = props.setTrigger;
  const albums = props.albums;
  const setAlbums = props.setAlbums;

  const uid = firebase.auth().currentUser?.uid;
  const db = firebase.firestore();

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

    const newAlbum = {
      ...album,
      coverImg: fileUrl,
    };

    const newAlbums = [...albums, { ...newAlbum }];

    var lastID;

    db.collection("users")
      .doc(uid)
      .collection("albums")
      .add(newAlbum)
      .then((docRef) => {
        lastID = docRef.id;
        // console.log("last id: " + lastID);
      })
      .then(() => {
        // adding cover page to album
        db.collection("users")
          .doc(uid)
          .collection("albums")
          .doc(lastID)
          .collection("pages")
          .doc("0")
          .set({
            itemsOnPage: [],
            bgColor: "white",
            pgNum: 0,
            orientation: newAlbum.orientation,
          });

        // adding blank page 1 to album
        db.collection("users")
          .doc(uid)
          .collection("albums")
          .doc(lastID)
          .collection("pages")
          .doc("1")
          .set({
            itemsOnPage: [],
            bgColor: "white",
            pgNum: 1,
            orientation: newAlbum.orientation,
          });
      });

    setAlbums(newAlbums);

    setButtonPopup(false);

    setAlbum({
      coverImg: "",
      name: "",
      orientation: "",
    });
  };

  // Popup Modal stuff
  function getPopupStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const [popupStyle] = React.useState(getPopupStyle);

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

  const Popup = useStyles();

  // Body of modal
  const body = (
    <div className={Popup.paper} style={popupStyle}>
      <h1>Create New Album</h1>

      <br></br>
      <form id="create-album-form" onSubmit={onSubmit}>
        <div>
          <label htmlFor="album-cover-img">Cover Image:</label>
          <br />
          <input type="file" accept="image/*" onChange={onFileChange} />
        </div>
        <br></br>
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
    </div>
  );
}

export default CreateNewAlbumPopup;
