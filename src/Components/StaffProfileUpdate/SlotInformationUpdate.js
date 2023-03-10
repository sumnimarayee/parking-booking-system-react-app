import axios from "axios";
import React from "react";
import { useState } from "react";
import "../../styles/SlotInformationUpdate.css";
import { BASE_URL } from "../../utils/Constants";

const SlotInformationUpdate = () => {
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
    <div className="slot-update-action-container">
      <div className="slot-update-topic">
        <h2>Slot Information</h2>
      </div>

      <div className="slot-update-body col-sm-8">
        <h3>Enter Slot Details</h3>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="InputBikeCostPerHour">
              Bike Parking Cost Per Hour
            </label>
            <input
              type="text"
              id="InputBikeCostPerHour"
              className="form-control-lg"
              value={formValues.bikeParkingCostPerHour}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  bikeParkingCostPerHour: e.target.value,
                })
              }
              placeholder="Enter bike parking cost per hour"
            />
            <div className="form-error-message  ">
              {formErrors.bikeParkingCostPerHour}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="InputCarCostPerHour">
              Car Parking Cost Per Hour
            </label>
            <input
              type="text"
              id="InputCarCostPerHour"
              className="form-control-lg"
              value={formValues.carParkingCostPerHour}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  carParkingCostPerHour: e.target.value,
                })
              }
              placeholder="Enter car parking cost per hour"
            />
            <div className="form-error-message  ">
              {formErrors.carParkingCostPerHour}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="BikeParkingCapacity">Car Parking Capacity</label>
            <input
              type="text"
              id="BikeParkingCapacity"
              className="form-control-lg"
              value={formValues.bikeParkingCapacity}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  bikeParkingCapacity: e.target.value,
                })
              }
              placeholder="Enter bike parking capacity"
            />
            <div className="form-error-message  ">
              {formErrors.bikeParkingCapacity}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="CarParkingCapacity">Car Parking Capacity</label>
            <input
              type="text"
              id="CarParkingCapacity"
              className="form-control-lg"
              value={formValues.carParkingCapacity}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  carParkingCapacity: e.target.value,
                })
              }
              placeholder="Enter car parking capacity"
            />
            <div className="form-error-message  ">
              {formErrors.carParkingCapacity}
            </div>
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

export default SlotInformationUpdate;
