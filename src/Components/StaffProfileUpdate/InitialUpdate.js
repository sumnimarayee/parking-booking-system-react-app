import React, { useState, useEffect } from "react";
import "../../styles/InitialUpdate.css";
import "react-circular-progressbar/dist/styles.css";
import SlotIcon from "@mui/icons-material/Place";
import ParkingLotIcon from "@mui/icons-material/Business";
import ImageIcon from "@mui/icons-material/Image";
import PasswordIcon from "@mui/icons-material/Key";
import ArrowIcon from "@mui/icons-material/ArrowForwardIos";
import SlotInformationUpdate from "./SlotInformationUpdate";
import ParkingLotInformationUpdate from "./ParkingLotInformationUpdate";
import PhotoUpdate from "./PhotoUpdate";
import PasswordUpdate from "./PasswordUpdate";
import CircularProgressBar from "../Common/CircularProgressBar";

// TODO: iMPLEMENT the context api to store the staff id and fetch id from there

const InitialUpdate = () => {
  const [displaySelectedComponent, setDisplaySelectedComponent] = useState(1);
  const [profileCompletedPercentage, setProfileCompletedPercentage] =
    useState(0);

  useEffect(() => {
    if (localStorage.getItem("profileCompletedPercentage") !== null) {
      setProfileCompletedPercentage(
        Number(localStorage.getItem("profileCompletedPercentage"))
      );
    }
  }, []);
  return (
    <div className="initial-parking-lot-update-container">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-5 left-container">
            <h2>Update Information</h2>

            {/* card */}
            <div className=" progress-card">
              <div className="progress-card-top">
                <div
                  className=""
                  style={{
                    width: 100,
                    height: 100,
                    // display: "inline-block",
                    marginTop: "10px",
                    flexShrink: "1",
                  }}
                >
                  <CircularProgressBar
                    completedPercentage={profileCompletedPercentage}
                  />
                </div>
                <div className="progress-information">
                  <div className="progress-heading">ParkingLot Information</div>
                  <div className="progress-body">
                    Please provide information for all sections in order to
                    complete the parking lot registration.
                  </div>
                </div>
              </div>

              <div className="progress-card-bottom">
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
                  <div
                    className={`item row ${
                      displaySelectedComponent === 1 ? "selected-item" : ""
                    }`}
                    onClick={() => setDisplaySelectedComponent(1)}
                  >
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
                  <div
                    className={`item row ${
                      displaySelectedComponent === 2 ? "selected-item" : ""
                    }`}
                    onClick={() => setDisplaySelectedComponent(2)}
                  >
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
                  <div
                    className={`item row ${
                      displaySelectedComponent === 3 ? "selected-item" : ""
                    }`}
                    onClick={() => setDisplaySelectedComponent(3)}
                  >
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
                  <div
                    className={`item row ${
                      displaySelectedComponent === 4 ? "selected-item" : ""
                    }`}
                    onClick={() => setDisplaySelectedComponent(4)}
                  >
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
            {displaySelectedComponent === 1 ? (
              <SlotInformationUpdate
                setProfileCompletedPercentage={setProfileCompletedPercentage}
              />
            ) : (
              ""
            )}
            {displaySelectedComponent === 2 ? (
              <ParkingLotInformationUpdate
                setProfileCompletedPercentage={setProfileCompletedPercentage}
              />
            ) : (
              ""
            )}
            {displaySelectedComponent === 3 ? (
              <PhotoUpdate
                setProfileCompletedPercentage={setProfileCompletedPercentage}
              />
            ) : (
              ""
            )}
            {displaySelectedComponent === 4 ? (
              <PasswordUpdate
                setProfileCompletedPercentage={setProfileCompletedPercentage}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitialUpdate;
