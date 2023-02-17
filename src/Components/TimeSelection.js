import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TimePicker from "react-time-picker";
import { BASE_URL } from "../utils/Constants";

const TimeSelection = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [parkingLot, setParkingLot] = useState({});
  const { state } = useLocation();
  const { parkingLotId, vehicleType } = state;
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [vehiclePlateNo, setVehiclePlateNo] = useState("");

  useEffect(() => {
    async function fetch() {
      const data = await axios.get(`${BASE_URL}/parking-lot/${parkingLotId}`);
      setParkingLot(data.data.data);
    }
    fetch();
  }, []);

  const addTime = (fullTime, minutes) => {
    const addedTime = (Number(fullTime) + Number("0." + minutes))
      .toFixed(2)
      .toString();
    const addedTimeArray = addedTime.toString().split(".");
    if (addedTimeArray[1] > 59) {
      addedTimeArray[0] = Number(addedTimeArray[0]) + 1;
      addedTimeArray[1] = Number(addedTimeArray[1]) - 60;
    }
    return addedTimeArray.join(".");
  };

  //create a validation function to validate 3 things
  const validateTimeSelection = () => {
    const errors = {};
    if (!startTime) {
      errors.startTime = "Start time is required";
    }
    if (!endTime) {
      errors.endTime = "End time is required";
    }
    const startingTime = startTime.split(":").join(".");
    const endingTime = endTime.split(":").join(".");
    const thirtyMinutesAddedToStartTime = addTime(startingTime, 30);
    console.log(thirtyMinutesAddedToStartTime + " " + endingTime);
    if (startingTime >= endingTime) {
      errors.comparisionTime = "Start time must less than end time";
    } else if (Number(endingTime) < Number(thirtyMinutesAddedToStartTime)) {
      errors.comparisionTime =
        "Please choose parking time of at least 30 minute";
    }

    setErrors(errors);
    console.log(Object.keys(errors));
    if (Object.keys(errors).length === 0) {
      navigate("/parking-payment", {
        state: {
          startTime,
          endTime,
          parkingLotId: parkingLot._id,
          vehicleType,
          vehiclePlateNo,
        },
      });
    }
  };

  //11:05 11:10
  //1) both start and end time must be have value 2) starting time must be before end time 3) min 30 minutes difference between start and end time

  return (
    <div>
      <TimePicker
        onChange={setStartTime}
        value={startTime}
        hourPlaceholder="hh"
        minutePlaceholder="mm"
        // maxTime="21:10"
        // minTime="8:30"
        required
      />
      <TimePicker
        onChange={setEndTime}
        value={endTime}
        hourPlaceholder="hh"
        minutePlaceholder="mm"
        // maxTime="21:10"
        // minTime="8:30"
        required
      />
      <label htmlFor="InputvehiclePlateNo">vehiclePlateNo</label>
      <input
        type="text"
        value={vehiclePlateNo}
        onchange={(e) => setVehiclePlateNo(e.target.value)}
      />
      {/* add a continue button which when clicked performs a validation and after validation is success call esewa payment page. */}
      <button onClick={() => validateTimeSelection()}>continue</button>
    </div>
  );
};

export default TimeSelection;
