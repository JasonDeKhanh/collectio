import React from "react";
import { useParams, Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import NavigateNextRoundedIcon from "@material-ui/icons/NavigateNextRounded";

const useStylesNavigateButton = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function NavigateNextPageButton(props) {
  const {
    albumPages,
    currPageNum,
    setCurrPageNum,
    currID,
    currPage,
    setCurrPage,
  } = props;

  const buttonClasses = useStylesNavigateButton();

  const handleClick = () => {
    const newPageNum = currPageNum + 1;
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
        to={"/edit/" + currID + "/1"}
        onClick={handleClick}
      >
        <NavigateNextRoundedIcon />
      </IconButton>
    </div>
  );
}

export default NavigateNextPageButton;
