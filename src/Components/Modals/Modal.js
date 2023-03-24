import React, { useEffect } from "react";
import "../../styles/Modal.css";
import successAnimation from "../../assets/success-modal.gif";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

function Modal({ modal, title, message, type, hideAfterSeconds }) {
  useEffect(() => {
    if (hideAfterSeconds) {
      setTimeout(() => {
        modal({ show: false });
      }, hideAfterSeconds * 1000);
    }
  }, []);
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        {/* <div className="titleCloseBtn">
          <button
            onClick={() => {
              modal({ show: false });
            }}
          >
            X
          </button>
        </div> */}
        {type === "success" ? (
          <div className="success-gif">
            <img src={successAnimation} />
          </div>
        ) : (
          ""
        )}

        {type === "failure" ? (
          <div className="failure-icon">
            <ErrorOutlineIcon
              style={{ width: "3.5em", height: "3.5em", color: "red" }}
            />
          </div>
        ) : (
          ""
        )}
        <div className="title">{title}</div>
        <div className="body">
          <div className="message-body">{message}</div>
        </div>

        {type === "failure" ? (
          <div className="footer">
            <button
              className="btn btn-outline-danger"
              onClick={() => {
                modal({ show: false });
              }}
            >
              OK
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Modal;
