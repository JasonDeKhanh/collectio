import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function ViewingPage() {
  const currID = useParams().albumID;
  const currPageFromLink = useParams().pageNum;

  return (
    <div>
      <div>Hello, this is the Viewing Page for album:</div>
      <br />
      <div>
        Id: {currID} and on page: {currPageFromLink}
      </div>
    </div>
  );
}

export default ViewingPage;
