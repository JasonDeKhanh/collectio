import React from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import firebase from "@firebase/app";
import "@firebase/firestore";
import "@firebase/storage";

import Draggable from "react-draggable";
import DraggableCore from "react-draggable";
import AlbumItemCore from "./AlbumItemCore";

import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

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
    importedItems,
    setImportedItems,
  } = props;

  const thisItem = props.thisItem;

  const db = firebase.firestore();
  const uid = firebase.auth().currentUser?.uid;

  const itemClasses = useStylesItem();

  // default position obtained from firebase
  const [x, setX] = useState(thisItem?.defaultPosition?.xPos);
  const [y, setY] = useState(thisItem?.defaultPosition?.yPos);

  // width and height of "box" / item
  // default should be the fetch data
  const [boxHeight, setBoxHeight] = useState(
    !thisItem?.itemHeight === "100%" ? thisItem?.itemHeight : "100%"
  );
  const [boxWidth, setBoxWidth] = useState(thisItem?.itemWidth);

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
    // const tempItemsAdded = Object.assign([], itemsAdded);
    const tempItemsAdded = [...itemsAdded];
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
    console.log("item id: " + thisItem.id);
    db.collection("users")
      .doc(uid)
      .collection("albums")
      .doc(currID)
      .collection("itemsAdded")
      .doc(thisItem.id)
      .update({
        defaultPosition: { xPos: dragElement.x, yPos: dragElement.y },
      });
  };

  // handle resizing
  const handleResize = (event, { element, size, handle }) => {
    setBoxHeight(size.height);
    setBoxWidth(size.width);

    const tempNewItem = {
      ...thisItem,
      itemHeight: size.height,
      itemWidth: size.width,
    };

    const tempItemsAdded = Object.assign([], itemsAdded);
    for (var i = 0; i < tempItemsAdded.length; i++) {
      if (tempItemsAdded[i].id === thisItem.id) {
        tempItemsAdded[i] = tempNewItem;
      }
    }

    db.collection("users")
      .doc(uid)
      .collection("albums")
      .doc(currID)
      .collection("itemsAdded")
      .doc(thisItem?.id)
      .update({ itemHeight: size.height, itemWidth: size.width })
      .then(setItemsAdded(tempItemsAdded));
  };

  // display only the image
  // can:
  // - click on image then resize or delete (like MS Powerpoint)
  // - drag image around and the "location" will be saved
  // -

  return thisItem?.onPage === currPageNum.toString() ? (
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
      <ResizableBox
        className="box"
        // width={boxWidth}
        // height={boxHeight}
        width={boxWidth}
        height={boxHeight}
        minConstraints={[50, "100%"]}
        resizeHandles={["nw"]}
        onResize={handleResize}
      >
        {/* <img
          src={thisItem.img}
          alt={thisItem.name}
          style={{
            height: "100%",
            width: "100%",
          }}
        /> */}
        <AlbumItemCore
          albumPages={albumPages}
          currPageNum={currPageNum}
          setCurrPageNum={setCurrPageNum}
          currID={currID}
          currPage={currPage}
          setCurrPage={setCurrPage}
          itemsThisPage={itemsThisPage}
          setAlbumPages={setAlbumPages}
          itemsAdded={itemsAdded}
          setItemsAdded={setItemsAdded}
          thisItem={thisItem}
          importedItems={importedItems}
          setImportedItems={setImportedItems}
        />
      </ResizableBox>
      {/* <h1 style={{ height: 100, width: 100 }}>hello</h1> */}
    </DraggableCore>
  ) : // </div>
  null;
}

export default AlbumItem;
