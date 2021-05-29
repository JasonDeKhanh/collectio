import React from "react";
import "./CreateNewAlbumPopup.css";

function CreateNewAlbumPopup(props) {
  return props.trigger ? (
    <div>
      <div className="popup">
        <div className="popup-inner">
          <button className="close-btn" onClick={() => props.setTrigger(false)}>
            Close
          </button>
          {props.children}
          <div>
            <h3> Add a New Album </h3>
            
          </div>

          <button className="create-btn"> Create</button>

          
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default CreateNewAlbumPopup;
