import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BASE_URL } from "../utils/Constants";
import axios from "axios";

const Esewa = () => {
  const { state } = useLocation();
  const { startTime, endTime, parkingLotId, vehicleType } = state;
  const [pinNO, setPinNO] = useState("");
  const [parkingLot, setParkingLot] = useState({});
  useEffect(() => {
    async function fetch() {
      const data = await axios.get(`${BASE_URL}/parking-lot/${parkingLotId}`);
      setParkingLot(data.data.data);
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
  return (
    <div>
      <p className="startTime">startTime: {startTime}</p>
      <p className="endTime">endTime: {endTime}</p>
      <p className="parkingLotId">parking lot name: {parkingLot.name}</p>
      <p className="vehicleType">location: {parkingLot.location}</p>
      <p className="vehicleType">vehicleType: {vehicleType}</p>
      <p className="vehicleType">
        totalCost:
        {calculateTotalCost(
          startTime,
          endTime,
          vehicleType == "twoWheeler"
            ? parkingLot.bikeParkingCostPerHour
            : parkingLot.carParkingCostPerHour
        )}
      </p>

      <input
        type="text"
        value={pinNO}
        onChange={(e) => setPinNO(e.target.value)}
      />
      <button>Confrim Booking</button>
    </div>
  );
};

export default Esewa;
