import React from "react";
import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/Constants";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modals/Modal";
import "../styles/Register.css";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  // MDBInput,
  // MDBRadio,
  // MDBSelect,
} from "mdb-react-ui-kit";
import Loader from "./Common/Loader";

function Register() {
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
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState({});
  const navigate = useNavigate();

  const validateRegistration = () => {
    const errors = {};
    if (!formValues.name) {
      errors.name = "name is required";
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
      setLoader(true);
      const registerPayload = {
        name: formValues.name,
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
          setLoader(false);
          setModal({
            show: true,
            title: "User Registered Successfully",
            Message: "",
            type: "success",
          });
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        })
        .catch((err) => {
          console.log(err);
          setLoader(false);
        });
    }
  };

  return (
    <MDBContainer fluid>
      {loader ? <Loader /> : ""}
      {modal.show ? (
        <Modal
          modal={setModal}
          title={modal.title}
          message={modal.message}
          type={modal.type}
        />
      ) : (
        ""
      )}
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol>
          <MDBCard className="my-4">
            <MDBRow className="g-0">
              <MDBCol md="6">
                <MDBCardBody className="text-black d-flex flex-column justify-content-center">
                  <h3 className="mb-5 text-uppercase fw-bold">
                    Registration form
                  </h3>

                  <form onSubmit={onSubmit}>
                    <div className="form-group">
                      <label htmlFor="Inputname">Name</label>
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
                      <div className="form-error-message  ">
                        {formErrors.name}
                      </div>
                    </div>
                    <div className="form-group my-3">
                      <label htmlFor="InputEmail">Email address</label>
                      <input
                        type="text"
                        className="form-control"
                        id="InputEmail"
                        value={formValues.email}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            email: e.target.value,
                          })
                        }
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                      />
                      <div className="form-error-message  ">
                        {formErrors.email}
                      </div>
                    </div>
                    <div className="form-group my-3">
                      <label htmlFor="InputPassword">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="InputPassword"
                        value={formValues.password}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            password: e.target.value,
                          })
                        }
                        placeholder=" Enter Password"
                      />
                      <div className="form-error-message  ">
                        {formErrors.password}
                      </div>
                    </div>
                    <div className="form-group my-3">
                      <label htmlFor="InputcontactNo">ContactNo</label>
                      <input
                        type="text"
                        className="form-control"
                        id="InputcontactNo"
                        value={formValues.contactNo}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            contactNo: e.target.value,
                          })
                        }
                        placeholder="Enter number"
                      />
                      <div className="form-error-message  ">
                        {formErrors.contactNo}
                      </div>
                    </div>
                    <div className="form-group my-3">
                      <label htmlFor="Inputgender">Gender</label>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio1"
                          value="Female"
                          checked={formValues.gender === "Female"}
                          onChange={(e) => {
                            setFormValues({
                              ...formValues,
                              gender: e.target.value,
                            });
                          }}
                        />
                        <label className="form-check-label" for="inlineRadio1">
                          Female
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio2"
                          value="Male"
                          checked={formValues.gender === "Male"}
                          onChange={(e) => {
                            setFormValues({
                              ...formValues,
                              gender: e.target.value,
                            });
                          }}
                        />
                        <label className="form-check-label" for="inlineRadio2">
                          Male
                        </label>
                      </div>
                      <div className="form-error-message  ">
                        {formErrors.gender}
                      </div>
                    </div>
                    <div>
                      <select
                        className="form-select"
                        aria-label="Select Vehicle Type"
                        value={formValues.vehicleType}
                        onChange={(e) => {
                          setFormValues({
                            ...formValues,
                            vehicleType: e.target.value,
                          });
                        }}
                      >
                        <option value="" disabled>
                          select vehicle-Type
                        </option>
                        <option value="2 Wheeler">2 Wheeler</option>
                        <option value="4 Wheeler">4 Wheeler</option>
                        <option value="Both">Both</option>
                      </select>
                      <div className="form-error-message  ">
                        {formErrors.vehicleType}
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary my-3 col-3 me-2"
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger my-3 col-3"
                      onClick={() => {
                        setFormValues(initialFormValues);
                        setFormErrors({});
                      }}
                    >
                      Reset
                    </button>
                  </form>
                  <p className="ms-5">
                    Already have an account? <Link to="/login">Login</Link>
                  </p>
                </MDBCardBody>
              </MDBCol>
              <MDBCol md="6" className="d-none d-md-block">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                  alt="Sample photo"
                  className="rounded-start"
                  fluid
                />
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Register;
