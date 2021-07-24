import React from "react";

import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

import firebase from "@firebase/app";
import "@firebase/firestore";
import "@firebase/storage";

function ShareAlbumPopup(props) {
  const buttonPopup = props.trigger;
  const setButtonPopup = props.setTrigger;
  const currAlbum = props.currAlbum;
  const uid = props.uid;

  const currAlbumID = currAlbum?.id;

  const handleClose = () => {
    setButtonPopup(false);
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
      width: 500,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  const Popup = useStyles();

  const body = (
    <div className={Popup.paper} style={popupStyle}>
      <div>Share your album with your friends!</div>
      <div>Append the following </div>
      <div>
        /view/{uid}/{currAlbumID}/0
      </div>
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

export default ShareAlbumPopup;
