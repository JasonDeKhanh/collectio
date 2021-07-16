import React from "react";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import NavigateBeforeRoundedIcon from "@material-ui/icons/NavigateBeforeRounded";

const useStylesNavigateButton = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function NavigatePrevPageButton(props) {
  const {
    albumPages,
    currPageNum,
    setCurrPageNum,
    currID,
    currPage,
    setCurrPage,
  } = props;

  const currPageFromLink = useParams().pageNum;
  console.log("currPageFromLink = " + currPageFromLink);

  const buttonClasses = useStylesNavigateButton();

  const newPageNum = currPageNum - 1;

  const handleClick = () => {
    setCurrPageNum(newPageNum);
    console.log("prev page button, curr page num = " + newPageNum);
    setCurrPage(albumPages[newPageNum]);
  };

  return (
    <div>
      <IconButton
        aria-label="prevPage"
        color="primary"
        component={Link}
        to={"/edit/" + currID + "/" + newPageNum.toString()}
        disabled={currPageFromLink === "0"} // hard code, change if possible
        onClick={handleClick}
      >
        <NavigateBeforeRoundedIcon />
      </IconButton>
    </div>
  );
}

export default NavigatePrevPageButton;
