import React, { useState } from "react";
import "../../styles/InitialUpdate.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import SlotIcon from "@mui/icons-material/Place";
import ParkingLotIcon from "@mui/icons-material/Business";
import ImageIcon from "@mui/icons-material/Image";
import PasswordIcon from "@mui/icons-material/Key";
import ArrowIcon from "@mui/icons-material/ArrowForwardIos";
import { width } from "@mui/system";
import SlotInformationUpdate from "./SlotInformationUpdate";
import ParkingLotInformationUpdate from "./ParkingLotInformationUpdate";
import PhotoUpdate from "./PhotoUpdate";

// TODO: iMPLEMENT the context api to store the staff id and fetch id from there

const InitialUpdate = () => {
  const [completedPercentage, setCompletedPercentage] = useState(70);
  return (
    <div className="initial-parking-lot-update-container">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-5 left-container">
            <h2>Update Information</h2>

            {/* card */}
            <div className=" progress-card row">
              <div
                className="progress-circle-container col-md-5"
                style={{
                  width: 200,
                  height: 200,
                  display: "inline-block",
                  marginTop: "10px",
                }}
              >
                <CircularProgressbar
                  value={completedPercentage}
                  text={completedPercentage + "%"}
                  styles={buildStyles({
                    // Text size
                    textSize: "20px",
                    // How long animation takes to go from one percentage to another, in seconds
                    pathTransitionDuration: 0.2,
                    // Colors
                    pathColor: "white",
                    textColor: "white",
                    //   trailColor: "red",
                    //   backgroundColor: "#3e98c7",
                  })}
                />
              </div>
              <div className="progress-information col-md-8">
                <div className="progress-heading">ParkingLot Information</div>
                <div className="progress-body">
                  Please provide information for all sections in order to
                  complete the parking lot registration. Every section is to
                  provided with data during initial update.
                </div>
              </div>

              <div className="row">
                <button
                  type="button"
                  className="btn btn-light"
                  style={{
                    fontSize: "25px",
                    borderRadius: "40px",
                    height: "60px",
                    marginLeft: "12px",
                  }}
                >
                  Primary
                </button>
              </div>
            </div>

            {/* list of clickable value */}
            <div className="action-item-holder">
              <ul>
                <li>
                  <div className="item row">
                    <div className="col-sm-2">
                      <SlotIcon fontSize="large" color="primary" />
                    </div>
                    <div className="col-sm-8">
                      <div className="action-item-heading">
                        Slot Information
                      </div>
                      <div className="action-item-description">
                        Number of slots and price per hour
                      </div>
                    </div>
                    <div className="col-sm-2">
                      <ArrowIcon fontSize="large" />
                    </div>
                  </div>
                </li>
                <li>
                  <div className="item row">
                    <div className="col-sm-2">
                      <ParkingLotIcon fontSize="large" color="primary" />
                    </div>
                    <div className="col-sm-8">
                      <div className="action-item-heading">
                        Parkinglot Information
                      </div>
                      <div className="action-item-description">
                        Name, Location and opening hours
                      </div>
                    </div>
                    <div className="col-sm-2">
                      <ArrowIcon fontSize="large" />
                    </div>
                  </div>
                </li>
                <li>
                  <div className="item row">
                    <div className="col-sm-2">
                      <ImageIcon fontSize="large" color="primary" />
                    </div>
                    <div className="col-sm-8">
                      <div className="action-item-heading">Images</div>
                      <div className="action-item-description">
                        Parkinglot images
                      </div>
                    </div>
                    <div className="col-sm-2">
                      <ArrowIcon fontSize="large" />
                    </div>
                  </div>
                </li>
                <li>
                  <div className="item row">
                    <div className="col-sm-2">
                      <PasswordIcon fontSize="large" color="primary" />
                    </div>
                    <div className="col-sm-8">
                      <div className="action-item-heading">Security</div>
                      <div className="action-item-description">
                        New password
                      </div>
                    </div>
                    <div className="col-sm-2">
                      <ArrowIcon fontSize="large" />
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            {/* TODO add note at last for first update stating must provide all values */}
          </div>
          <div className="col-md-7 right-container">
            {/* <SlotInformationUpdate></SlotInformationUpdate> */}
            {/* <ParkingLotInformationUpdate></ParkingLotInformationUpdate> */}
            <PhotoUpdate></PhotoUpdate>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitialUpdate;
