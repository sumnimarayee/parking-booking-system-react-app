import React, { useState } from "react";
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
} from "react-map-gl";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { BASE_URL } from "../utils/Constants";
import Geocoder from "./Common/Geocoder";
import InfoIcon from "@mui/icons-material/Info";
import Loader from "./Common/Loader";
import Modal from "./Modals/Modal";
import "../styles/AddParkingLot.css";

const AddParkingLot = () => {
  const [lat, setLat] = useState(27.698889194092786);
  const [lng, setLng] = useState(85.31847878779826);
  const [zoomLevel, setZoomLevel] = useState(12);
  const [markerPosition, setMarkerPosition] = useState({ lng: "", lat: "" });
  const [parkingLotData, setParkingLotData] = useState({
    name: "",
    location: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState({});
  const [displayPopup, setDisplayPopup] = useState(true);
  const updateLocationBySearch = (lng, lat) => {
    setLat(lat);
    setLng(lng);
  };

  const axios = useAxiosPrivate();

  const addParkingLotValidation = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!parkingLotData.name) {
      errors.name = "Please provide a name";
    }
    if (!parkingLotData.location) {
      errors.location = "Please provide a location";
    }
    if (!parkingLotData.email) {
      errors.email = "please provide a email";
    } else if (emailRegex.test(parkingLotData.email) === false) {
      errors.email = "Please provide a valid email";
    }
    if (!markerPosition.lng || !markerPosition.lat) {
      errors.marker = "please drop marker in the map";
    }
    return errors;
  };

  const handleButton = () => {
    const err = addParkingLotValidation();
    setFormErrors(err);
    if (Object.keys(err).length === 0) {
      setLoader(true);
      axios
        .post(BASE_URL + "/parking-lot", {
          longitude: markerPosition.lng,
          latitude: markerPosition.lat,
          ...parkingLotData,
        })
        .then((data) => {
          setModal({
            show: true,
            title: "Created",
            message: "Parking lot created successfully",
            type: "success",
          });
          setFormErrors({});
          setMarkerPosition({ lng: "", lat: "" });
          setParkingLotData({
            name: "",
            location: "",
            email: "",
          });
        });
      setLoader(false);
    }
  };

  const hideInformationPopup = () => {
    setDisplayPopup(false);
  };

  return (
    <div className="add-parkinglot-container">
      {loader ? <Loader /> : ""}
      {modal.show ? (
        <Modal
          modal={setModal}
          title={modal.title}
          message={modal.message}
          type={modal.type}
        />
      ) : (
        ""
      )}
      <ReactMapGL
        mapboxAccessToken="pk.eyJ1Ijoic3VuaW1hcmFpIiwiYSI6ImNsZGlsazEweTBrY28zb21laXlhbXdkc2UifQ.DybhcrubRyxmhs6ZvfGnXw"
        style={{
          width: "99vw",
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
          setDisplayPopup(false);
          setMarkerPosition({ ...e.lngLat });
          // console.log(e.lngLat);
        }}
      >
        {markerPosition ? (
          <Marker
            latitude={markerPosition?.lat}
            longitude={markerPosition?.lng}
            style={{
              position: "absolute",
              zIndex: 100,
            }}
          ></Marker>
        ) : (
          ""
        )}
        {/* {markerPosition ? (
          <Popup
            latitude={markerPosition?.lat}
            longitude={markerPosition?.lng}
            closeOnClick={false}
            onClose={() => {
              setMarkerPosition({ lng: "", lat: "" });
            }}
            offset={20}
          ></Popup>
        ) : (
          ""
        )} */}
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
      <div
        className={`information-popup ${
          displayPopup === false ? "hidden" : ""
        }`}
      >
        <div className="fa-solid fa-square-exclamation fa-beat-fade">
          <InfoIcon
            style={{ width: "2.5rem", height: "2.5rem", color: "blue" }}
          />
        </div>
        <div>Click on the map to set the location and fill the form</div>
      </div>
      <div
        className={`information-popup-background ${
          displayPopup === false ? "hidden" : ""
        }`}
        onClick={() => hideInformationPopup()}
      ></div>
      <div className="data-input-forms row">
        <div className="parking-information-input-form col-sm-6">
          <div className="mb-3 row">
            <label htmlFor="name" className="form-label col-sm-2">
              Name
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                id="name"
                value={parkingLotData.name}
                onChange={(e) =>
                  setParkingLotData({
                    ...parkingLotData,
                    name: e.target.value,
                  })
                }
              />
              <div className="form-error-message">{formErrors.name}</div>
            </div>
            <label htmlFor="location" className="form-label col-sm-2">
              Location
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                id="location"
                value={parkingLotData.location}
                onChange={(e) =>
                  setParkingLotData({
                    ...parkingLotData,
                    location: e.target.value,
                  })
                }
              />
              <div className="form-error-message">{formErrors.location}</div>
            </div>
            <label htmlFor="email" className="form-label col-sm-2">
              Email (Staff)
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                id="email"
                value={parkingLotData.email}
                onChange={(e) =>
                  setParkingLotData({
                    ...parkingLotData,
                    email: e.target.value,
                  })
                }
              />
              <div className="form-error-message">{formErrors.email}</div>
            </div>
          </div>
        </div>

        <div className="location-readonly-form col-sm-6">
          <div className="mb-3 row">
            <label htmlFor="longitude" className="form-label col-sm-2">
              Longitude
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control-plaintext"
                id="longitude"
                value={markerPosition.lng}
                readOnly
                style={{ outline: "1px solid #ced4da", borderRadius: "5px" }}
              />
              <div className="form-error-message">{formErrors.marker}</div>
            </div>
            <label htmlFor="latitude" className="form-label col-sm-2">
              Latitude
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control-plaintext"
                id="longitude"
                value={markerPosition.lat}
                readOnly
                style={{ outline: "1px solid #ced4da", borderRadius: "5px" }}
              />
              <div className="form-error-message">{formErrors.marker}</div>
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <button
                  type="submit"
                  style={{ width: "200px" }}
                  className="btn btn-primary my-2"
                  onClick={() => handleButton()}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddParkingLot;
