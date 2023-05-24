import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosprivate from "../hooks/useAxiosPrivate";
import "../styles/ParkingPayment.css";
import Loader from "./Common/Loader";
import Modal from "./Modals/Modal";

const ParkingPayment = () => {
  const [esewaId, setEswaId] = useState("");
  const [pinNo, setPinNo] = useState("");
  const [totalCost, setTotalCost] = useState({});
  const [formError, setFormError] = useState({});
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState({});

  const startTime = localStorage.getItem("userSelectedStartTime");
  const endTime = localStorage.getItem("userSelectedEndTime");
  const parkingLotId = localStorage.getItem("userSelectedParkingLotId");
  const vehiclePlateNo = localStorage.getItem("userSelectedVehiclePlateNumber");
  const vehicleType = localStorage.getItem("userSelectedVehicleType");

  const axios = useAxiosprivate();
  const navigate = useNavigate();

  useEffect(() => {
    if (!startTime || !endTime || !parkingLotId || !vehiclePlateNo) {
      navigate("/book");
    }
    async function fetch() {
      async function fetch() {
        const data = await axios.get(`/parking-lot/${parkingLotId}`);
        const requiredData = data.data.data;
        const totalCost = calculateTotalCost(
          vehicleType === "twoWheeler"
            ? requiredData.bikeParkingCostPerHour
            : vehicleType === "fourWheeler"
            ? requiredData.carParkingCostPerHour
            : 0
        );
        setTotalCost(totalCost.toFixed(2));
      }
      fetch();
    }

    fetch();
  }, []);

  function validate() {
    const error = {};
    if (
      (/^\d{10}$/.test(esewaId) || /^\S+@\S+\.\S+$/.test(esewaId)) != true ||
      !esewaId
    ) {
      error.esewaId = "Please provide a valid email or phone number";
    }

    if (!pinNo) {
      error.pinNo = "Please provide a pin number";
    }
    setFormError(error);
    return error;
  }

  const calculateTotalCost = (pricePerHour) => {
    const start = startTime.split(":");
    const end = endTime.split(":");
    const totalHour = end[0] - start[0];
    const totalMinute = end[1] - start[1];
    const totalHourCost = totalHour * pricePerHour;
    const totalMinuteCost = (pricePerHour / 60) * totalMinute;
    const totalCost = totalHourCost + totalMinuteCost;
    return totalCost;
  };

  const handleEsewaSubmit = () => {
    setLoader(true);
    const error = validate();
    if (Object.keys(error).length === 0) {
      const bookingPayload = {
        bookedParkingLot: parkingLotId,
        vehicleType,
        vehiclePlateNo,
        bookedTime: `${startTime}-${endTime}`,
      };
      console.log(bookingPayload);

      axios
        .post(`/booking`, bookingPayload)
        .then((response) => {
          setLoader(false);
          localStorage.removeItem("userSelectedParkingLotId");
          localStorage.removeItem("userSelectedStartTime");
          localStorage.removeItem("userSelectedEndTime");
          localStorage.removeItem("userSelectedVehiclePlateNumber");
          localStorage.removeItem("userSelectedVehicleType");
          setModal({
            show: true,
            title: "Booking Succes!!",
            message:
              "Your booking has been made successfully. Please refer to previous bookings page to get booking details.",
            type: "success",
            navigateTo: "/user-dashboard",
          });
        })
        .catch((err) => {
          setLoader(false);
          setModal({
            show: true,
            title: "Booking Failed!!",
            message: err.response.data.message,
            type: "failure",
            navigateTo: "/book",
          });
          console.log(err);
        });
    }
  };

  return (
    <div className="esewa-container">
      {loader ? <Loader /> : ""}
      {modal.show ? (
        <Modal
          modal={setModal}
          title={modal.title}
          message={modal.message}
          type={modal.type}
          hideAfterSeconds={modal.hideAfterSeconds}
          navigateTo={modal.navigateTo}
        />
      ) : (
        ""
      )}
      <div className="esewa-header">
        <h4> Please login to make your payment</h4>
      </div>
      <div className="esewa-body">
        <div className="body-left">
          <div className="body-heading">Transaction Details</div>
          <div className="left-body-subheading">eSewa ePay Payment</div>
          <div
            style={{
              fontSize: "1rem",
              fontWeight: "600",
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "0.5rem",
            }}
          >
            NPR
          </div>
          <div className="price-list-container">
            <div className="price-item">
              <div>Product Amount</div>
              <div>{`${totalCost}`}</div>
            </div>
            <div className="price-item">
              <div>Tax Amount</div>
              <div>0.00</div>
            </div>
            <div className="price-item">
              <div>Service Charge</div>
              <div>0.00</div>
            </div>
            <div className="price-item">
              <div>Delivery Charge</div>
              <div>0.00</div>
            </div>
            <div className="total-price">
              <div>Total Amount</div>
              <div>{`${totalCost}`}</div>
            </div>
          </div>
        </div>
        <div className="body-right">
          <div className="body-heading">Login</div>
          <div className="payment-form">
            <form>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  eSewa ID:
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="email/mobile number"
                  value={esewaId}
                  onChange={(e) => setEswaId(e.target.value)}
                />
                <div className="form-error-message">{formError.esewaId}</div>
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="pin number"
                  value={pinNo}
                  onChange={(e) => setPinNo(e.target.value)}
                />
                <div className="form-error-message">{formError.pinNo}</div>
              </div>
            </form>
          </div>
          <div className="payment-buttons">
            <button
              className="confirm-button"
              onClick={() => {
                handleEsewaSubmit();
              }}
            >
              CONFIRM
            </button>
            <button className="cancel-button">CANCEL</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ParkingPayment;
