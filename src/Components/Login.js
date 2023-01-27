import React from "react";
import axios from "axios";
import { useState } from "react";

const Login = () => {
  const initialFormValues = {
    email: "",
    password: "",
  };

  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState({});

  const validateLogin = () => {
    const errors = {};
    if (!formValues.email) {
      errors.email = "email is required";
    }
    if (!formValues.password) {
      errors.password = "password is required";
    }
    return errors;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const err = validateLogin();
    setFormErrors(err);
    if (Object.keys(err).length === 0) {
      // call backend login api here.
      const loginPayload = {
        email: formValues.email,
        password: formValues.password,
      };

      axios
        .post("http://localhost:3002/user/login", loginPayload)
        .then((response) => {
          localStorage.setItem("access_token", response.data.token);
          localStorage.setItem("refresh_token", response.data.refreshToken);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="Inputemail">email</label>
          <input
            type="text"
            className="form-control"
            id="Inputname"
            value={formValues.email}
            onChange={(e) =>
              setFormValues({ ...formValues, email: e.target.value })
            }
            placeholder="Enter email"
          />
          <div>{formErrors.email}</div>
        </div>
        <div className="form-group">
          <label htmlFor="Inputpassword">password</label>
          <input
            type="text"
            className="form-control"
            id="Inputpassword"
            value={formValues.password}
            onChange={(e) =>
              setFormValues({ ...formValues, password: e.target.value })
            }
            placeholder="Enter password"
          />
          <div>{formErrors.password}</div>
        </div>
        <button type="submit" className="btn btn-primary my-3">
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
