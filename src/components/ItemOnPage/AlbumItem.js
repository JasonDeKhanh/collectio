import React from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import firebase from "@firebase/app";
import "@firebase/firestore";
import "@firebase/storage";

import Draggable from "react-draggable";
import DraggableCore from "react-draggable";

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
    itemsAdded,
    setItemsAdded,
  } = props;

  const thisItem = props.thisItem;

  const db = firebase.firestore();
  const uid = firebase.auth().currentUser?.uid;

  const itemClasses = useStylesItem();

  // default position obtained from firebase
  const [x, setX] = useState(thisItem?.defaultPosition?.xPos);
  const [y, setY] = useState(thisItem?.defaultPosition?.yPos);

  const currPageFromLink = parseInt(useParams().pageNum);

  const handleStop = (event, dragElement) => {
    // event.preventDefault();
    setX(dragElement.x);
    setY(dragElement.y);
    // save position to firebase
    // create new temp item
    // put new temp item into new temp array
    // put new temp array into the itemsThisPage firebase
    const tempNewItem = {
      ...thisItem,
      // defaultPosition: { xPos: dragElement.x, yPos: dragElement.y },
      defaultPosition: { xPos: dragElement.x, yPos: dragElement.y },
    };

    // search the array to find the item with the same ID
    const tempItemsAdded = Object.assign([], itemsAdded);
    for (var i = 0; i < tempItemsAdded.length; i++) {
      if (tempItemsAdded[i].id === thisItem.id) {
        tempItemsAdded[i] = tempNewItem;
      }
    }

    // const tempPages = Object.assign([], albumPages);

    // tempPages[currPageNum].itemsOnPage = tempItemsThisPage;

    // setAlbumPages(tempPages);

    // const tempPage = tempPages[currPageNum];

    // setCurrPage(tempPage);

    setItemsAdded(tempItemsAdded);

    // update in firebase
    db.collection("users")
      .doc(uid)
      .collection("albums")
      .doc(currID)
      .collection("itemsAdded")
      .doc(thisItem.id)
      .set(tempNewItem);
  };

  // display only the image
  // can:
  // - click on image then resize or delete (like MS Powerpoint)
  // - drag image around and the "location" will be saved
  // -

  return (
    // <div
    //   style={
    //     currPage?.orientation === "landscape"
    //       ? { height: 720, width: 1280 }
    //       : { height: 1280, width: 720 }
    //   }
    // >

    <DraggableCore
      onStop={handleStop}
      // position={{
      //   x: thisItem?.defaultPosition?.xPos,
      //   y: thisItem?.defaultPosition?.yPos,
      // }}
      position={{
        x: x,
        y: y,
      }}
      // bounds={{ left: 500, top: 500, right: 500, bottom: 200 }}
      bounds="parent"
      // defaultPosition={{
      //   x: thisItem?.defaultPosition?.xPos,
      //   y: thisItem?.defaultPosition?.yPos,
      // }}
    >
      <img
        src={thisItem.img}
        alt={thisItem.name}
        style={{
          height: 200,
          width: 200,
        }}
      />
      {/* <h1 style={{ height: 100, width: 100 }}>hello</h1> */}
    </DraggableCore>
    // </div>
  );
}

export default AlbumItem;
