import React from "react";
import { useParams } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import { Typography } from "@material-ui/core";

import Box from "@material-ui/core/Box";

import "@firebase/firestore";
import "@firebase/storage";

import AlbumItem from "../ItemOnPage/AlbumItem";

const useStylesPaperLandscape = makeStyles((theme) => ({
  root: {
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
      height: 1018,
    },
  },
}));

function Page(props) {
  const {
    currAlbum,
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
    importedItems,
    setImportedItems,
  } = props;

  const useStylesTitle = makeStyles((theme) =>
    currPage?.orientation === "landscape"
      ? {
          title: {
            fontFamily: "Roboto Slab",
            fontWeight: 250,
            fontSize: 200,
          },
        }
      : {
          title: {
            fontFamily: "Roboto Slab",
            fontWeight: 250,
            fontSize: 120,
          },
        }
  );

  const currPageFromLink = parseInt(useParams().pageNum);

  console.log(currPageFromLink + " " + currID);
  // do an if else here, if album orientation is landscape, then = useStylesLandscape(), else = useStylePortrait
  const paperClassesLandscape = useStylesPaperLandscape();
  const paperClassesPortrait = useStylesPaperPortrait();
  var paperClasses;
  if (currPage?.orientation === "landscape") {
    paperClasses = paperClassesLandscape;
  } else {
    paperClasses = paperClassesPortrait;
  }

  const titleClasses = useStylesTitle();

  return (
    <div>
      {/* Paper size and stuff depends on album orientation */}
      <div className={paperClasses.root}>
        <Paper elevation={18}>
          <div
            container
            style={
              currPage?.orientation === "landscape"
                ? {
                    height: 720,
                    width: 1280,
                    position: "relative",
                  }
                : {
                    height: 1018,
                    width: 720,
                    position: "relative",
                  }
            }
          >
            {/* need to put the ? because idk without it everything breaks */}
            {currPageNum.toString() === "0" ? (
              <Grid
                container
                style={
                  currPage?.orientation === "landscape"
                    ? {
                        height: 720,
                      }
                    : {
                        height: 1018,
                      }
                }
                alignItems="center"
                justify="center"
              >
                <Box
                  style={
                    currPage?.orientation === "landscape"
                      ? {
                          width: 1050,
                          height: 550,
                          border: "1px solid #D6D6D6",

                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }
                      : {
                          width: 550,
                          height: 720,
                          border: "1px solid #D6D6D6",

                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }
                  }
                >
                  <Typography className={titleClasses.title} variant="h1">
                    {currAlbum?.name}
                  </Typography>
                </Box>
              </Grid>
            ) : null}
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
                importedItems={importedItems}
                setImportedItems={setImportedItems}
              />
            ))}
          </div>
        </Paper>
      </div>
    </div>
  );
}

export default Page;
