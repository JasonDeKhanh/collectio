import React from "react";

import { useState } from "react";

import firebase from "@firebase/app";
import "@firebase/firestore";
import "@firebase/storage";

import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

function ImportItemPopup(props) {
  const buttonPopup = props.trigger;
  const setButtonPopup = props.setTrigger;
  const importedItems = props.importedItems;
  const setImportedItems = props.setImportedItems;
  const currID = props.currID; // current album ID

  const uid = firebase.auth().currentUser?.uid;
  const db = firebase.firestore();

  const handleClose = () => {
    setButtonPopup(false);
  };

  const [fileUrl, setFileUrl] = useState(null);

  const [item, setItem] = useState({
    img: "",
    name: "",
    date: "",
    note1: "",
    note2: "",
  });

  const onChange = (e) => {
    setItem({
      ...item,
      img: fileUrl,
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

    setItem({
      ...item,
      img: fileUrl,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newImportedItem = {
      ...item,
      img: fileUrl,
    };

    const newImportedItems = [...importedItems, { ...newImportedItem }];

    db.collection("users")
      .doc(uid)
      .collection("albums")
      .doc(currID)
      .collection("importedItems")
      .add(newImportedItem);

    setImportedItems(newImportedItems);

    setButtonPopup(false);

    setItem({
      img: "",
      name: "",
      date: "",
      note1: "",
      note2: "",
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
      <h1>Import Item</h1>

      <br></br>
      <form id="create-item-form" onSubmit={onSubmit}>
        <div>
          <label htmlFor="item-img">Item Image:</label>
          <br />
          <input type="file" accept="image/*" onChange={onFileChange} />
        </div>
        <br></br>
        <div>
          <label htmlFor="item-name">Item Name:</label>
          <br />
          <input
            type="text"
            value={item.name}
            onChange={onChange}
            name="name"
            id="item-name"
          />
        </div>
        <br />
        <div>
          <label htmlFor="item-date">Date Obtained:</label>
          <br />
          <input
            type="date"
            value={item.date}
            onChange={onChange}
            name="date"
            id="item-date"
          />
        </div>
        <br />
        <div>
          <label htmlFor="item-note1">Note #1:</label>
          <br />

          <textarea
            name="note1"
            id="item-note1"
            value={item.note1}
            onChange={onChange}
          />
        </div>
        <br />
        <div>
          <label htmlFor="item-note2">Note #2:</label>
          <br />

          <textarea
            name="note2"
            id="item-note2"
            value={item.note2}
            onChange={onChange}
          />
        </div>
        <br />
        <div>
          <button type="submit"> Import new item </button>
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

export default ImportItemPopup;
