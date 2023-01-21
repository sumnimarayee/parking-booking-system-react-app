import React from "react";
import Select from "react-select";
import { useState } from "react";

const BasicForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNO, setContactNO] = useState("");
  const [gender, setGender] = useState("");
  const [selects, setSelects] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    //call backend login api here.
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputUsername1">Username</label>
          <input
            type="username"
            className="form-control"
            id="exampleInputUsername1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
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
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="exampleInputcontactNo1">ContactNo</label>
          <input
            type="contactNO"
            className="form-control"
            id="exampleInputcontactNo1"
            value={contactNO}
            onChange={(e) => setContactNO(e.target.value)}
            placeholder="Enter number"
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="exampleInputgender1">Gender</label>
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
            value={selects}
            onChange={(e) => {
              setSelects(e.target.value);
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
