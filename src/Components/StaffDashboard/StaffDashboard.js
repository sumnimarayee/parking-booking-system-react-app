import React, { useEffect, useState } from "react";
// import { Table, Button } from "react-bootstrap";
import "./StaffDashboard.css";
import InfoIcon from "@mui/icons-material/Info";
import RefreshIcon from "@mui/icons-material/Refresh";
import { CSVLink } from "react-csv";
import useAxiosprivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { computeStaffProfileUpdatePercentage } from "../../utils/utility";
import CircularProgressBar from "../Common/CircularProgressBar";
import { useNavigate } from "react-router-dom";

function StaffDashboard() {
  const [tableData, setTableData] = useState([]);
  const [profileCompletedPercentage, setProfileCompletedPercentage] =
    useState(0);

  const axios = useAxiosprivate();
  const navigate = useNavigate();
  const { auth } = useAuth();
  useEffect(() => {
    const fetchParkingLot = async () => {
      const response = await axios.get(`parking-lot/staff/${auth.id}`);
      // setTableData(response.data.data.parkingLot)
      setTableData(response.data.data.bookings);
      const computedPercentage = computeStaffProfileUpdatePercentage(
        response.data.data.parkingLot.updatedItems
      );
      localStorage.setItem("profileCompletedPercentage", computedPercentage);
      setProfileCompletedPercentage(computedPercentage);
      // console.log();
      localStorage.setItem("parkingLotId", response.data.data.parkingLot._id);
    };
    fetchParkingLot();
  }, []);

  const csvReport = {
    data: tableData.length > 0 ? tableData : [{ null: null }],
    filename: "test.csv",
  };

  return (
    <div className="staff-dashboard-container">
      <div className="heading-buttons-container">
        <div className="table-name-container">
          <div>
            <InfoIcon />
          </div>
          <div className="table-name">Booking Details For Today</div>
        </div>
        <div className="buttons">
          <button className="btn btn-outline-primary button-1">
            Add Bookings
          </button>
          <button className="btn btn-outline-primary button-2">
            <CSVLink {...csvReport}>export</CSVLink>
          </button>
        </div>
      </div>

      <div className="search-container">
        <div className="grid-item-1">
          <input
            type="search"
            className="form-control rounded"
            placeholder="Enter Vehicle Plate Number"
            aria-label="Search"
            aria-describedby="search-addon"
          />
        </div>

        <div className="grid-item-2">
          <div>13</div>
        </div>
        <div className="grid-item-3">
          <RefreshIcon />
        </div>
        {/* <div className="col-sm-10"></div>
        <div className="col-sm-1"></div>
        <div className="col-sm-1">
          <RefreshIcon />
        </div> */}
      </div>
      {profileCompletedPercentage === 100 ? (
        tableData.length > 0 ? (
          <table className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((data) => (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>
                    <button className="btn btn-primary">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-booking-text">
            <div>No Bookings For Today</div>
          </div>
        )
      ) : (
        <div className="complete-profile-update-card">
          <div className="card">
            <div className="card-top">
              <div
                style={{
                  width: "5.5rem",
                  height: "5.5rem",
                  display: "inline-block",
                  marginTop: "10px",
                }}
              >
                <CircularProgressBar
                  completedPercentage={profileCompletedPercentage}
                />
              </div>
              <div className="complete-update-description">
                <div>
                  Update the profile for all section from the "update profile"
                  <br />
                  section by clicking on the button below.
                </div>
              </div>
            </div>
            <div className="card-bottom">
              <button
                className="btn btn-primary"
                onClick={() => navigate("/initial-update")}
              >
                update profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StaffDashboard;
