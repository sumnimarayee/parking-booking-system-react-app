import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosprivate from "../hooks/useAxiosPrivate";
import SlideShow from "./Common/SlideShow";
import "../styles/BookingInformation.css";
import CarIcon from "@mui/icons-material/DirectionsCar";
import BikeIcon from "@mui/icons-material/TwoWheeler";
import { TimePicker } from "react-ios-time-picker";
import Loader from "./Common/Loader";
import Modal from "./Modals/Modal";
const moment = require("moment");

const BookingInformation = () => {
  const [parkingLot, setParkingLot] = useState({ imageURLs: [] });
  const [selectedStartTime, setSelectedStartTime] = useState(
    moment().format("HH:mm")
  );
  const [selectedEndTime, setSelectedEndTime] = useState(
    moment().format("HH:mm")
  );
  const [vehiclePlateNumber, setVehiclePlateNumber] = useState("");
  const [displayTimePicker, setDisplayTimePicker] = useState(false);
  const [formError, setFormError] = useState({});
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState({});

  const handleStartTimeChange = (time) => {
    setSelectedStartTime(time);
  };
  const handleEndTimeChange = (time) => {
    setSelectedEndTime(time);
  };

  const validateInput = () => {
    const error = {};
    const currentTime = moment().format("HH:mm");
    const [startHour, startMinute] = selectedStartTime.split(":").map(Number);
    const [endHour, endMinute] = selectedEndTime.split(":").map(Number);
    const startMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;
    if (
      !moment(selectedStartTime, "HH:mm").isSameOrAfter(
        moment(currentTime, "HH:mm")
      )
    ) {
      error.time = "Can't book in past time";
    } else {
      if (
        startHour > endHour ||
        (startHour === endHour && startMinute >= endMinute)
      ) {
        // startTime is after endTime or they are the same time
        error.time = "Start Time must be less than end time.";
      } else if (endMinutes - startMinutes < 30) {
        // less than 30 minutes difference between startTime and endTime
        error.time =
          "There must be minumum of 30 minute difference between start and end time";
      }
    }

    if (!vehiclePlateNumber) {
      error.plateNumber = "Please provide vehicle plate number";
    }

    setFormError(error);
    return error;
  };

  const loadPaymentPage = () => {
    const errors = validateInput();
    if (Object.keys(errors).length === 0) {
      localStorage.setItem("userSelectedStartTime", selectedStartTime);
      localStorage.setItem("userSelectedEndTime", selectedEndTime);
      localStorage.setItem(
        "userSelectedVehiclePlateNumber",
        vehiclePlateNumber
      );
      navigate("/parking-payment");
    }
  };

  const navigate = useNavigate();
  const axios = useAxiosprivate();

  useEffect(() => {
    setLoader(true);
    const parkingLotId = localStorage.getItem("userSelectedParkingLotId");
    if (!parkingLotId) {
      navigate("/user-dashboard");
    }
    async function fetch() {
      const data = await axios.get(`/parking-lot/${parkingLotId}`, {});
      setParkingLot(data.data.data);
      setLoader(false);
    }
    fetch();
  }, []);
  return (
    <div className="booking-information-container">
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
              <div
                className="first-item"
                onClick={() => {
                  if (
                    parkingLot?.carParkingCapacity -
                      parkingLot?.fourWheelerBookedSlots?.length >
                    0
                  ) {
                    localStorage.setItem(
                      "userSelectedVehicleType",
                      "fourWheeler"
                    );
                    setDisplayTimePicker(true);
                  }
                }}
              >
                <div>
                  <u>Book Car Slot</u>
                </div>
              </div>
              <div
                className="second-item"
                onClick={() => {
                  if (
                    parkingLot?.bikeParkingCapacity -
                      parkingLot?.twoWheelerBookedSlots?.length >
                    0
                  ) {
                    localStorage.setItem(
                      "userSelectedVehicleType",
                      "twoWheeler"
                    );
                    setDisplayTimePicker(true);
                  }
                }}
              >
                <div>
                  <u>Book Bike Slot</u>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`time-select-container ${
          !displayTimePicker ? "hidden" : ""
        }`}
      >
        <div className="time-card">
          <div className="time-selectors">
            <div>
              <label>Start Time</label>
              <TimePicker
                saveButtonText="select "
                placeHolder={"Start Time"}
                onChange={handleStartTimeChange}
                value={selectedStartTime}
              />
            </div>
            <div>
              <label>End Time</label>
              <TimePicker
                saveButtonText="select"
                placeHolder={"End Time"}
                onChange={handleEndTimeChange}
                value={selectedEndTime}
              />
            </div>
          </div>
          <div className="form-error-message">{formError.time}</div>
          <div className="plate-number-container">
            <div className="input-group input-group-sm mb-3 plate-number-input">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                vehicle plate.No
              </span>
              <input
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                value={vehiclePlateNumber}
                onChange={(e) => {
                  setVehiclePlateNumber(e.target.value);
                }}
              />
            </div>
            <div className="form-error-message">{formError.plateNumber}</div>
          </div>
          <div className="button-container">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => loadPaymentPage()}
            >
              Next
            </button>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => {
                setSelectedStartTime("10:00");
                setSelectedEndTime("10:00");
                setDisplayTimePicker(false);
                setFormError({});
              }}
            >
              Cancel
            </button>
          </div>
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
