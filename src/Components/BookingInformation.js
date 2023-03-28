import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosprivate from "../hooks/useAxiosPrivate";
import SlideShow from "./Common/SlideShow";
import "../styles/BookingInformation.css";
import CarIcon from "@mui/icons-material/DirectionsCar";
import BikeIcon from "@mui/icons-material/TwoWheeler";

const BookingInformation = () => {
  const [parkingLot, setParkingLot] = useState({ imageURLs: [] });
  const navigate = useNavigate();
  const axios = useAxiosprivate();

  useEffect(() => {
    console.log("inside use effect");
    const parkingLotId = localStorage.getItem("userSelectedParkingLotId");
    if (!parkingLotId) {
      navigate("/user-dashboard");
    }
    async function fetch() {
      const data = await axios.get(`/parking-lot/${parkingLotId}`, {});
      setParkingLot(data.data.data);
      console.log(data.data.data);
    }
    fetch();
  }, []);
  return (
    <div className="booking-information-container">
      <div className="information-header">
        <div>{parkingLot.name}</div>
      </div>
      <div className="information-container">
        <div className="row information-tiles">
          <div className="col-lg-7" style={{ padding: 0 }}>
            <SlideShow images={parkingLot.imageURLs} />
          </div>
          <div className="col-lg-5 device-info-block" style={{ padding: 0 }}>
            <div className="first-row">
              <div className="first-item">
                <CarIcon style={{ width: "2.5rem", height: "2.5rem" }} />
                <div>{`RS. ${parkingLot?.carParkingCostPerHour}/Hour`}</div>
                <div>{`${
                  parkingLot?.carParkingCapacity -
                    parkingLot?.fourWheelerBookedSlots?.length || 0
                } - Slots available`}</div>
              </div>
              <div className="second-item">
                <BikeIcon style={{ width: "2.5rem", height: "2.5rem" }} />
                <div>{`RS. ${parkingLot?.bikeParkingCostPerHour}/Hour`}</div>
                <div>{`${
                  parkingLot?.bikeParkingCapacity -
                    parkingLot?.twoWheelerBookedSlots?.length || 0
                } - Slots available`}</div>
              </div>
            </div>
            <div className="second-row">
              <div className="first-item">
                <div style={{ cursor: "pointer" }}>
                  <u>Book Car Slot</u>
                </div>
              </div>
              <div className="second-item">
                <div style={{ cursor: "pointer" }}>
                  <u>Book Bike Slot</u>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="time-selectcontainer">
        <div className="time-card">
          {/* <MobileTimePicker defaultValue={dayjs('2022-04-17T15:30')} /> */}
        </div>
      </div>

      {/* <button
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
      </button> */}
    </div>
  );
};

export default BookingInformation;
