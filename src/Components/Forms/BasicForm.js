import React from "react";
import axios from "axios";
import { useState } from "react";

const BasicForm = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [gender, setGender] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [contactNoErrorMessage, setContactNoErrorMessage] = useState("");
  const [genderErrorMessage, setGenderErrorMessage] = useState("");
  const [vehicleTypeErrorMessage, setVehicleTypeErrorMessage] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    //call backend register api here.
    if (
      name === "" ||
      username === "" ||
      email === "" ||
      password === "" ||
      gender === "" ||
      contactNo === "" ||
      vehicleType === ""
    ) {
      if (name === "") {
        setNameErrorMessage("name cannot be empty");
      }
      if (username === "") {
        setUsernameErrorMessage("username cannot be empty");
      }
      if (email === "") {
        setEmailErrorMessage("email cannot be empty");
      }
      if (passwordErrorMessage === "") {
        setPasswordErrorMessage("password cannot be empty");
      }
      if (contactNo === "") {
        setContactNoErrorMessage("contactNo cannot be empty");
      }
      if (genderErrorMessage === "") {
        setGenderErrorMessage("gender cannot be empty");
      }
      if (vehicleTypeErrorMessage === "") {
        setVehicleTypeErrorMessage("vehicalType cannot be empty");
      }
    } else {
      const registerPayload = {
        name,
        username,
        password,
        role: "user",
        contactNo,
        gender,
        vehicleType,
      };

      axios
        .post("http://localhost:3001/user/register", registerPayload)
        .then((res) => {
          console.log(res);
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={
              nameErrorMessage === "" ? "Enter name" : nameErrorMessage
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="InputUsername">Username</label>
          <input
            type="text"
            className="form-control"
            id="InputUsername"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={
              usernameErrorMessage === ""
                ? "Enter username"
                : usernameErrorMessage
            }
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="InputEmail">Email address</label>
          <input
            type="text"
            className="form-control"
            id="InputEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-describedby="emailHelp"
            placeholder={
              emailErrorMessage === "" ? "Enter email" : emailErrorMessage
            }
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group my-3">
          <label htmlFor="InputPassword">Password</label>
          <input
            type="password"
            className="form-control"
            id="InputPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={
              passwordErrorMessage === ""
                ? " Enter Password"
                : passwordErrorMessage
            }
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="InputcontactNo">ContactNo</label>
          <input
            type="text"
            className="form-control"
            id="InputcontactNo"
            value={contactNo}
            onChange={(e) => setContactNo(e.target.value)}
            placeholder={
              contactNoErrorMessage === ""
                ? "Enter number"
                : contactNoErrorMessage
            }
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="Inputgender">Gender</label>
          <input
            type="radio"
            value="FEMALE"
            name="gender"
            onChange={(e) => setGender(e.target.value)}
          />
          female
          <input
            type="radio"
            value="MALE"
            name="gender"
            onChange={(e) => {
              setGender(e.target.value);
              setGenderErrorMessage("");
            }}
          />
          male
          {genderErrorMessage}
        </div>
        <div>
          <select
            name="vehicle-Type"
            style={{ width: "200px" }}
            value={vehicleType}
            onChange={(e) => {
              setVehicleType(e.target.value);
              setVehicleTypeErrorMessage("");
            }}
          >
            <option value="" disabled>
              select vehicle-Type
            </option>
            <option value="2 Wheelers">2 Wheelers</option>
            <option value="4 Wheelers">4 Wheelers</option>
            <option value="Both">Both</option>
          </select>
          {vehicleTypeErrorMessage}
        </div>
        <button type="submit" className="btn btn-primary my-3">
          Submit
        </button>
      </form>
    </>
  );
};

export default BasicForm;
