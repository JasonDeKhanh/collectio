import React from "react";

import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { useTheme, useMediaQuery } from "@material-ui/core";
import Box from "@material-ui/core/Box";

import withWidth, { isWidthUp, isWidthDown } from "@material-ui/core/withWidth";

const useStylesPopup = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    // height: 500,
    // width: 1000,
    [theme.breakpoints.down("sm")]: {
      //   height: ,
      width: "80%",
    },
    [theme.breakpoints.up("sm")]: {
      //   height: ,
      width: "80%",
    },
    [theme.breakpoints.up("md")]: {
      //   height: 10,
      width: 600,
    },
    [theme.breakpoints.up("lg")]: {
      //   height: 500,
      width: 1000,
    },
    [theme.breakpoints.up("xl")]: {
      //   height: 500,
      width: 1000,
    },
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  grid: {
    // [theme.breakpoints.down("sm")]: {
    //   direction: "column",
    // },
    // [theme.breakpoints.up("sm")]: {
    //   direction: "column",
    // },
    direction: "column",
    justify: "center",
    alignItems: "center",
  },
}));

function ViewingPageItemPopup(props) {
  const thisItem = props.thisItem;
  const buttonPopup = props.trigger;
  const setButtonPopup = props.setTrigger;

  const handleClose = () => {
    setButtonPopup(false);
  };

  // Popup Modal style stuff
  function getPopupStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  const [popupStyle] = React.useState(getPopupStyle);
  const PopupStyle = useStylesPopup();
  ///////////////////

  const themeHere = useTheme();
  const useSmallScreen = useMediaQuery(themeHere.breakpoints.down("sm"));

  // image box style
  function getImageBoxStyle() {
    return {
      width: 400,
      height: 400,
      border: "1px solid #FF0000",
      paddingLeft: 0,
    };
  }
  const [imageBoxStyle] = React.useState(getImageBoxStyle);

  //////////////
  const body = (
    <div className={PopupStyle.paper} style={popupStyle}>
      <Grid
        container
        className={PopupStyle.grid}
        direction={useSmallScreen ? "column" : "row"}
        // justify="center"
        // alignItems="center"
      >
        <Box
          style={
            useSmallScreen
              ? {
                  width: "90%",
                  height: 200,
                  border: "1px solid #D6D6D6",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }
              : {
                  width: 400,
                  height: 400,
                  border: "1px solid #D6D6D6",

                  // three lines below put the picture in the middle of the box
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }
          }
        >
          {/* <Grid container justify="center" alignItems="center"> */}
          <img
            src={thisItem.img}
            alt={thisItem.name}
            style={{
              //   height: "100%",
              width: 200,
              // borderRadius: 5,
              // margin: "auto",
              // paddingRight: ,
            }}
          />
          {/* </Grid> */}
        </Box>

        <div>
          <div>hello this is a popup</div>
          <div>Note #1:</div>
          <div>{thisItem?.note1}</div>
        </div>
      </Grid>
      <br />
      <div>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );

  return (
    <div>
      <Modal open={buttonPopup} onClose={handleClose}>
        {body}
      </Modal>
    </div>
  );
}

export default ViewingPageItemPopup;
