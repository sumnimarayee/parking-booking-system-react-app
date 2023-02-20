import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { BASE_URL } from "../utils/Constants";
import axios from "axios";
import Loader from "./Common/Loader";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [lat, setLat] = useState(27.700769);
  const [lng, setLng] = useState(85.30014);
  const [selectedPark, setSelectedPark] = useState(null);
  const [parkingLots, setParkingLots] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    async function fetchData() {
      const response = await axios.get(`${BASE_URL}/parking-lot`);
      setParkingLots(response.data.data);
      setLoader(false);
    }
    fetchData();
  }, []);

  return (
    <div style={{ position: "relative" }}>
      {loader ? <Loader></Loader> : ""}
      <ReactMapGL
        mapboxAccessToken="pk.eyJ1Ijoic3VuaW1hcmFpIiwiYSI6ImNsZGlsazEweTBrY28zb21laXlhbXdkc2UifQ.DybhcrubRyxmhs6ZvfGnXw"
        style={{
          width: window.innerWidth,
          height: window.innerHeight,
          borderRadius: "15px",
          border: "2px solid red",
        }}
        initialViewState={{
          latitude: lat,
          longitude: lng,
        }}
        // zoom={10}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        {parkingLots.map((park) => (
          <Marker
            key={park._id}
            latitude={park.latitude}
            longitude={park.longitude}
          >
            <button
              className="marker-btn"
              onClick={(e) => {
                e.preventDefault();
                setSelectedPark(park);
              }}
            >
              <img
                src={require("../assets/parking-marker.png")}
                alt="parking icon"
                style={{
                  background: "rgba(255, 122, 89, 0.5)",
                }}
              />
            </button>
          </Marker>
        ))}

        {selectedPark ? (
          <Popup
            latitude={selectedPark.latitude}
            longitude={selectedPark.longitude}
            closeOnClick={false}
            onClose={() => {
              setSelectedPark(null);
            }}
          >
            <div>
              <h2>{selectedPark.name}</h2>
              <p>{selectedPark.name}</p>
              <button
                onClick={() => {
                  navigate("/book", {
                    state: { parkingLotId: selectedPark._id },
                  });
                }}
              >
                Book
              </button>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
      {/* <button onClick={() => navigate("/register")}>Click to Register</button>
      <button onClick={() => navigate("/login")}>Click to go login</button> */}
    </div>
  );
}
