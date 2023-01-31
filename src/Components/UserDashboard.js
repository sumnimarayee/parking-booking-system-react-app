import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { parkData } from "../data/skateboard-park";
// import { Link, useNavigate } from "react-router-dom";

export default function UserDashboard() {
  // const navigate = useNavigate();
  const [lat, setLat] = useState(27.700769);
  const [lng, setLng] = useState(85.30014);
  const [selectedPark, setSelectedPark] = useState(null);

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
        {parkData.features.map((park) => (
          <Marker
            key={park.properties.PARK_ID}
            latitude={park.geometry.coordinates[1]}
            longitude={park.geometry.coordinates[0]}
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
              />
            </button>
          </Marker>
        ))}

        {selectedPark ? console.log("selected park is true true") : null}

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
              <h2>{selectedPark.properties.NAME}</h2>
              <p>{selectedPark.properties.DESCRIPTIO}</p>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
      {/* <button onClick={() => navigate("/register")}>Click to Register</button>
      <button onClick={() => navigate("/login")}>Click to go login</button> */}
    </div>
  );
}
