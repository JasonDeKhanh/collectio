import React from "react";
import { useState } from "react";

import Button from "@material-ui/core/Button";

import Draggable from "react-draggable";
import ViewingPageItemPopup from "./ViewingPageItemPopup";

function ViewingPageItem(props) {
  const {
    thisItem,
    // albumPages, // pages array
    currPageNum,
    // setCurrPageNum,
    // currID,
    // currPage,
    // setCurrPage,
    // itemsThisPage,
    // setAlbumPages,
    // itemsAdded,
    // setItemsAdded,
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
