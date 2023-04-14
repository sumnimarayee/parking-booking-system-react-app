import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
} from "react-map-gl";
import Geocoder from "./Common/Geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Loader from "./Common/Loader";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import "../styles/UserDashboard.css";
import * as turf from "@turf/turf";
import PlaceIcon from "@mui/icons-material/Place";
import StarRateIcon from "@mui/icons-material/StarRate";
import CloseIcon from "@mui/icons-material/Close";
import RateReviewIcon from "@mui/icons-material/RateReview";
import PreviewIcon from "@mui/icons-material/Preview";
import { getCurrentTimeInHHMMFormat } from "../utils/utility";

const GEOFENCE = turf.circle([85.30014, 27.700769], 10, {
  units: "miles",
});

export default function UserDashboard() {
  const navigate = useNavigate();
  // const [lat, setLat] = useState(27.700769);
  // const [lng, setLng] = useState(85.30014);
  // const [zoomLevel, setZoomLevel] = useState(6);
  const [viewState, setViewState] = useState({
    longitude: 85.30014,
    latitude: 27.700769,
    zoom: 12,
  });

  const [selectedPark, setSelectedPark] = useState(null);
  const [parkingLots, setParkingLots] = useState([]);
  const [showFilterBar, setShowFilterBar] = useState(false);
  const [avgRating, setAvgRating] = useState({});

  // const [zoomLevel, setZoomLevel] = useState(12);
  const [loader, setLoader] = useState(false);
  const [priceFilterValues, setPriceFilterValues] = useState({
    vehicleType: "twoWheeler",
  });
  const [filterErrors, setFilterErrors] = useState({});
  // const [errorPriceFilterValues, setErrorPriceFilterValues] = useState({});

  const updateLocationBySearch = (lng, lat) => {
    setViewState({
      ...viewState,
      longitude: lng,
      latitude: lat,
    });
    // setLat(lat);
    // setLng(lng);
  };

  const axios = useAxiosPrivate();

  const onClickPriceFilter = async (e) => {
    setLoader(true);
    let queryParam = `?vehicleType=${priceFilterValues.vehicleType}`;

    const numberOnlyRegex = /^[0-9]*$/;
    const formError = {};
    //validation
    if (priceFilterValues.minPrice) {
      if (!numberOnlyRegex.test(priceFilterValues.minPrice)) {
        formError.price =
          "Please enter a valid number or leave the field empty";
      }
    }
    if (priceFilterValues.maxPrice) {
      if (!numberOnlyRegex.test(priceFilterValues.maxPrice)) {
        formError.price =
          "Please enter a valid number or leave the field empty";
      }
    }
    if (
      priceFilterValues.minPrice &&
      priceFilterValues.maxPrice &&
      Object.keys(formError).length === 0
    ) {
      if (priceFilterValues.minPrice > priceFilterValues.maxPrice) {
        formError.price = "Min price cannot be greater than max price";
      }
    }

    setFilterErrors(formError);

    if (Object.keys(formError).length === 0) {
      if (priceFilterValues.minPrice) {
        queryParam += `&minPrice=${priceFilterValues.minPrice}`;
      }
      if (priceFilterValues.maxPrice) {
        queryParam += `&maxPrice=${priceFilterValues.maxPrice}`;
      }
      if (priceFilterValues.minPrice || priceFilterValues.maxPrice) {
        const response = await axios.get(`/parking-lot${queryParam}`);
        setParkingLots(response.data.data);
      }
    }
    setLoader(false);
  };

  const fetchAverageRating = async (id) => {
    const response = await axios.get(`/ratings/average-rating/${id}`);
    setAvgRating(response.data.data);
  };

  useEffect(() => {
    setLoader(true);
    async function fetchData() {
      // const headers = {'Authorization': 'Bearer ' + localStorage.getItem('access_token')};
      const response = await axios.get(`/parking-lot`);
      setParkingLots(response.data.data);
      setLoader(false);
    }
    fetchData();
  }, []);

  const onMove = React.useCallback(({ viewState }) => {
    const newCenter = [viewState.longitude, viewState.latitude];
    // console.log("newCentre =  " + JSON.stringify(newCenter));
    // Only update the view state if the center is inside the geofence
    if (turf.booleanPointInPolygon(newCenter, GEOFENCE)) {
      console.log("INSIDE IFFFF");
      // setViewState(newCenter);
      setViewState({
        ...viewState,
        longitude: newCenter[0],
        latitude: newCenter[1],
      });
    } else {
      console.log("inside else");
      setViewState({
        ...viewState,
        longitude: 85.30014,
        latitude: 27.700769,
        zoom: 12,
      });
    }
  }, []);

  function isShopOpen(openingTime, closingTime, currentTime) {
    console.log(openingTime, closingTime, currentTime);
    const openingHour = parseInt(openingTime.split(":")[0]);
    const openingMinute = parseInt(openingTime.split(":")[1]);
    const closingHour = parseInt(closingTime.split(":")[0]);
    const closingMinute = parseInt(closingTime.split(":")[1]);
    const currentHour = parseInt(currentTime.split(":")[0]);
    const currentMinute = parseInt(currentTime.split(":")[1]);

    const openingDate = new Date();
    openingDate.setHours(openingHour, openingMinute, 0, 0);
    const closingDate = new Date();
    closingDate.setHours(closingHour, closingMinute, 0, 0);
    const currentDate = new Date();
    currentDate.setHours(currentHour, currentMinute, 0, 0);

    if (currentDate >= openingDate && currentDate < closingDate) {
      return (
        <div className="open-closed-container">
          <div style={{ color: "rgb(117,181,135)", marginRight: "4px" }}>
            Open,
          </div>
          <div>Closes {closingTime}</div>
        </div>
      );
    } else {
      return (
        <div className="open-closed-container">
          <div style={{ marginRight: "4px" }}>Closed,</div>
          <div style={{ color: "rgb(117,181,135)" }}>Opens {openingTime}</div>
        </div>
      );
    }
  }

  return (
    <div className="user-dashboard-container">
      {loader ? <Loader></Loader> : ""}
      <div className="filter-icon-holder">
        {!showFilterBar ? (
          <FilterAltIcon
            style={{
              color: "rgb(117,117,117)",
              width: "1.5rem",
              height: "1.5rem",
              // height: '2rem'
              padding: "0",
              margin: "0",
            }}
            onClick={() => setShowFilterBar(true)}
          />
        ) : (
          ""
        )}
      </div>
      <div
        className={`filter-sidebar ${
          showFilterBar ? "filter-sidebar-display" : ""
        }`}
      >
        <div className="filter-sidebar-header">
          <div className="filter-sidebar-title">Filter</div>
          <div className="">
            <CloseIcon
              style={{
                color: "rgb(117,117,117)",
                width: "1.5rem",
                height: "1.5rem",
              }}
              onClick={() => setShowFilterBar(false)}
            />
          </div>
        </div>
        <div className="filter-sidebar-body">
          <label>Price</label>
          <div className="price-filter-container">
            <div className="price-filter-inputs">
              <div className="min-price">
                <input
                  className="price-input"
                  type="number"
                  placeholder="min"
                  value={priceFilterValues.minPrice}
                  onChange={(e) => {
                    setPriceFilterValues({
                      ...priceFilterValues,
                      minPrice: e.target.value,
                    });
                  }}
                />
              </div>
              -
              <div className="max-price">
                <input
                  className="price-input"
                  type="number"
                  placeholder="max"
                  value={priceFilterValues.maxPrice}
                  onChange={(e) => {
                    setPriceFilterValues({
                      ...priceFilterValues,
                      maxPrice: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <div>
              <select
                className="form-select"
                aria-label="Select Vehicle Type"
                value={priceFilterValues.vehicleType}
                onChange={(e) => {
                  setPriceFilterValues({
                    ...priceFilterValues,
                    vehicleType: e.target.value,
                  });
                }}
              >
                <option value="twoWheeler">2 Wheeler</option>
                <option value="fourWheeler">4 Wheeler</option>
              </select>
            </div>
          </div>
          <div className="form-error-message">{filterErrors.price}</div>
        </div>
        <div className="filter-sidebar-footer">
          <button
            onClick={() => {
              onClickPriceFilter();
            }}
          >
            Apply Filter
          </button>
        </div>
      </div>
      <ReactMapGL
        mapboxAccessToken="pk.eyJ1Ijoic3VuaW1hcmFpIiwiYSI6ImNsZGlsazEweTBrY28zb21laXlhbXdkc2UifQ.DybhcrubRyxmhs6ZvfGnXw"
        style={{
          height: "90vh",
          borderRadius: "5px",
        }}
        // initialViewState={{
        //   latitude: lat,
        //   longitude: lng,
        // }}
        {...viewState}
        // zoom={zoomLevel}
        // onZoom={(e) => }
        onMove={onMove}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        {parkingLots.map((park) => (
          <Marker
            key={park._id}
            latitude={park.latitude}
            longitude={park.longitude}
            anchor="bottom"
          >
            <button
              className="marker-btn"
              onMouseEnter={(e) => {
                e.preventDefault();
                fetchAverageRating(park._id);
                setSelectedPark(park);
              }}
            >
              <PlaceIcon
                style={{
                  width: "2.4rem",
                  height: "2.4rem",
                  color: "rgb(204,61,61)",
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
            // onMouseEnter={() => {
            //   console.log("on mouse enter");
            // }}
            // onMouseLeave={(e) => {
            //   console.log("on mouse leave");
            //   e.preventDefault();
            //   setSelectedPark(null);
            // }}
            closeOnMove={false}
          >
            <div className="popup-container">
              <div className="popup-heading">
                <div>{selectedPark.name}</div>
              </div>
              <div className="popup-body">
                <div>{"Location: " + selectedPark.location}</div>
                <div className="rating-container" style={{ display: "flex" }}>
                  <div style={{ marginRight: "4px" }}>{avgRating?.average}</div>
                  <div style={{ marginRight: "8px" }}>
                    {
                      <StarRateIcon
                        style={{
                          color: "rgb(253,214,99)",
                          width: "1.2rem",
                          height: "1.2rem",
                          position: "relative",
                          bottom: "2px",
                        }}
                      />
                    }
                  </div>
                  <div>({avgRating?.count})</div>
                  <div
                    className="review-icon-container"
                    style={{
                      position: "relative",
                      top: "2px",
                    }}
                    onClick={() => {
                      navigate(`/review/${selectedPark._id}`);
                    }}
                  >
                    <RateReviewIcon style={{ color: "#7dff7d" }} />
                  </div>
                  <div
                    className="view-ratings"
                    style={{
                      marginLeft: "4px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      navigate(`/view-reviews/${selectedPark._id}`);
                    }}
                  >
                    <PreviewIcon style={{ color: "#7dff7d" }} />
                  </div>
                </div>
                {isShopOpen(
                  selectedPark.openingTime,
                  selectedPark.closingTime,
                  getCurrentTimeInHHMMFormat()
                )}
              </div>
              <div className="popup-footer">
                <button
                  onClick={() => {
                    localStorage.setItem(
                      "userSelectedParkingLotId",
                      selectedPark._id
                    );
                    navigate("/book");
                  }}
                >
                  Details
                </button>
              </div>
            </div>
          </Popup>
        ) : null}
        <NavigationControl position="bottom-right" />
        <GeolocateControl
          position="top-left"
          trackUserLocation
          onGeolocate={(e) => {
            setViewState({
              ...viewState,
              longitude: e.coords.longitude,
              latitude: e.coords.latitude,
            });
            // setLng(e.coords.longitude);
            // setLat(e.coords.latitude);
          }}
        />
        <Geocoder
          accessToken={
            "pk.eyJ1Ijoic3VuaW1hcmFpIiwiYSI6ImNsZGlsazEweTBrY28zb21laXlhbXdkc2UifQ.DybhcrubRyxmhs6ZvfGnXw"
          }
          updateSearchLocation={() => updateLocationBySearch}
        ></Geocoder>
      </ReactMapGL>
      {/* <button onClick={() => navigate("/register")}>Click to Register</button>
      <button onClick={() => navigate("/login")}>Click to go login</button> */}
    </div>
  );
}
