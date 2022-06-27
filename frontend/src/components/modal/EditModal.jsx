import "./editmodal.css";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";
import { useRef } from "react";
import api from '../../axios';

function EditModal({ show, setModal, user }) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  const handleClose = (e) => {
    e.preventDefault()
    setModal(false)
  }

  return (
    <>
      {show ? (
        <div className={showHideClassName}>
          <div className="modal-main">
            <h2 className="modalHeading">Update your profile</h2>
            <form className="modalform" >
              <input
                type="text"
                placeholder="Username?"
                className="modalInput"
              />
              <input
                type="text"
                placeholder="City?"
                className="modalInput"         
              />
              <input
                type="text"
                placeholder="From?"
                className="modalInput"
              />
              <input
                type="text"
                placeholder="Relationship status?"
                className="modalInput"
              />
              <div className="info">
                <InfoIcon className="inforel" />
                <span className="relInfo">
                  1: Single | 2: Married | 3: Don't want to disclose
                </span>
              </div>
              <div className="modalbtns">
                <button className="modalClose" >
                  Cancel
                </button>
                <button className="modalSubmit">Update</button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default EditModal;
