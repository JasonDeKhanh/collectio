import React from "react";
import { useParams, Link } from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";
import NavigateNextRoundedIcon from "@material-ui/icons/NavigateNextRounded";

function NavigateNextPageButton(props) {
  const {
    uid,
    albumPages,
    currPageNum,
    setCurrPageNum,
    currID,
    setCurrPage,
    inMode,
  } = props;

  const currPageFromLink = parseInt(useParams().pageNum);
  console.log("curr page from link next: " + currPageFromLink);
  const newPageNum = currPageFromLink + 1;

  // find max page num
  const lastPage = albumPages.length - 1;

  const handleClick = () => {
    setCurrPageNum(newPageNum);
    console.log("next page button, curr page num = " + newPageNum);
    setCurrPage(albumPages[newPageNum]);
  };

  return (
    <div>
      <IconButton
        aria-label="prevPage"
        color="primary"
        component={Link}
        to={
          inMode === "edit"
            ? "/edit/" + currID + "/" + newPageNum.toString()
            : inMode === "view"
            ? "/view/" + uid + "/" + currID + "/" + newPageNum.toString()
            : "/"
        }
        disabled={currPageNum >= lastPage}
        onClick={handleClick}
      >
        <NavigateNextRoundedIcon />
      </IconButton>
    </div>
  );
}

export default NavigateNextPageButton;
