import React from "react";
import ReactDOM from "react-dom";

import Draggable from "react-draggable";

import firebase from "@firebase/app";
import "@firebase/firestore";
import "@firebase/storage";

import styles from "./AlbumItemClass.module.css";

//this shit is broken

// const thisItem = this.props.thisItem;
// const albumPages = this.props.albumPages;
// const currPageNum = this.props.currPageNum;
// const setCurrPageNum = this.props.setCurrPageNum;
// const currID = this.props.currID;
// const currPage = this.props.currPage;
// const setCurrPage = this.props.setCurrPage;
// const itemsThisPage = this.props.itemsThisPage;
// const setAlbumPages = this.props.setAlbumPages;

// const db = firebase.firestore();
// const uid = firebase.auth().currentUser?.uid;

export class AlbumItemClass extends React.Component {
  state = {
    activeDrags: 0,
    deltaPosition: {
      x: 0,
      y: 0,
    },
  };

  handleDrag = (e, ui) => {
    const { x, y } = this.state.deltaPosition;
    this.setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      },
    });
  };

  onStart = () => {
    this.setState({ activeDrags: ++this.state.activeDrags });
  };

  onStop = (event, dragElement) => {
    this.setState({ activeDrags: --this.state.activeDrags });

    // update firebase and local array
    // const tempItemsThisPage = Object.assign([], this.props.itemsThisPage);
    // for (var i = 0; i < tempItemsThisPage.length; i++) {
    //   if (tempItemsThisPage[i].id === this.props.thisItem.id) {
    //     tempItemsThisPage[i] = {
    //       ...this.props.thisItem,
    //       // defaultPosition: { xPos: dragElement.x, yPos: dragElement.y },
    //       defaultPosition: { xPos: this.x, yPos: this.y },
    //     };
    //   }
    // }

    // const tempPages = Object.assign([], this.props.albumPages);
    // tempPages[this.props.currPageNum].itemsOnPage = tempItemsThisPage;

    // this.props.setAlbumPages(tempPages);

    // const tempPage = tempPages[this.props.currPageNum];

    // this.props.setCurrPage(tempPage);

    // // update in firebase
    // firebase
    //   .firestore()
    //   .collection("users")
    //   .doc(firebase.auth().currentUser?.uid)
    //   .collection("albums")
    //   .doc(this.props.currID)
    //   .collection("pages")
    //   .doc(this.props.currPageNum.toString())
    //   .set(tempPage);
  };

  onDrop = (e) => {
    this.setState({ activeDrags: --this.state.activeDrags });
    if (e.target.classList.contains("drop-target")) {
      alert("Dropped!");
      e.target.classList.remove("hovered");
    }
  };
  onDropAreaMouseEnter = (e) => {
    if (this.state.activeDrags) {
      e.target.classList.add("hovered");
    }
  };
  onDropAreaMouseLeave = (e) => {
    e.target.classList.remove("hovered");
  };

  render() {
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
    const { deltaPosition, controlledPosition } = this.state;
    return (
      <div>
        <p></p>
        {/* <Draggable {...dragHandlers}>
        <div className="box">
          <img
            style={{
              height: 200,
            }}
            src={this.props.thisItem.img}
            alt={this.props.thisItem.name}
          />
        </div>
        </Draggable> */}

        <div
          className={styles.box}
          style={{
            height: "500px",
            width: "500px",
            position: "relative",
            overflow: "auto",
            padding: "0",
          }}
        >
          <div style={{ height: "1000px", width: "1000px", padding: "10px" }}>
            <Draggable bounds="parent" {...dragHandlers}>
              <div className={styles.box}>
                I can only be moved within my offsetParent.
                <br />
                <br />
                Both parent padding and child margin work properly.
              </div>
            </Draggable>
          </div>
        </div>
      </div>
    );
  }
}

// ReactDOM.render(<AlbumItemClass />, document.getElementById("container"));
