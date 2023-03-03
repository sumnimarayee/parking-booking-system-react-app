import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/Constants";

const BookingInformation = () => {
  const { state } = useLocation();
  const { parkingLotId } = state;
  const [parkingLot, setParkingLot] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetch() {
      const data = await axios.get(`${BASE_URL}/parking-lot/${parkingLotId}`);
      setParkingLot(data.data.data);
    }
    fetch();
  }, []);
  return (
    <div>
      <h1>Parking Lot</h1>
      <p className="parkingLotName">name: {parkingLot.name}</p>
      <p className="parkingLotLocation">location: {parkingLot.location}</p>
      <p className="bikeCapacity">
        bikeParkingCapacity: {parkingLot.bikeParkingCapacity}
      </p>
      <p className="carCapacity">
        carParkingCapacity: {parkingLot.carParkingCapacity}
      </p>
      <p className="bikeSlot">
        currentAvailableBikeParkingSlot:{" "}
        {parkingLot.currentAvailableBikeParkingSlot}
      </p>
      <p className="carSlot">
        currentAvailableCarParkingSlot:{" "}
        {parkingLot.currentAvailableCarParkingSlot}
      </p>
      <p className="openingTime">openingTime: {parkingLot.openingTime}</p>
      <p className="closingTime">closingTime: {parkingLot.closingTime}</p>
      <p className="bikeCostPerHour">
        bikeParkingCostPerHour: {parkingLot.bikeParkingCostPerHour}
      </p>
      <p className="carCostPerHour">
        carParkingCostPerHour: {parkingLot.carParkingCostPerHour}
      </p>
      <button
        type="button"
        class="btn btn-outline-info"
        onClick={() => {
          navigate("/test", {
            state: { vehicleType: "fourWheeler", parkingLotId: parkingLot._id },
          });
        }}
      >
        Car
      </button>
      <button
        type="button"
        class="btn btn-outline-info"
        onClick={() => {
          navigate("/time-selection", {
            state: { vehicleType: "twoWheeler", parkingLotId: parkingLot._id },
          });
        }}
      >
        Bike
      </button>
    </div>
  );
};

export default BookingInformation;
