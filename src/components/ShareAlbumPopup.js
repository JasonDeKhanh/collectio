import React from "react";
import { useState } from "react";

import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import FileCopyIcon from "@material-ui/icons/FileCopy";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

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

  const [displayTooltip, setDisplayTooltip] = useState("none");
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      width: 1000,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      borderRadius: 15,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),

      fontSize: 18,
    },
    box: {
      border: "1px solid #010101",
      borderRadius: 5,
      paddingLeft: 5,
      paddingRight: 5,
    },
    button: {
      width: 370,
      color: "white",
      backgroundColor: displayTooltip === "none" ? "#46BBFC" : "#18FF60",
    },
  }));

  const Popup = useStyles();

  const linkToCurrAlbum = () => {
    return (
      "collectio-jasondekhanh.vercel.app/view/" +
      uid.toString() +
      "/" +
      currAlbumID.toString() +
      "/0"
    );
  };

  const handleClickCopy = () => {
    //   document.getElementById("custom-tooltip").style.display = "inline";
    setDisplayTooltip("inline");
    navigator.clipboard.writeText(linkToCurrAlbum());
    setTimeout(function () {
      // document.getElementById("custom-tooltip").style.display = "none";
      setDisplayTooltip("none");
    }, 1000);
  };

  const body = (
    <div className={Popup.paper} style={popupStyle}>
      <Grid container direction="row" justify="center">
        <div>Share your album, "{currAlbum?.name}", with your friends!</div>
      </Grid>
      <br />
      <Grid container direction="row" justify="center">
        <Button
          variant="outlined"
          className={Popup.button}
          onClick={handleClickCopy}
        >
          {displayTooltip === "none"
            ? "Click here to copy your sharing link now!"
            : "Copied"}
          {/* Click here to copy your sharing link now! */}
        </Button>
      </Grid>
      <br />
      <Grid container direction="row" justify="center">
        <div>After copying the link, send it to your friends</div>
      </Grid>
      <Grid container direction="row" justify="center">
        <div>
          and tell them to paste it in their browser to marvel at your album!
        </div>
      </Grid>
      <br />

      <Grid container direction="row" justify="center">
        <div>
          ...or if the button above somehow failed, copy the link directly
          below!
        </div>
      </Grid>
      <Grid container direction="row" justify="center" alignItems="center">
        {/* <IconButton>
          <FileCopyIcon fontSize="small" />
        </IconButton> */}
        <Box className={Popup.box}>
          <div>
            collectio-jasondekhanh.vercel.app/view/{uid}/{currAlbumID}/0
          </div>
        </Box>
      </Grid>
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
