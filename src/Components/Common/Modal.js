import React from "react";

const Modal = (props) => {
  return (
    <>
      {props.modalState && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            padding: "1rem",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.26)",
            position: "absolute",
            zIndex: 1000000,
          }}
        >
          <h3>{props.title}</h3>
          <p>{props.content}</p>
          <button onClick={() => props.closeModal()}>Close</button>
        </div>
      )}
    </>
  );
};

export default Modal;
