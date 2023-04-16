import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import StarRateIcon from "@mui/icons-material/StarRate";
import { useNavigate } from "react-router-dom";
import { getCurrentTimeInHHMMFormat } from "../../utils/utility";
import Loader from "../Common/Loader";
import "./UserDashboard.css";
import ImageCarousel from "../Common/ImageCarousel";

const UserDashboard = () => {
  const [parkingLots, setParkingLots] = useState([]);
  const [loader, setLoader] = useState(false);
  const axios = useAxiosPrivate();
  const navigate = useNavigate();

  const fetchAverageRating = async (id) => {
    const response = await axios.get(`/ratings/average-rating/${id}`);
    return response.data.data;
  };

  function isShopOpen(openingTime, closingTime, currentTime) {
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

  useEffect(() => {
    setLoader(true);
    async function fetchAverageData(parkingLots) {
      const modifiedPl = await Promise.all(
        parkingLots.map(async (pl) => {
          const ratingData = await fetchAverageRating(pl._id);
          pl.avgRating = ratingData;
          return pl;
        })
      );
      return modifiedPl;
    }

    async function fetchData() {
      const response = await axios.get(`/parking-lot`);
      const fetchedParkingLots = response.data.data;
      console.log(fetchedParkingLots);
      const parkingLots = await fetchAverageData(fetchedParkingLots);
      setParkingLots(parkingLots);
      setLoader(false);
    }
    fetchData();
  }, []);

  return (
    <div className="user-dashboard-container">
      {loader ? <Loader /> : ""}
      {parkingLots.length > 0 ? (
        <div className="parking-lot-cards">
          {parkingLots.map((selectedPark, index) => {
            return (
              <div className="parking-card-container" key={index}>
                <div className="photo-container">
                  <ImageCarousel images={selectedPark.imageURLs} />
                  <div className="reviews-option">
                    <div
                      className="review-item"
                      onClick={() => {
                        navigate(`/view-reviews/${selectedPark._id}`);
                      }}
                    >
                      <div className="fa-solid fa-eye review-icon" />
                    </div>
                    <div
                      className="review-item"
                      onClick={() => {
                        navigate(`/review/${selectedPark._id}`);
                      }}
                    >
                      <div className="fa-solid fa-pen-to-square review-icon" />
                    </div>
                  </div>
                </div>
                <div className="parking-card-heading">
                  <div>{selectedPark.name}</div>
                  <div className="location">{selectedPark.location}</div>
                </div>
                <div className="parking-card-body">
                  <div className="rating-container" style={{ display: "flex" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div style={{ marginRight: "4px" }}>
                        {selectedPark?.avgRating?.average}
                      </div>
                      <div style={{ marginRight: "8px" }}>
                        {
                          <StarRateIcon
                            style={{
                              color: "rgb(253,214,99)",
                              width: "2rem",
                              height: "2rem",
                              position: "relative",
                              bottom: "2px",
                            }}
                          />
                        }
                      </div>
                    </div>
                    <div>({selectedPark?.avgRating?.count}) Reviews</div>
                    {/* <div
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
                    </div> */}
                  </div>
                  {isShopOpen(
                    selectedPark.openingTime,
                    selectedPark.closingTime,
                    getCurrentTimeInHHMMFormat()
                  )}
                </div>
                <div className="parking-card-footer">
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
            );
          })}
        </div>
      ) : (
        ""
      )}
      <div className="navigate-map-button">
        <button
          type="button"
          class="btn btn-primary"
          onClick={() => {
            navigate("/map-view-selection");
          }}
        >
          Browse Map View
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
