import React from "react";
import "../../styles/Modal.css";
import successAnimation from "../../assets/success-modal.gif";

function Modal({ modal, title, message, type }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              modal({ show: false });
            }}
          >
            X
          </button>
        </div>
        <div className="title">{title}</div>
        <div className="body">
          {type === "success" ? (
            <div className="success-gif">
              <img src={successAnimation} />
            </div>
          ) : (
            ""
          )}
          <p>{message}</p>
        </div>
        {type === "failure" ? (
          <div className="footer">
            <button
              onClick={() => {
                modal({ show: false });
              }}
              id="cancelBtn"
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
