import React from "react";
import useAxiosprivate from "../../hooks/useAxiosPrivate";
import { useState, useEffect } from "react";
import "../../styles/SlotInformationUpdate.css";
import { computeStaffProfileUpdatePercentage } from "../../utils/utility";
import Loader from "../Common/Loader";
import Modal from "../Modals/Modal";

const SlotInformationUpdate = ({ setProfileCompletedPercentage }) => {
  const [formValues, setFormValues] = useState({
    bikeParkingCapacity: "",
    carParkingCapacity: "",
    bikeParkingCostPerHour: "",
    carParkingCostPerHour: "",
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
        bikeParkingCapacity: parkingLot.bikeParkingCapacity,
        carParkingCapacity: parkingLot.carParkingCapacity,
        bikeParkingCostPerHour: parkingLot.bikeParkingCostPerHour,
        carParkingCostPerHour: parkingLot.carParkingCostPerHour,
      };
      setFormValues({ ...formValues, ...setData });
    };
    fetchParkingLot();
  }, []);

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
      bikeParkingCapacity: parkingLot.bikeParkingCapacity,
      carParkingCapacity: parkingLot.carParkingCapacity,
      bikeParkingCostPerHour: parkingLot.bikeParkingCostPerHour,
      carParkingCostPerHour: parkingLot.carParkingCostPerHour,
    };
    setFormValues({ ...formValues, ...setData });
  };

  const onSubmitForm = (e) => {
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      setLoader(true);
      const payload = {};
      if (formValues.bikeParkingCapacity) {
        payload.bikeParkingCapacity = formValues.bikeParkingCapacity;
      }

      if (formValues.carParkingCapacity) {
        payload.carParkingCapacity = formValues.carParkingCapacity;
      }

      if (formValues.bikeParkingCostPerHour) {
        payload.bikeParkingCostPerHour = formValues.bikeParkingCostPerHour;
      }
      if (formValues.carParkingCostPerHour) {
        payload.carParkingCostPerHour = formValues.carParkingCostPerHour;
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
            message: "Parkinglot data has been updated successfully",
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
    <div className="slot-update-action-container">
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
      <div className="slot-update-topic">
        <h2>Slot Information</h2>
      </div>

      <div className="slot-update-body col-sm-10">
        <h3>Enter Slot Details</h3>
        <form>
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
            <div className="form-error-message">
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
            <div className="form-error-message">
              {formErrors.carParkingCostPerHour}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="BikeParkingCapacity">Bike Parking Capacity</label>
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
            <div className="form-error-message">
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
            <div className="form-error-message">
              {formErrors.carParkingCapacity}
            </div>
          </div>
        </form>
      </div>
      <div className="slot-update-button-holder">
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
          onClick={() => {
            handleReset();
          }}
        >
          Discard
        </button>
      </div>
    </div>
  );
};

export default SlotInformationUpdate;
