import React, { useState } from "react";
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
} from "react-map-gl";
import Modal from "./Common/Modal";
import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import Geocoder from "./Common/Geocoder";

const AddParkingLot = () => {
  const [lat, setLat] = useState(27.698889194092786);
  const [lng, setLng] = useState(85.31847878779826);
  const [zoomLevel, setZoomLevel] = useState(12);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [parkingLotData, setParkingLotData] = useState({
    name: "",
    location: "",
    email: "",
  });
  const [errorHolder, setErrorHolder] = useState({});

  const [showModal, setShowModal] = useState(true);
  const hideModal = () => {
    setShowModal(false);
  };
  const updateLocationBySearch = (lng, lat) => {
    setLat(lat);
    setLng(lng);
  };

  const addParkingLotValidation = () => {
    const errors = {};
    if (!parkingLotData.name) {
      errors.name = "Please provide a name";
    }
    if (!parkingLotData.location) {
      errors.location = "Please provide a location";
    }
    if (!parkingLotData.email) {
      errors.email = "please provide a email";
    }
    if (markerPosition) {
      if (!markerPosition.lng) {
        errors.longitude = "please provide a longitude";
      }
      if (!markerPosition.lat) {
        errors.latitude = "please provide a latitude";
      }
    }
    return errors;
  };

  const handleButton = () => {
    const err = addParkingLotValidation();
    setErrorHolder(err);
    if (Object.keys(err).length === 0) {
      axios
        .post(BASE_URL + "/parking-lot", {
          longitude: markerPosition.lng,
          latitude: markerPosition.lat,
          ...parkingLotData,
        })
        .then((data) => {
          console.log(data);
        });
    }
  };

  return (
    <div>
      {/* <Modal
        modalState={showModal}
        closeModal={() => hideModal()}
        content="provide all the required field"
        title="Error"
      /> */}
      <ReactMapGL
        mapboxAccessToken="pk.eyJ1Ijoic3VuaW1hcmFpIiwiYSI6ImNsZGlsazEweTBrY28zb21laXlhbXdkc2UifQ.DybhcrubRyxmhs6ZvfGnXw"
        style={{
          width: window.innerWidth,
          height: "400px",
          borderRadius: "15px",
          border: "2px solid red",
        }}
        initialViewState={{
          latitude: lat,
          longitude: lng,
        }}
        zoom={zoomLevel}
        onZoom={(e) => setZoomLevel(e.viewState.zoom)}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        onMouseDown={(e) => {
          setMarkerPosition({ ...e.lngLat });
          // console.log(e.lngLat);
        }}
      >
        {markerPosition ? (
          <Marker
            latitude={markerPosition.lat}
            longitude={markerPosition.lng}
            style={{
              position: "absolute",
              zIndex: 100,
            }}
          ></Marker>
        ) : (
          ""
        )}
        {markerPosition ? (
          <Popup
            latitude={markerPosition.lat}
            longitude={markerPosition.lng}
            closeOnClick={false}
            onClose={() => {
              setMarkerPosition(null);
            }}
            offset={20}
          >
            <div>
              <form>
                <input
                  type="text"
                  placeholder="enter parking name"
                  onChange={(e) =>
                    setParkingLotData({
                      ...parkingLotData,
                      name: e.target.value,
                    })
                  }
                />
                <div>{errorHolder.name}</div>
                <input
                  type="text"
                  placeholder="enter parking location"
                  onChange={(e) =>
                    setParkingLotData({
                      ...parkingLotData,
                      location: e.target.value,
                    })
                  }
                />
                <div>{errorHolder.location}</div>
              </form>
            </div>
          </Popup>
        ) : (
          ""
        )}
        <NavigationControl position="bottom-right" />
        <GeolocateControl
          position="top-left"
          trackUserLocation
          onGeolocate={(e) => {
            setLng(e.coords.longitude);
            setLat(e.coords.latitude);
          }}
        />
        <Geocoder
          accessToken={
            "pk.eyJ1Ijoic3VuaW1hcmFpIiwiYSI6ImNsZGlsazEweTBrY28zb21laXlhbXdkc2UifQ.DybhcrubRyxmhs6ZvfGnXw"
          }
          updateSearchLocation={() => updateLocationBySearch}
        ></Geocoder>
      </ReactMapGL>
      <p>The created parking lot name is: {parkingLotData.name}, </p>
      <p>The createdparking lot location is: {parkingLotData.location}</p>
      <div className="form-group my-3">
        <label htmlFor="Email">Email</label>
        <input
          type="text"
          className="form-control"
          id="Email"
          value={parkingLotData.email}
          onChange={(e) =>
            setParkingLotData({ ...parkingLotData, email: e.target.value })
          }
          aria-describedby="emailHelp"
          placeholder="Enter email"
        />
        <div>{errorHolder.email}</div>
        <button
          type="submit"
          className="btn btn-primary my-2"
          onClick={() => handleButton()}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default AddParkingLot;
