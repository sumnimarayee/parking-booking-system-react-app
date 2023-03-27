import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosprivate from "../hooks/useAxiosPrivate";
import ImageCarousel from "./Common/ImageCarousel";

const images = [
  "https://www.shutterstock.com/image-photo/businessman-eyeglasses-using-mobile-phone-600w-2259903907.jpg",
  "https://www.shutterstock.com/image-photo/happy-gay-person-boyfriend-walking-600w-2259895345.jpg",
];

const BookingInformation = () => {
  const { state } = useLocation();
  const { parkingLotId } = state;
  const [parkingLot, setParkingLot] = useState({ imageURLs: [] });
  const navigate = useNavigate();
  const axios = useAxiosprivate();

  useEffect(() => {
    console.log("inside useeffect");
    async function fetch() {
      const data = await axios.get(`/parking-lot/${parkingLotId}`, {});
      setParkingLot(data.data.data);
    }
    fetch();
  }, []);
  return (
    <div className="booking-information-container">
      <ImageCarousel images={images} />

      <p className="parkingLotName">name: {parkingLot.name}</p>
      <p className="parkingLotLocation">location: {parkingLot.location}</p>
      <p className="bikeCapacity">
        bikeParkingCapacity: {parkingLot.bikeParkingCapacity}
      </p>
      <p className="carCapacity">
        carParkingCapacity: {parkingLot.carParkingCapacity}
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
        className="btn btn-outline-info"
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
        className="btn btn-outline-info"
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
