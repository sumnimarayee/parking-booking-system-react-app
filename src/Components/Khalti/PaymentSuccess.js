import Modal from "../Modals/Modal";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [modal, setModal] = useState({});
  useEffect(() => {
    setModal({
      show: true,
      title: "Payment Success",
      message: "Booking created successfully",
      type: "success",
    });
    setTimeout(() => {
      navigate("/user-dashboard");
    }, 3000);
  }, []);
  return (
    <div style={{ width: "97vw", height: "92vh" }}>
      {modal.show ? (
        <Modal
          modal={setModal}
          title={modal.title}
          message={modal.message}
          type={modal.type}
        />
      ) : (
        ""
      )}
    </div>
  );
}
