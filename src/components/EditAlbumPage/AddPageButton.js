import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";

import firebase from "@firebase/app";
import "@firebase/firestore";
import "@firebase/storage";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function AddPageButton(props) {
  const { albumPages, setAlbumPages, currID, currPage } = props;

  const classes = useStyles();

  const uid = firebase.auth().currentUser?.uid;
  const db = firebase.firestore();

  const newPageNum = albumPages.length;

  const handleClick = () => {
    const newPage = {
      itemsOnPage: [],
      bgColor: "white",
      pgNum: newPageNum,
      orientation: currPage?.orientation,
    };

    db.collection("users")
      .doc(uid)
      .collection("albums")
      .doc(currID)
      .collection("pages")
      .doc(String(newPageNum))
      .set(newPage);

    // add to albumPages array somehow
    const tempAlbumPages = Object.assign([], albumPages);
    tempAlbumPages.push(newPage);
    setAlbumPages(tempAlbumPages);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<AddIcon />}
        onClick={handleClick}
      >
        Add Page
      </Button>
    </div>
  );
}

export default AddPageButton;
