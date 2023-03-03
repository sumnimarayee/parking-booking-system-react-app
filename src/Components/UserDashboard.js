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
import { BASE_URL } from "../utils/Constants";
import axios from "axios";
import Loader from "./Common/Loader";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import "../styles/UserDashboard.css";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [lat, setLat] = useState(27.700769);
  const [lng, setLng] = useState(85.30014);
  const [selectedPark, setSelectedPark] = useState(null);
  const [parkingLots, setParkingLots] = useState([]);
  // const [zoomLevel, setZoomLevel] = useState(12);
  const [loader, setLoader] = useState(false);
  const [priceFilterValues, setPriceFilterValues] = useState({
    vehicleType: "twoWheeler",
  });
  // const [errorPriceFilterValues, setErrorPriceFilterValues] = useState({});

  const updateLocationBySearch = (lng, lat) => {
    setLat(lat);
    setLng(lng);
  };

  const onClickPriceFilter = async (e) => {
    e.preventDefault();
    console.log("onclickeddddd");
    let queryParam = `?vehicleType=${priceFilterValues.vehicleType}`;
    //validation
    if (
      priceFilterValues.minPrice !== null &&
      priceFilterValues.minPrice !== undefined
    ) {
      const numberOnlyRegex = /^[0-9]*$/;
      if (!numberOnlyRegex.test(priceFilterValues.minPrice)) {
        //show error modal popup
      }
    }
    if (
      priceFilterValues.maxPrice !== null &&
      priceFilterValues.maxPrice !== undefined
    ) {
      const numberOnlyRegex = /^[0-9]*$/;
      if (!numberOnlyRegex.test(priceFilterValues.maxPrice)) {
        //show error modal popup
      }
    }

    if (
      priceFilterValues.minPrice !== null &&
      priceFilterValues.minPrice !== undefined &&
      priceFilterValues.maxPrice !== null &&
      priceFilterValues.maxPrice !== undefined
    ) {
      if (priceFilterValues.minPrice > priceFilterValues.maxPrice) {
        // show error modal popup
      }
    }
    if (priceFilterValues.minPrice) {
      queryParam += `&minPrice=${priceFilterValues.minPrice}`;
    }
    if (priceFilterValues.maxPrice) {
      queryParam += `&maxPrice=${priceFilterValues.maxPrice}`;
    }
    if (priceFilterValues.minPrice || priceFilterValues.maxPrice) {
      const response = await axios.get(`${BASE_URL}/parking-lot${queryParam}`);
      setParkingLots(response.data.data);
    }
  };

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
      <div className="booking-filter-container">
        <div className="price-filter-container">
          <label>Price</label>
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
          <div>
            <select
              class="form-select"
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
          <button onClick={(e) => onClickPriceFilter(e)}>
            <FilterAltIcon />
          </button>
        </div>
      </div>
      <ReactMapGL
        mapboxAccessToken="pk.eyJ1Ijoic3VuaW1hcmFpIiwiYSI6ImNsZGlsazEweTBrY28zb21laXlhbXdkc2UifQ.DybhcrubRyxmhs6ZvfGnXw"
        style={{
          // width: window.innerWidth,
          height: window.innerHeight,
          // borderRadius: "15px",
          // border: "2px solid red",
        }}
        initialViewState={{
          latitude: lat,
          longitude: lng,
        }}
        // zoom={zoomLevel}
        // onZoom={(e) => setZoomLevel(e.viewState.zoom)}
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
      {/* <button onClick={() => navigate("/register")}>Click to Register</button>
      <button onClick={() => navigate("/login")}>Click to go login</button> */}
    </div>
  );
}
