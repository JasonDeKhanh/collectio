import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";

import firebase from "@firebase/app";
import "@firebase/firestore";
import "@firebase/storage";

import AlbumItem from "./ItemOnPage/AlbumItem";

function PreLoader(props) {
  const {
    albumPages, // pages array
    currPageNum,
    setCurrPageNum,
    currID,
    currPage,
    setCurrPage,
    itemsThisPage,
    setAlbumPages,
  } = props;

  const db = firebase.firestore();
  const uid = firebase.auth().currentUser?.uid;

  const [data, setData] = useState([]);
  const [done, setDone] = useState(undefined);

  useEffect(() => {
    // fetch the data, then setData(the data)
    // then setDone(true) which means data is loading.
    //const pagedata = itemsThisPage;
    //get current page data
    setData(itemsThisPage);
    setDone(true);
  }, []);

  return (
    <>
      {!done ? (
        <ReactLoading
          type={"bars"}
          color={"#3c54b4"}
          height={100}
          width={100}
        />
      ) : (
        <></>
      )}
    </>
  );
}

export default PreLoader;
