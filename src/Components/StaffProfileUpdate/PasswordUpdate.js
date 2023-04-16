import LockResetIcon from "@mui/icons-material/LockReset";
import axios from "../../api/axios";
import { useState } from "react";
import useAxiosprivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import "../../styles/PasswordUpdate.css";
import Loader from "../Common/Loader";
import Modal from "../Modals/Modal";
import { computeStaffProfileUpdatePercentage } from "../../utils/utility";

const PasswordUpdate = ({ setProfileCompletedPercentage }) => {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState({});
  const { auth } = useAuth();
  const axiosPrivate = useAxiosprivate();

  const handlePasswordChange = () => {
    let error = "";
    if (password.length > 0) {
      if (password.length < 6) {
        error = "Password must be at least 6 characters";
      }
    }

    setPasswordError(error);
    if (passwordError.length === 0) {
      console.log(1);
      setLoader(true);
      const payload = {
        password: password,
        id: auth.id,
      };
      axios
        .patch("/change-password", payload)
        .then(async (res) => {
          const parkingLot = await axiosPrivate.get(
            `parking-lot/${localStorage.getItem("parkingLotId")}`
          );
          const percent = computeStaffProfileUpdatePercentage(
            parkingLot.data.data.updatedItems
          );
          localStorage.setItem("profileCompletedPercentage", percent);
          setLoader(false);
          setModal({
            show: true,
            title: "Password Updated",
            message: "Your password has been updated successfully",
            type: "success",
            hideAfterSeconds: 3,
          });
          setProfileCompletedPercentage(percent);
          resetPasswordChange();
        })
        .catch((error) => {
          setLoader(false);
        });
    }
  };

  const resetPasswordChange = () => {
    setPassword("");
    setPasswordError("");
  };
  return (
    <div className="password-update-container">
      {loader ? <Loader /> : ""}
      {modal.show ? (
        <Modal
          modal={setModal}
          title={modal.title}
          message={modal.message}
          type={modal.type}
          hideAfterSeconds={modal.hideAfterSeconds}
        />
      ) : (
        ""
      )}
      <div className="password-update-card">
        <div className="icon">
          <LockResetIcon
            style={{ width: "5rem", height: "5rem", color: "lightblue" }}
          />
        </div>
        <div className="heading">Reset Your Password</div>
        <div className="description">
          Provide the password below to update the password. You will still be
          logged on after changin the password but will need to provide new
          password next time when you log in
        </div>
        <div className="form-group">
          <input
            type="password"
            id="passwrod"
            className="form-control-lg"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Enter new password"
            style={{ outline: "1px solid #ced4da", borderRadius: "5px" }}
          />
          <div className="form-error-message  ">{passwordError}</div>
        </div>
        {password.length > 0 ? (
          <div className="password-update-button-holder">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={() => {
                handlePasswordChange();
              }}
            >
              Update
            </button>
            <button
              type="button"
              className="btn btn-danger btn-lg"
              onClick={() => resetPasswordChange()}
            >
              Discard
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default PasswordUpdate;
