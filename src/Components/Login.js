import axios from "../api/axios";
import { BASE_URL } from "../utils/Constants";
import { useState } from "react";
import LoginAndRegisterHeaderbar from "./Common/LoginAndRegisterHeaderbar";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import Modal from "./Modals/Modal";
import useAuth from "../hooks/useAuth";

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
  const { setAuth } = useAuth();
  const initialFormValues = {
    email: "",
    password: "",
  };

  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState({});
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState({});
  const navigate = useNavigate();
  const validateLogin = () => {
    const errors = {};
    if (!formValues.email) {
      errors.email = "Email is required";
    }
    if (!formValues.password) {
      errors.password = "Password is required";
    }
    if (formValues.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formValues.email) ===
      false
    ) {
      errors.email = "Invalid email format";
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
        .post("/login", loginPayload, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((response) => {
          const access_token = response.data.token;
          const role = response.data.role;
          const id = response.data.id;
          setAuth({
            email: formValues.email,
            password: formValues.password,
            accessToken: access_token,
            role,
            id,
          });
          setLoader(false);
          if (role.isBookingUser) {
            navigate("/user-dashboard");
          } else if (role.isStaff) {
            navigate("/staff-dashboard");
          } else if (role.isSuperAdmin) {
            navigate("/superAdmin-dashboard");
          }
        })
        .catch((error) => {
          setLoader(false);
          let errorMessage = "";
          if (!error?.response) {
            errorMessage = "No response from server";
          } else if (error?.response?.status === 400) {
            errorMessage = "Provide Email and Password correctly";
          } else if (error?.response?.status === 401) {
            errorMessage = "Invalid credentials";
          } else {
            errorMessage = "Login failed";
          }
          setModal({
            show: true,
            title: "Error",
            message: errorMessage,
            type: "failure",
          });
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
      <MDBRow>
        <MDBCol sm="6">
          <div className="d-flex flex-row ps-5 pt-5">
            <LoginAndRegisterHeaderbar />
            {/* <MDBIcon fas icon="crow fa-3x me-3" style={{ color: "#709085" }} /> */}
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
              <a className="text-muted" href="#!">
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
