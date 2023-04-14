import React from "react";
import { useEffect } from "react";
import useAxiosprivate from "../../hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";
import { useState } from "react";
import StarRating from "../Common/StarRating";
import Loader from "../Common/Loader";
import Modal from "../Modals/Modal";
import "./TotalReviews.css";
import { getTimeAgoFromDate } from "../../utils/utility";

const TotalReviews = () => {
  const { id } = useParams();

  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState({});
  const [parkingLot, setParkingLot] = useState([]);

  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState({});

  const axios = useAxiosprivate();
  const fetchAllReviews = async () => {
    const response = await axios.get(`/ratings/${id}`);
    setReviews(response.data.data);
  };

  const fetchAverageRating = async () => {
    const response = await axios.get(`/ratings/average-rating/${id}`);
    setAvgRating(response.data.data);
  };

  const fetchParkingLot = async () => {
    const response = await axios.get(`/parking-lot/${id}`);
    setParkingLot(response.data.data);
  };
  useEffect(() => {
    setLoader(true);
    fetchAllReviews();
    fetchAverageRating();
    fetchParkingLot();
    setLoader(false);
  }, []);
  return (
    <div className="total-reviews-container">
      {loader ? <Loader /> : ""}
      {modal.show ? (
        <Modal
          modal={setModal}
          title={modal.title}
          message={modal.message}
          type={modal.type}
          hideAfterSeconds={modal.hideAfterSeconds}
          handleConfirmation={modal.handleConfirmation}
          data={modal.data}
        />
      ) : (
        ""
      )}
      <div className="total-reviews-header">
        <div className="company-info">
          <div className="company-name">{parkingLot?.name}</div>
          <div className="company-address">{parkingLot?.location}</div>
        </div>
        <div className="rating-data">
          <div className="rating-number">
            {avgRating.average?.split(".").length === 2
              ? avgRating.average
              : `${avgRating.average}.0`}
          </div>
          <div className="rating-star">
            {avgRating.average > 0 ? (
              <StarRating rating={Number(avgRating.average)} />
            ) : (
              ""
            )}
          </div>
          <div className="number-of-reviews">({avgRating?.count} Reviews)</div>
        </div>
      </div>
      <div className="total-reviews-body">
        {reviews.map((review, index) => {
          return (
            <div className="individual-review-container">
              <div
                className="profile-image-container"
                style={{
                  backgroundImage: `url(${review?.user?.profilePictureURL})`,
                }}
              >
                {review?.user?.profilePictureURL ? (
                  ""
                ) : (
                  <div>{review?.user?.name?.charAt(0)}</div>
                )}
              </div>
              <div className="text-container">
                <div className="reviewer-info">
                  <div className="reviewer-name">{review?.user?.name}</div>
                  <div className="reviewer-rating-data">
                    <div className="reviewer-rating">
                      <StarRating rating={review?.rating} size={1} />
                    </div>
                    <div className="time-of-review">
                      {getTimeAgoFromDate(review?.updatedAt)}
                    </div>
                  </div>
                </div>
                <div className="review-text">{review?.review}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TotalReviews;
