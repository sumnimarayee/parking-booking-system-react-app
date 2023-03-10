import axios from "axios";
import React from "react";
import { useState } from "react";
import "../../styles/ParkingLotInformationUpdate.css";
import { BASE_URL } from "../../utils/Constants";

const ParkingLotInformationUpdate = () => {
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const validate = () => {
    const errors = {};

    const onlyNumberRegex = /^[0-9]*$/;

    if (formValues.bikeParkingCapacity) {
      //check must be number only
      if (onlyNumberRegex.test(formValues.bikeParkingCapacity) === false) {
        errors.bikeParkingCapacity = "please provide number only";
      }
    }
    if (formValues.carParkingCapacity) {
      //check must be number only
      if (onlyNumberRegex.test(formValues.carParkingCapacity) === false) {
        errors.carParkingCapacity = "please provide number only";
      }
    }
    if (formValues.bikeParkingCostPerHour) {
      //check must be number only
      if (onlyNumberRegex.test(formValues.bikeParkingCostPerHour) === false) {
        errors.bikeParkingCostPerHour = "please provide number only";
      }
    }
    if (formValues.carParkingCostPerHour) {
      //check must be number only
      if (onlyNumberRegex.test(formValues.carParkingCostPerHour) === false) {
        errors.carParkingCostPerHour = "please provide number only";
      }
    }

    setFormErrors(errors);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    validate();
    if (Object.keys(formErrors) === 0) {
      // API call to update the parking lot
      axios.patch(BASE_URL + `/parking-lot/`);
    }
  };
  return (
    <div className="parking-update-action-container">
      <div className="parking-update-topic">
        <h2>Parking Information</h2>
      </div>

      <div className="parking-update-body col-sm-8">
        <h3>Enter Parking Details</h3>
        <form onSubmit={onSubmit}>
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
              placeholder="Enter parking lot opening time"
            />
            <div className="form-error-message  ">{formErrors.openingTime}</div>
          </div>
          <div className="form-group">
            <label htmlFor="ClosingTime">ParkingLot Opening Time</label>
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
              placeholder="Enter parking lot closing time"
            />
            <div className="form-error-message  ">{formErrors.closingTime}</div>
          </div>
        </form>
      </div>
      <div className="staff-update-button-holder col-sm-4">
        <button
          type="button"
          class="btn btn-primary btn-lg"
          style={{ float: "right" }}
        >
          Update
        </button>
        <button
          type="button"
          class="btn btn-danger btn-lg"
          style={{ float: "left" }}
        >
          Discard
        </button>
      </div>
    </div>
  );
};

export default ParkingLotInformationUpdate;
