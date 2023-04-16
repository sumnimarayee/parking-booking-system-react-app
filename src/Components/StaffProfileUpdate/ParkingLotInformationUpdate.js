import React from "react";
import { useState, useEffect } from "react";
import useAxiosprivate from "../../hooks/useAxiosPrivate";
import "../../styles/ParkingLotInformationUpdate.css";
import Loader from "../Common/Loader";
import Modal from "../Modals/Modal";
import { computeStaffProfileUpdatePercentage } from "../../utils/utility";

const ParkingLotInformationUpdate = ({ setProfileCompletedPercentage }) => {
  const [formValues, setFormValues] = useState({
    parkingLotName: "",
    parkingLotLocation: "",
    openingTime: "",
    closingTime: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState({});

  const axios = useAxiosprivate();

  useEffect(() => {
    setLoader(true);
    const fetchParkingLot = async () => {
      const response = await axios.get(
        `parking-lot/${localStorage.getItem("parkingLotId")}`
      );
      setLoader(false);
      const parkingLot = response.data.data;
      const setData = {
        parkingLotName: parkingLot.name,
        parkingLotLocation: parkingLot.location,
        openingTime: parkingLot.openingTime,
        closingTime: parkingLot.closingTime,
      };
      setFormValues({ ...formValues, ...setData });
    };
    fetchParkingLot();
  }, []);

  const validate = () => {
    const errors = {};

    const validTimeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

    if (formValues.parkingLotName) {
      if (formValues.parkingLotName.length > 40) {
        errors.parkingLotName = "please provide name less than 40 characters";
      }
    }
    if (formValues.parkingLotLocation) {
      if (formValues.parkingLotLocation.length > 40) {
        errors.carParkingCapacity =
          "please provide location less than 40 characters";
      }
    }
    if (formValues.openingTime) {
      //check must be between 0 and 23
      if (validTimeRegex.test(formValues.openingTime) === false) {
        errors.openingTime = "please provide time from 00:00 to 23:59 only";
      }
    }
    if (formValues.closingTime) {
      //check must be between 0 and 23
      if (validTimeRegex.test(formValues.closingTime) === false) {
        errors.closingTime = "please provide time from 00:00 to 23:59 only";
      }
    }
    if (!errors.closingTime && !errors.openingTime)
      if (formValues.openingTime && formValues.closingTime) {
        //check opening time must be less than closing time
        const openingTime = formValues.openingTime;
        const closingTime = formValues.closingTime;

        const openingTimeParts = openingTime.split(":");
        const closingTimeParts = closingTime.split(":");
        const openingHours = parseInt(openingTimeParts[0]);
        const openingMinutes = parseInt(openingTimeParts[1]);
        const closingHours = parseInt(closingTimeParts[0]);
        const closingMinutes = parseInt(closingTimeParts[1]);

        if (openingHours < closingHours) {
        } else if (
          openingHours === closingHours &&
          openingMinutes < closingMinutes
        ) {
        } else {
          errors.openingTime = "opening time must be less than closing time";
          errors.closingTime = "closing time must be more than opening time";
        }
      }
    setFormErrors({ ...errors });
    return errors;
  };

  const handleReset = async () => {
    setLoader(true);
    const response = await axios.get(
      `parking-lot/${localStorage.getItem("parkingLotId")}`
    );
    setLoader(false);
    const parkingLot = response.data.data;
    const setData = {
      parkingLotName: parkingLot.name,
      parkingLotLocation: parkingLot.location,
      openingTime: parkingLot.openingTime,
      closingTime: parkingLot.closingTime,
    };
    setFormValues({ ...formValues, ...setData });
  };

  const onSubmitForm = (e) => {
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      setLoader(true);
      const payload = {};
      if (formValues.parkingLotName) {
        payload.name = formValues.parkingLotName;
      }

      if (formValues.parkingLotLocation) {
        payload.location = formValues.parkingLotLocation;
      }

      if (formValues.openingTime) {
        payload.openingTime = formValues.openingTime;
      }
      if (formValues.closingTime) {
        payload.closingTime = formValues.closingTime;
      }
      // API call to update the parking lot
      axios
        .patch(`/parking-lot/${localStorage.getItem("parkingLotId")}`, payload)
        .then((res) => {
          setLoader(false);
          const percent = computeStaffProfileUpdatePercentage(
            res.data.data.updatedItems
          );
          localStorage.setItem("profileCompletedPercentage", percent);
          setProfileCompletedPercentage(percent);
          setModal({
            show: true,
            title: "Profile Updated",
            message: "Parkinglot has been updated successfully",
            type: "success",
            hideAfterSeconds: 3,
          });
        })
        .catch((error) => {
          setLoader(false);
          //modal
        });
    }
  };
  return (
    <div className="parking-update-action-container">
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
      <div className="parking-update-topic">
        <h2>Parking Information</h2>
      </div>

      <div className="parking-update-body col-sm-10">
        <h3>Enter Parking Details</h3>
        <form>
          <div className="form-group">
            <label htmlFor="Name">Parking Lot Name</label>
            <input
              type="text"
              id="Name"
              className="form-control-lg"
              value={formValues.parkingLotName}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  parkingLotName: e.target.value,
                })
              }
              style={{ outline: "1px solid #ced4da", borderRadius: "5px" }}
              placeholder="Enter parking lot name"
            />
            <div className="form-error-message  ">
              {formErrors.parkingLotName}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="Location">Parking Lot Location</label>
            <input
              type="text"
              id="Location"
              className="form-control-lg"
              value={formValues.parkingLotLocation}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  parkingLotLocation: e.target.value,
                })
              }
              style={{ outline: "1px solid #ced4da", borderRadius: "5px" }}
              placeholder="Enter parking lot location"
            />
            <div className="form-error-message  ">
              {formErrors.parkingLotLocation}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="OpeningTime">ParkingLot Opening Time</label>
            <input
              type="text"
              id="OpeningTime"
              className="form-control-lg"
              value={formValues.openingTime}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  openingTime: e.target.value,
                })
              }
              style={{ outline: "1px solid #ced4da", borderRadius: "5px" }}
              placeholder="Enter parking lot opening time"
            />
            <div className="form-error-message  ">{formErrors.openingTime}</div>
          </div>
          <div className="form-group">
            <label htmlFor="ClosingTime">ParkingLot Closing Time</label>
            <input
              type="text"
              id="ClosingTime"
              className="form-control-lg"
              value={formValues.closingTime}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  closingTime: e.target.value,
                })
              }
              style={{ outline: "1px solid #ced4da", borderRadius: "5px" }}
              placeholder="Enter parking lot closing time"
            />
            <div className="form-error-message  ">{formErrors.closingTime}</div>
          </div>
        </form>
      </div>
      <div className="staff-update-button-holder">
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={() => {
            onSubmitForm();
          }}
        >
          Update
        </button>
        <button
          type="button"
          className="btn btn-danger btn-lg"
          onClick={() => handleReset()}
        >
          Discard
        </button>
      </div>
    </div>
  );
};

export default ParkingLotInformationUpdate;
