import React, { useState } from "react";
// import { Table, Button } from "react-bootstrap";
import "./StaffDashboard.css";
import InfoIcon from "@mui/icons-material/Info";
import RefreshIcon from "@mui/icons-material/Refresh";
import { CSVLink } from "react-csv";

function StaffDashboard() {
  const [tableData, setTableData] = useState([
    { id: 1, name: "John Doe", email: "john.doe@example.com" },
    { id: 2, name: "Jane Doe", email: "jane.doe@example.com" },
    {
      id: 3,
      name: "Bob Smith",
      email: "bob.smith@example.com",
    },
  ]);

  const csvReport = {
    data: tableData,
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
            class="form-control rounded"
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
    </div>
  );
}

export default StaffDashboard;
