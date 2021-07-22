import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

import firebase from "@firebase/app";
import "@firebase/firestore";
import "@firebase/storage";

const useStylesButton = makeStyles((theme) => ({
  button: {
    width: 100,
    height: 30,
    margin: theme.spacing(1),
  },
}));

function ImportedItemDeleteButton(props) {
  const buttonClasses = useStylesButton();

  const {
    importedItem,
    importedItemID,
    currID,
    importedItems,
    setImportedItems,
  } = props;

  const db = firebase.firestore();
  const uid = firebase.auth().currentUser?.uid;

  //   delete item from imported list
  const handleDelete = () => {
    const tempImportedItems = Object.assign([], importedItems);
    // now let's try to delete using array search ;--;
    for (var i = 0; i < tempImportedItems.length; i++) {
      if (tempImportedItems[i].id === importedItemID) {
        tempImportedItems.splice(i, 1);
        break;
      }
    }

    db.collection("users")
      .doc(uid)
      .collection("albums")
      .doc(currID)
      .collection("importedItems")
      .doc(importedItemID)
      .delete()
      .then(setImportedItems(tempImportedItems));
    // .then(() => {
    //   console.log("item successfully deleted!");
    // })
    // .catch((error) => {
    //   console.error("Error removing document: ", error);
    // });
  };

  return (
    <div>
      {/* <IconButton aria-label="share">
        <DeleteIcon />
      </IconButton> */}
      <Button
        variant="outlined"
        className={buttonClasses.button}
        startIcon={<DeleteIcon />}
        onClick={handleDelete}
      >
        Delete
      </Button>
    </div>
  );
}

export default ImportedItemDeleteButton;
