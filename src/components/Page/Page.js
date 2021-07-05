import React from "react";
import { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import firebase from "@firebase/app";
import "@firebase/firestore";
import "@firebase/storage";

const useStylesPaperLandscape = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: 1280,
      height: 720,
    },
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
  const db = firebase.firestore();
  const uid = firebase.auth().currentUser?.uid;
  // inside props will have
  // array of AlbumItem
  // or pass into props only the page number, then load the page object in here
  const currPageNum = props.currPageNum;
  const currID = props.currID;
  const albumPages = props.albumPages; // pages array

  console.log(currPageNum + " " + currID);
  //
  const currPage = albumPages[currPageNum];
  console.log(albumPages);
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
        <Paper elevation={18}>
          <div>
            {/* need to put the ? because idk without it everything breaks */}
            {currPage?.bgColor}
            <br />
            {currPage?.orientation}
            <br />
            {currPage?.pgNum}
          </div>
        </Paper>
      </div>
    </div>
  );
}

export default Page;
