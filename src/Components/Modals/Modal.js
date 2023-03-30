import React, { useEffect } from "react";
import "../../styles/Modal.css";
import successAnimation from "../../assets/success-modal.gif";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";

function Modal({
  modal,
  title,
  message,
  type,
  hideAfterSeconds,
  navigateTo,
  handleConfirmation,
  data,
}) {
  console.log("navigateTo ==== " + navigateTo);
  const navigate = useNavigate();
  useEffect(() => {
    if (hideAfterSeconds) {
      setTimeout(() => {
        modal({ show: false });
      }, hideAfterSeconds * 1000);
    }
  }, []);
  return (
    <div className="modalBackground">
      <div className="transparent-background"></div>
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
        {type === "confirmation" ? (
          <div className="confirmation-icon">
            <QuestionMarkIcon
              style={{ width: "3.5em", height: "3.5em", color: "orange" }}
            />
          </div>
        ) : (
          ""
        )}
        {type === "information" ? (
          <div className="information-icon">
            <InfoIcon
              style={{ width: "3.5em", height: "3.5em", color: "royalBlue" }}
            />
          </div>
        ) : (
          ""
        )}

        <div className="title">{title}</div>
        <div className="body">
          <div className="message-body">{message}</div>
        </div>

        {type === "confirmation" ? (
          <div className="footer">
            <div className="confirmation-buttons">
              <button
                className="btn btn-outline-success"
                onClick={() => {
                  modal({ show: false });
                  if (handleConfirmation) {
                    console.log("printing whta recieved");
                    // console.log(data);
                    handleConfirmation(data);
                  }
                  if (navigateTo) {
                    navigate(navigateTo);
                  }
                }}
              >
                OK
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => {
                  modal({ show: false });
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : type === "failure" ||
          type === "information" ||
          !hideAfterSeconds ? (
          <div className="footer">
            <button
              className="btn btn-outline-danger"
              onClick={() => {
                modal({ show: false });
                if (navigateTo) {
                  navigate(navigateTo);
                }
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
