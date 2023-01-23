import React from "react";
import axios from "axios";
import { useState } from "react";

const BasicForm = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNO, setContactNO] = useState("");
  const [gender, setGender] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    //call backend register api here.
    const registerPayload = {
      name,
      username,
      password,
      role: "user",
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
            placeholder="Enter name"
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
            placeholder="Enter username"
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
            placeholder="Enter email"
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
            placeholder="Password"
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="InputcontactNo">ContactNo</label>
          <input
            type="contactNO"
            className="form-control"
            id="InputcontactNo"
            value={contactNO}
            onChange={(e) => setContactNO(e.target.value)}
            placeholder="Enter number"
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
            onChange={(e) => setGender(e.target.value)}
          />
          male
        </div>
        <div>
          <select
            name="vehicle-Type"
            style={{ width: "200px" }}
            value={vehicleType}
            onChange={(e) => {
              setVehicleType(e.target.value);
            }}
          >
            <option value="" disabled>
              select vehicle-Type
            </option>
            <option value="2 Wheelers">2 Wheelers</option>
            <option value="4 Wheelers">4 Wheelers</option>
            <option value="Both">Both</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary my-3">
          Submit
        </button>
      </form>
    </>
  );
};

export default BasicForm;
