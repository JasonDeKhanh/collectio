import React from "react";

import { useState } from "react";

import { useParams } from "react-router";

import { makeStyles } from "@material-ui/core/styles";
import AddBoxIcon from "@material-ui/icons/AddBox";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

import firebase from "@firebase/app";
import "@firebase/firestore";
import "@firebase/storage";

const useStylesButton = makeStyles((theme) => ({
  button: {
    width: 70,
    height: 30,
    margin: theme.spacing(1),
  },
}));

function ImportedItemAddButton(props) {
  const buttonClasses = useStylesButton();

  const {
    importedItem,
    importedItemID,
    currID,
    importedItems,
    setImportedItems,
    albumPages,
    setAlbumPages,
    currPageNum,
    setCurrPageNum,
    itemsAdded,
    setItemsAdded,
  } = props;

  const db = firebase.firestore();
  const uid = firebase.auth().currentUser?.uid;

  // delete item from imported items list, add item to page's item collection.
  const handleAdd = () => {
    const tempImportedItems = Object.assign([], importedItems);

    // now let's try to delete using array search ;--;
    for (var i = 0; i < tempImportedItems.length; i++) {
      if (tempImportedItems[i].id === importedItemID) {
        tempImportedItems.splice(i, 1);
        break;
      }
    }

    setImportedItems(tempImportedItems);

    //delete item from imported items
    db.collection("users")
      .doc(uid)
      .collection("albums")
      .doc(currID)
      .collection("importedItems")
      .doc(importedItemID)
      .delete();

    //create a new itemsAdded array
    const tempItemsAdded = Object.assign([], itemsAdded);

    const tempItemAdded = {
      ...importedItem,
      defaultPosition: { xPos: 0, yPos: 0 },
      itemWidth: 200,
      itemHeight: "100%",
      onPage: currPageNum,
    };
    //add the imported item into the page in the tempPages array
    tempItemsAdded.push(tempItemAdded);

    //update itemsAdded
    setItemsAdded(tempItemsAdded);

    //add item to firebase
    db.collection("users")
      .doc(uid)
      .collection("albums")
      .doc(currID)
      .collection("itemsAdded")
      .add(tempItemAdded);
  };

  return (
    <div>
      <Button
        variant="outlined"
        className={buttonClasses.button}
        startIcon={<AddBoxIcon />}
        onClick={handleAdd}
      >
        Add
      </Button>
    </div>
  );
}

export default ImportedItemAddButton;
