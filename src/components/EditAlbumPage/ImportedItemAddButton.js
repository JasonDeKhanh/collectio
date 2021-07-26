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

    //delete item from imported items
    db.collection("users")
      .doc(uid)
      .collection("albums")
      .doc(currID)
      .collection("importedItems")
      .doc(importedItemID)
      .delete();

    setImportedItems(tempImportedItems);

    //create a new itemsAdded array
    // const tempItemsAdded = Object.assign([], itemsAdded);

    const tempItemAdded = {
      ...importedItem,
      defaultPosition: { xPos: 0, yPos: 0 },
      itemWidth: 100,
      itemHeight: "100%",
      onPage: currPageNum.toString(),
    };
    //add the imported item into the page in the tempPages array
    // tempItemsAdded.push(tempItemAdded);

    //add item to firebase
    var lastID;
    let finalItemAdded;
    db.collection("users")
      .doc(uid)
      .collection("albums")
      .doc(currID)
      .collection("itemsAdded")
      .add(tempItemAdded)
      .then((docRef) => {
        lastID = docRef.id;
        finalItemAdded = {
          ...tempItemAdded,
          id: lastID,
        };
        const tempItemsAdded = [...itemsAdded, { ...finalItemAdded }];
        setItemsAdded(tempItemsAdded);
        console.log("last ID inside " + lastID);
      })
      .then(() => {
        db.collection("users")
          .doc(uid)
          .collection("albums")
          .doc(currID)
          .collection("itemsAdded")
          .doc(lastID)
          .update({
            id: lastID,
          });
      });
    // console.log("last ID finalItem " + finalItemAdded.id);
    // .then(
    // finalItemAdded = {
    //   ...tempItemAdded,
    //   id: lastID,
    // };
    // )
    // tempItemsAdded.push(finalItemAdded);
    //update itemsAdded
    // console.log("lastID: " + lastID);

    // //create a new itemsAdded array
    // const tempItemsAdded = Object.assign([], itemsAdded);

    // const tempItemAdded = {
    //   ...importedItem,
    //   defaultPosition: { xPos: 0, yPos: 0 },
    //   itemWidth: 50,
    //   itemHeight: "100%",
    //   onPage: currPageNum.toString(),
    // };
    // //add the imported item into the page in the tempPages array
    // tempItemsAdded.push(tempItemAdded);

    // //add item to firebase
    // db.collection("users")
    //   .doc(uid)
    //   .collection("albums")
    //   .doc(currID)
    //   .collection("itemsAdded")
    //   .add(tempItemAdded)
    //   .then(setItemsAdded(tempItemsAdded)); //update itemsAdded
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
