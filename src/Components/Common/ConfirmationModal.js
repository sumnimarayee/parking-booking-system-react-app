import React from "react";
import Modal from "react-modal";
// import "../../styles/ConfirmationModal.css";

const ConfirmationModal = (props) => {
  const { isOpen, onRequestClose, onConfirm, onCancel, title, message } = props;

  return (
    // <div className="confirmation-modal">
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirmation Modal"
      className="modal"
    >
      <h2>{title || "Confirm Action"}</h2>
      <p>{message || "Are you sure you want to proceed?"}</p>
      <button onClick={onConfirm}>Yes</button>
      <button onClick={onCancel || onRequestClose}>No</button>
    </Modal>
    // </div>
  );
};

export default ConfirmationModal;
