import React from "react";
import { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

import { fade } from "@material-ui/core/styles/colorManipulator";

import Draggable from "react-draggable";
import ViewingPageItemPopup from "./ViewingPageItemPopup";

const useStylesItem = makeStyles((theme) => ({
  // root: {
  //   display: "flex",
  //   //flexWrap: "wrap",
  //   justifyContent: "space-evenly",
  //   overflow: "hidden",
  //   backgroundColor: theme.palette.background.paper,
  // },
  // gridList: {
  //   width: "100%",
  // },
  // gridTile: {},
  // icon: {
  //   color: "rgba(255, 255, 255, 0.54)",
  // },
  // buttonCreateAlbum: {
  //   backgroundColor: "#5FC9FF",
  //   height: 200,
  //   width: "100%",
  //   margin: "auto",
  //   fontSize: 20,
  //   color: "white",
  //   fontWeight: "fontWeightBold",
  // },
  gridListTileBar: {
    background: "transparent",
  },
}));

function ViewingPageItem(props) {
  const {
    thisItem,
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

  const x = thisItem?.defaultPosition?.xPos;
  const y = thisItem?.defaultPosition?.yPos;

  const [buttonPopup, setButtonPopup] = useState(false);

  return thisItem.onPage === currPageNum.toString() ? (
    // <div style={{ transform: "rotate(90deg)" }}>
    <div>
      {/* <h1>hello</h1> */}
      {/* <GridListTile key={thisItem.img}> */}
      <Draggable disabled={true} defaultPosition={{ x: x, y: y }}>
        <Button onClick={() => setButtonPopup(true)}>
          <img
            src={thisItem.img}
            alt={thisItem.name}
            style={{
              // border: "2px solid #C8C8C8",
              height: "100%",
              width: thisItem?.itemWidth,
              // borderRadius: 5,
              // margin: "auto",
            }}
          />
        </Button>
      </Draggable>
      {/* </GridListTile> */}
      <br />
      <ViewingPageItemPopup
        thisItem={thisItem}
        trigger={buttonPopup}
        setTrigger={setButtonPopup}
      />
      <div> </div>
    </div>
  ) : null;
}

export default ViewingPageItem;
