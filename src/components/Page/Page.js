import React from "react";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import { Button, Typography } from "@material-ui/core";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";

import firebase from "@firebase/app";
import "@firebase/firestore";
import "@firebase/storage";

import Draggable from "react-draggable";

import AlbumItem from "../ItemOnPage/AlbumItem";

import styles from "./Page.module.css";

// import PreLoader from "../PreLoader";

// card imported items style
const useStylesCard = makeStyles((theme) => ({
  root: {
    width: 200,
    height: 200,
    border: "1px solid #B5B5B5",
    margin: 10, // adjust spacing between the cards for now
  },
  cardTitle: {
    fontSize: [16],
    overflow: "hidden",
  },
  media: {
    // height: "100%",
    //width: 200,
    height: "70%",
    display: "flex",
    objectFit: "cover",
    margin: "auto",
    marginTop: 5,
    marginBottom: 5,
  },
  header: {
    height: 35,
    overflow: "hidden",
    display: "block",
    paddingTop: 13,
    paddingBottom: 0,
  },
}));

const useStylesPaperLandscape = makeStyles((theme) => ({
  root: {
    // display: "flex",
    // flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: 1280,
      height: 720,
    },
  },
  stuff: {
    width: 1280,
    height: 720,
  },
}));

const useStylesPaperPortrait = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: 720,
      height: 1280,
    },
  },
}));

function Page(props) {
  const cardClasses = useStylesCard();

  const db = firebase.firestore();
  const uid = firebase.auth().currentUser?.uid;
  // inside props will have
  // array of AlbumItem
  // or pass into props only the page number, then load the page object in here

  const {
    albumPages, // pages array
    currPageNum,
    setCurrPageNum,
    currID,
    currPage,
    setCurrPage,
    // itemsThisPage,
    setAlbumPages,
    itemsAdded,
    setItemsAdded,
  } = props;

  const currPageFromLink = parseInt(useParams().pageNum);

  console.log(currPageFromLink + " " + currID);
  //
  // const currPage = albumPages[currPageNum];
  // console.log(albumPages);
  //
  // do an if else here, if album orientation is landscape, then = useStylesLandscape(), else = useStylePortrait
  const paperClassesLandscape = useStylesPaperLandscape();
  const paperClassesPortrait = useStylesPaperPortrait();
  var paperClasses;
  if (currPage?.orientation === "landscape") {
    paperClasses = paperClassesLandscape;
  } else {
    paperClasses = paperClassesPortrait;
  }

  //= useStylesPaper();

  return (
    <div>
      {/* return some Paper/Background Item here I guess, maybe something like
      <AlbumBackground props={props}/>
      the props here could be the attributes required for the background, eg. color, patterns blabla whatever

      const items = idk retrieve the array from firesetore

      items.map((item) => {
        <AlbumItem item={item} /> smthing like this
      })
        */}

      {/* Paper size and stuff depends on album orientation */}
      <div className={paperClasses.root}>
        <Paper
          // style={
          //   // height: 500,
          //   // width: 500,
          //   // must keep this line for dragging boundaries to work
          //   // backgroundColor: "orange",
          //   // color: "#ffffff",
          //   currPage?.orientation === "landscape"
          //     ? { height: 720, width: 1280, position: "relative" }
          //     : { height: 1280, width: 720, position: "relative" }
          // }
          elevation={18}
        >
          <div
            style={
              // height: 500,
              // width: 500,
              // must keep this line for dragging boundaries to work
              // backgroundColor: "orange",
              // color: "#ffffff",
              currPage?.orientation === "landscape"
                ? { height: 720, width: 1280, position: "absolute" }
                : { height: 1280, width: 720, position: "absolute" }
            }
          >
            {/* need to put the ? because idk without it everything breaks */}
            <Grid container justify="center">
              <h2>Page Number : {currPage?.pgNum}</h2>
            </Grid>
            {/* Page background color: {currPage?.bgColor}
            <br />
            <br />
            Page orientation: {currPage?.orientation}
            <br />
            <br />
            Yes, these image cards are temporary to test out add function.
            <br />
            <br />
            can write this in the testing excel also.
            <br />
            also Brenda we need to fix these fonts thing HAHAHA
            <br /> */}
            {/* {itemsThisPage?.map((item) => (
              //do stuff
              <div>
                <img src={item.src} alt={item.name} />
                <h3>{item.name}</h3>
              </div>
            ))} */}
            {/* <Grid container direction="row" justify="center"> */}
            {/* <Grid container direction="row" justify="center"> */}
            {itemsAdded?.map((item) => (
              <AlbumItem
                thisItem={item}
                albumPages={albumPages}
                currPageNum={currPageNum}
                setCurrPageNum={setCurrPageNum}
                currID={currID}
                currPage={currPage}
                setCurrPage={setCurrPage}
                setAlbumPages={setAlbumPages}
                itemsAdded={itemsAdded}
                setItemsAdded={setItemsAdded}
              />
            ))}
          </div>
        </Paper>
      </div>
    </div>
  );
}

export default Page;
