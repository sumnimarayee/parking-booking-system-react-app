import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useAxiosprivate from "../hooks/useAxiosPrivate";
import "../styles/Esewa.css";

const Esewa2 = () => {
  const { state } = useLocation();
  //   const { startTime, endTime, parkingLotId, vehicleType, vehiclePlateNo } =
  //     state;
  const [pinNo, setPinNo] = useState("");
  const [esewaId, setEswaId] = useState("");
  const [parkingLot, setParkingLot] = useState({});

  const axios = useAxiosprivate();

  useEffect(() => {
    async function fetch() {
      //   const data = await axios.get(`/parking-lot/${parkingLotId}`);
      //   setParkingLot(data.data.data);
    }
    fetch();
  }, []);

  const calculateTotalCost = (startTime, endTime, pricePerHour) => {
    console.log("from v " + startTime + " " + endTime + " " + pricePerHour);
    const start = startTime.split(":");
    const end = endTime.split(":");
    const totalHour = end[0] - start[0];
    const totalMinute = end[1] - start[1];
    const totalHourCost = totalHour * pricePerHour;
    const totalMinuteCost = (pricePerHour / 60) * totalMinute;
    const totalCost = totalHourCost + totalMinuteCost;
    return totalCost;
  };

  const handleEsewaSubmit = (e) => {};

  return (
    <div className="esewa-container">
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
              <div>{"90.00"}</div>
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
              <div>{"90.00"}</div>
            </div>
          </div>
        </div>
        <div className="body-right">
          <div className="body-heading">Login</div>
          <div className="payment-form">
            <form>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  eSewa ID:
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  placeholder="email/mobile number"
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="password"
                />
              </div>
            </form>
          </div>
          <div className="payment-buttons">
            <button className="confirm-button">CONFIRM</button>
            <button className="cancel-button">CANCEL</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Esewa2;
