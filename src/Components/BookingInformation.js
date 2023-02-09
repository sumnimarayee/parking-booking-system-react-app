import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BASE_URL } from "../utils/Constants";

const BookingInformation = () => {
  const { state } = useLocation();
  const { parkingLotId } = state;
  const [parkingLot, setParkingLot] = useState({});

  useEffect(() => {
    async function fetch() {
      const data = await axios.get(`${BASE_URL}/parking-lot/${parkingLotId}`);
      setParkingLot(data.data.data);
    }
    fetch();
  }, []);
  return <div></div>;
};

export default BookingInformation;
