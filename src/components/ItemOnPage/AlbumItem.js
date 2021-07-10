import React from "react";
import { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import firebase from "@firebase/app";
import "@firebase/firestore";
import "@firebase/storage";

import Draggable from "react-draggable";

const useStylesItem = makeStyles((theme) => ({}));

function AlbumItem(props) {
  const {
    albumPages, // pages array
    currPageNum,
    setCurrPageNum,
    currID,
    currPage,
    setCurrPage,
    itemsThisPage,
    setAlbumPages,
  } = props;

  const thisItem = props.thisItem;

  const db = firebase.firestore();
  const uid = firebase.auth().currentUser?.uid;

  const itemClasses = useStylesItem();

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const handleStop = (event, dragElement) => {
    setX(dragElement.x);
    setY(dragElement.y);

    // save position to firebase
    // create new temp item
    // put new temp item into new temp array
    // put new temp array into the itemsThisPage firebase

    // search the array to find the item with the same ID
    const tempItemsThisPage = Object.assign([], itemsThisPage);
    for (var i = 0; i < tempItemsThisPage.length; i++) {
      if (tempItemsThisPage[i].id === thisItem.id) {
        tempItemsThisPage[i] = {
          ...thisItem,
          defaultPosition: { xPos: dragElement.x, yPos: dragElement.y },
        };
      }
    }

    const tempPages = Object.assign([], albumPages);
    tempPages[currPageNum].itemsOnPage = tempItemsThisPage;

    setAlbumPages(tempPages);

    const tempPage = tempPages[currPageNum];

    setCurrPage(tempPage);

    // update in firebase
    db.collection("users")
      .doc(uid)
      .collection("albums")
      .doc(currID)
      .collection("pages")
      .doc(currPageNum.toString())
      .set(tempPage);
  };

  // display only the image
  // can:
  // - click on image then resize or delete (like MS Powerpoint)
  // - drag image around and the "location" will be saved
  // -

  return (
    <div>
      {/* {thisItem.name} */}

      <Draggable
        onStop={handleStop}
        position={{
          x: thisItem?.defaultPosition?.xPos,
          y: thisItem?.defaultPosition?.yPos,
        }}
        defaultPosition={{
          x: thisItem?.defaultPosition?.xPos,
          y: thisItem?.defaultPosition?.yPos,
        }}
      >
        <div className={itemClasses.img}>
          <img
            src={thisItem.img}
            alt={thisItem.name}
            style={{
              height: 200,
            }}
          />
        </div>
      </Draggable>
    </div>
  );
}

export default AlbumItem;
