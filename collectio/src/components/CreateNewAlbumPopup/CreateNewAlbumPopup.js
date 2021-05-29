import React from "react";
import "./CreateNewAlbumPopup.css";

function CreateNewAlbumPopup(props) {
  return props.trigger ? (
    <div>
      <div className="popup">
        <div className="popup-inner">
          <button className="close-btn" onClick={() => props.setTrigger(false)}>
            close
          </button>
          {props.children}
          <div>
            <h3> test test</h3>
            Why hello there
          </div>

          <button className="create-btn"> Create</button>

          <button
            className="cancel-btn"
            onClick={() => props.setTrigger(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default CreateNewAlbumPopup;
