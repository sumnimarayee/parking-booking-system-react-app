import React from "react";
import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/Constants";

const Register = () => {
  const initialFormValues = {
    name: "",
    username: "",
    email: "",
    password: "",
    contactNo: "",
    gender: "",
    vehicleType: "",
  };

  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState({});

  const validateRegistration = () => {
    const errors = {};
    if (!formValues.name) {
      errors.name = "name is required";
    }
    if (!formValues.username) {
      errors.username = "username is required";
    }
    if (!formValues.email) {
      errors.email = "email is required";
    }
    if (!formValues.password) {
      errors.password = "password is required";
    }
    if (formValues.password.length < 6) {
      errors.password = "password must be at least 6 characters";
    }
    if (!formValues.contactNo) {
      errors.contactNo = "contactNo is required";
    }
    if (!formValues.gender) {
      errors.gender = "gender is required";
    }
    if (!formValues.vehicleType) {
      errors.vehicleType = "vehicle type is required";
    }
    return errors;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const err = validateRegistration();
    setFormErrors(err);
    if (Object.keys(err).length === 0) {
      const registerPayload = {
        name: formValues.name,
        username: formValues.username,
        password: formValues.password,
        email: formValues.email,
        role: "user",
        contactNo: formValues.contactNo,
        gender: formValues.gender,
        vehicleType: formValues.vehicleType,
      };

      axios
        .post(BASE_URL + "/register-user", registerPayload)
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="Inputname">name</label>
          <input
            type="text"
            className="form-control"
            id="Inputname"
            value={formValues.name}
            onChange={(e) =>
              setFormValues({ ...formValues, name: e.target.value })
            }
            placeholder="Enter name"
          />
          <div>{formErrors.name}</div>
        </div>
        <div className="form-group">
          <label htmlFor="InputUsername">Username</label>
          <input
            type="text"
            className="form-control"
            id="InputUsername"
            value={formValues.username}
            onChange={(e) =>
              setFormValues({ ...formValues, username: e.target.value })
            }
            placeholder="Enter username"
          />
          <div>{formErrors.username}</div>
        </div>
        <div className="form-group my-3">
          <label htmlFor="InputEmail">Email address</label>
          <input
            type="text"
            className="form-control"
            id="InputEmail"
            value={formValues.email}
            onChange={(e) =>
              setFormValues({ ...formValues, email: e.target.value })
            }
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <div>{formErrors.email}</div>
        </div>
        <div className="form-group my-3">
          <label htmlFor="InputPassword">Password</label>
          <input
            type="password"
            className="form-control"
            id="InputPassword"
            value={formValues.password}
            onChange={(e) =>
              setFormValues({ ...formValues, password: e.target.value })
            }
            placeholder=" Enter Password"
          />
          <div>{formErrors.password}</div>
        </div>
        <div className="form-group my-3">
          <label htmlFor="InputcontactNo">ContactNo</label>
          <input
            type="text"
            className="form-control"
            id="InputcontactNo"
            value={formValues.contactNo}
            onChange={(e) =>
              setFormValues({ ...formValues, contactNo: e.target.value })
            }
            placeholder="Enter number"
          />
          <div>{formErrors.contactNo}</div>
        </div>
        <div className="form-group my-3">
          <label htmlFor="Inputgender">Gender</label>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              value="Female"
              onChange={(e) => {
                setFormValues({ ...formValues, gender: e.target.value });
              }}
            />
            <label class="form-check-label" for="inlineRadio1">
              Female
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              value="Male"
              onChange={(e) => {
                setFormValues({ ...formValues, gender: e.target.value });
              }}
            />
            <label class="form-check-label" for="inlineRadio2">
              Male
            </label>
          </div>
          <div>{formErrors.gender}</div>
        </div>
        <div>
          <select
            class="form-select"
            aria-label="Select Vehicle Type"
            value={formValues.vehicleType}
            onChange={(e) => {
              setFormValues({ ...formValues, vehicleType: e.target.value });
            }}
          >
            <option value="" disabled>
              select vehicle-Type
            </option>
            <option value="2 Wheeler">2 Wheeler</option>
            <option value="4 Wheeler">4 Wheeler</option>
            <option value="Both">Both</option>
          </select>
          <div>{formErrors.vehicleType}</div>
        </div>
        <button type="submit" className="btn btn-primary my-3">
          Submit
        </button>
      </form>
    </>
  );
};

export default Register;
