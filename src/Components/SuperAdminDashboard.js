import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillTrashFill } from "react-icons/bs";

const SuperAdminDashboard = () => {
  const [data, setData] = useState([
    { name: "Company 1", location: "New York", managingStaffName: "John Doe" },
    { name: "Company 2", location: "London", managingStaffName: "Jane Doe" },
    { name: "Company 3", location: "Paris", managingStaffName: "Jim Smith" },
  ]);

  const handleDelete = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/add-parkinglot";
    navigate(path);
  };

  return (
    <>
      <button className="btn btn-primary" onClick={routeChange}>
        +Parking Lot
      </button>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Location</th>
            <th scope="col">Managing Staff Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.name}</td>
              <td>{row.location}</td>
              <td>{row.managingStaffName}</td>
              <td>
                <span
                  className=" bi bi-trash"
                  onClick={() => handleDelete(index)}
                >
                  <BsFillTrashFill />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default SuperAdminDashboard;
