import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

const AddParkingLot = () => {
  const [lat, setLat] = useState(27.698889194092786);
  const [lng, setLng] = useState(85.31847878779826);
  const [zoomLevel, setZoomLevel] = useState(12);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [parkingLotData, setParkingLotData] = useState({
    name: "",
    location: "",
    staffEmail: "",
  });
  return (
    <div>
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
          console.log(e.lngLat);
        }}
      >
        {markerPosition ? (
          <Marker
            latitude={markerPosition.lat}
            longitude={markerPosition.lng}
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
              // setSelectedPark(null);
            }}
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
              </form>
            </div>
          </Popup>
        ) : (
          ""
        )}
      </ReactMapGL>
      <p>The created parking lot name is: {parkingLotData.name}, </p>
      <p>The createdparking lot location is: {parkingLotData.location}</p>
      <div className="form-group my-3">
        <label htmlFor="InputEmail">Email</label>
        <input
          type="text"
          className="form-control"
          id="InputEmail"
          value={parkingLotData.email}
          onChange={(e) =>
            setParkingLotData({ ...parkingLotData, email: e.target.value })
          }
          aria-describedby="emailHelp"
          placeholder="Enter email"
        />
        <button type="submit" className="btn btn-primary my-2">
          Create
        </button>
      </div>
    </div>
  );
};

export default AddParkingLot;
