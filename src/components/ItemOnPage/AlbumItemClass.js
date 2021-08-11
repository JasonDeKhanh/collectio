import React from "react";

import Draggable from "react-draggable";

import "@firebase/firestore";
import "@firebase/storage";

import styles from "./AlbumItemClass.module.css";

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
