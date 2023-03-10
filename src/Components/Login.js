import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import { useState } from "react";
import LoginAndRegisterHeaderbar from "./Common/LoginAndRegisterHeaderbar";
import { Link } from "react-router-dom";
import "../styles/Login.css";

import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import img from "../assets/login-background-1.jpg";
import Loader from "./Common/Loader";

function Login() {
  const initialFormValues = {
    email: "",
    password: "",
  };

  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState({});
  const [loader, setLoader] = useState(false);

  const validateLogin = () => {
    const errors = {};
    if (!formValues.email) {
      errors.email = "Email is required";
    }
    if (!formValues.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const err = validateLogin();
    setFormErrors(err);
    if (Object.keys(err).length === 0) {
      setLoader(true);
      // call backend login api here.
      const loginPayload = {
        email: formValues.email,
        password: formValues.password,
      };

      axios
        .post(BASE_URL + "/login", loginPayload)
        .then((response) => {
          localStorage.setItem("access_token", response.data.token);
          localStorage.setItem("refresh_token", response.data.refreshToken);
          if (response.isBookingUser) {
            localStorage.setItem("role", "user");
            //redirect
          }
          if (response.isStaff) {
            localStorage.setItem("role", "staff");
          }
          if (response.isSuperAdmin) {
            localStorage.setItem("role", "admin");
          }
          setLoader(false);
          // redirect to the appropriate landing page
        })
        .catch((error) => {
          console.log(error);
          setLoader(false);
        });
    }
  };
  return (
    <MDBContainer fluid>
      {loader ? <Loader /> : ""}
      <MDBRow>
        <MDBCol sm="6">
          <div className="d-flex flex-row ps-5 pt-5">
            <LoginAndRegisterHeaderbar />
            <MDBIcon fas icon="crow fa-3x me-3" style={{ color: "#709085" }} />
            {/* <span className="h1 fw-bold mb-0">Logo</span> */}
          </div>

          <div className="d-flex flex-column justify-content-center h-custom-2 w-75 pt-4">
            <h3
              className="fw-normal mb-3 ps-5 pb-3"
              style={{ letterSpacing: "1px", color: "blue" }}
            >
              Login
            </h3>
            <MDBInput
              wrapperClass="mx-5 w-100"
              // label="Email address"
              id="formControlLg"
              placeholder="Enter your email address"
              type="email"
              size="lg"
              value={formValues.email}
              onChange={(e) =>
                setFormValues({ ...formValues, email: e.target.value })
              }
            />
            <div className="form-error-message mx-5">{formErrors.email}</div>

            <MDBInput
              wrapperClass="mx-5 w-100 mt-3"
              // label="Password"
              placeholder="Enter your password"
              id="formControlLg"
              type="password"
              size="lg"
              value={formValues.password}
              onChange={(e) =>
                setFormValues({ ...formValues, password: e.target.value })
              }
            />
            <div className="form-error-message mx-5">{formErrors.password}</div>

            <button
              className="btn btn-primary my-3 col-3 me-2 ms-5"
              onClick={(e) => onSubmit(e)}
            >
              Submit
            </button>
            <p className="small mb-5 pb-lg-3 ms-5">
              <a class="text-muted" href="#!">
                Forgot password?
              </a>
            </p>
            <p className="ms-5">
              Don't have an account? <Link to="/register">Register here</Link>
            </p>
          </div>
        </MDBCol>

        <MDBCol sm="6" className="d-none d-sm-block px-0">
          <img
            // src="../assets/login-background.jpg"
            src={img}
            // src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
            alt="Login image"
            className="w-100"
            style={{
              objectFit: "cover",
              objectPosition: "left",
              minHeight: "100%",
              opacity: "0.8",
            }}
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
