import React from "react";
// import logo from "../../assets/logo.jpeg"
import image from "../../assets/logo.png";
import "../../styles/LoginAndRegisterHeaderbar.css";
const LoginAndRegisterHeaderbar = () => {
  return (
    <div className="logo-holder">
      <img src={image}></img>
      <div className="website-name">Parking Booking System</div>
    </div>
  );
};

export default LoginAndRegisterHeaderbar;
