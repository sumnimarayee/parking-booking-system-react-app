import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillTrashFill } from "react-icons/bs";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { BASE_URL } from "../utils/Constants";

const SuperAdminDashboard = () => {
  const [data, setData] = useState([]);

  const handleDelete = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  let navigate = useNavigate();
  const axios = useAxiosPrivate();

  const routeChange = () => {
    let path = "/add-parkinglot";
    navigate(path);
  };

  useEffect(() => {
    async function fetch() {
      const fetchedData = await axios.get(`/parking-lot`);
      setData(fetchedData.data.data);
    }
    fetch();
  }, []);

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
              <td>{row.longitude}</td>
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
