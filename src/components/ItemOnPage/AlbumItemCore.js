import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";

import { fade } from "@material-ui/core/styles/colorManipulator";

import DeleteIcon from "@material-ui/icons/Delete";

import firebase from "@firebase/app";
import "@firebase/firestore";
import "@firebase/storage";

const useStylesItem = makeStyles((theme) => ({
  gridListTileBarCover: {
    height: "100%",
    background: "transparent",
  },
  gridListTileBar: {
    background: "transparent",
  },

  iconButton: {
    background: fade("#BDBDBD", 0.8),
    "&:hover": {
      background: fade("#f00", 0.75),
    },
    border: "1px solid #717171",
  },
}));

function AlbumItemCore(props) {
  const {
    currID,
    itemsAdded,
    setItemsAdded,
    thisItem,
    importedItems,
    setImportedItems,
  } = props;

  const itemClasses = useStylesItem();

  const db = firebase.firestore();
  const uid = firebase.auth().currentUser?.uid;

  const handleDelete = () => {
    const tempItemsAdded = Object.assign([], itemsAdded);
    for (var i = 0; i < tempItemsAdded.length; i++) {
      if (tempItemsAdded[i].id === thisItem.id) {
        // tempItemsAdded.splice(i, 1);
        tempItemsAdded[i].onPage = -1;
        break;
      }
    }

    // update firebase
    db.collection("users")
      .doc(uid)
      .collection("albums")
      .doc(currID)
      .collection("itemsAdded")
      .doc(thisItem?.id)
      .delete()
      .then(setItemsAdded(tempItemsAdded)) // update "local" array
      .then(() => {
        // add deleted item to the importedItem list
        const tempImportedItems = Object.assign([], importedItems);
        // tempImportedItems.push(thisItem);

        // update importedItem firebase
        var lastID;
        var finalImportedItem;
        db.collection("users")
          .doc(uid)
          .collection("albums")
          .doc(currID)
          .collection("importedItems")
          .add(thisItem)
          .then((docRef) => {
            lastID = docRef?.id;
          })
          .then(() => {
            db.collection("users")
              .doc(uid)
              .collection("albums")
              .doc(currID)
              .collection("importedItems")
              .doc(lastID)
              .update({
                id: lastID,
              });
            finalImportedItem = {
              ...thisItem,
              id: lastID,
            };
          })
          .then(tempImportedItems.push(finalImportedItem))
          .then(setImportedItems(tempImportedItems)); // update "local" array
      });
  };

  return (
    <GridListTile key={thisItem.img}>
      <img
        src={thisItem.img}
        alt={thisItem.name}
        style={{
          height: "100%",
          width: "100%",
        }}
      />
      <GridListTileBar className={itemClasses.gridListTileBarCover} />
      <GridListTileBar
        className={itemClasses.gridListTileBar}
        actionIcon={
          <IconButton
            className={itemClasses.iconButton}
            aria-label={`info about ${thisItem.name}`}
          >
            <DeleteIcon fontSize="small" onClick={handleDelete} />
          </IconButton>
        }
      />
    </GridListTile>
  );
}

export default AlbumItemCore;
