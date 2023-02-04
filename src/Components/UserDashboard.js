import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { BASE_URL } from "../utils/Constants";
import axios from "axios";

export default function UserDashboard() {
  // const navigate = useNavigate();
  const [lat, setLat] = useState(27.700769);
  const [lng, setLng] = useState(85.30014);
  const [selectedPark, setSelectedPark] = useState(null);
  const [parkingLots, setParkingLots] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${BASE_URL}/user/parkinglots`);
      setParkingLots(response.data.data);
    }
    fetchData();
  }, []);

  return (
    <div>
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
            latitude={selectedPark.geometry.coordinates[1]}
            longitude={selectedPark.geometry.coordinates[0]}
            closeOnClick={false}
            onClose={() => {
              setSelectedPark(null);
            }}
          >
            <div>
              <h2>{selectedPark.name}</h2>
              <p>{selectedPark.name}</p>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
      {/* <button onClick={() => navigate("/register")}>Click to Register</button>
      <button onClick={() => navigate("/login")}>Click to go login</button> */}
    </div>
  );
}
