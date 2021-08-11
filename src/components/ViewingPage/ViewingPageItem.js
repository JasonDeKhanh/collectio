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
    <div>
      <Draggable disabled={true} defaultPosition={{ x: x, y: y }}>
        <Button onClick={() => setButtonPopup(true)}>
          <img
            src={thisItem.img}
            alt={thisItem.name}
            style={{
              height: "100%",
              width: thisItem?.itemWidth,
            }}
          />
        </Button>
      </Draggable>
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
