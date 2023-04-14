import React, { useEffect, useState } from "react";
import "./ReviewForm.css";
import useAxiosprivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Common/Loader";
import Modal from "../Modals/Modal";

const ReviewForm = () => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [parkingLot, setParkingLot] = useState({ name: "" });
  const [submitButtonText, setSubmitButtonText] = useState("Submit Review");
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState({});
  const [formError, setFormError] = useState({});

  const { id } = useParams();

  const axios = useAxiosprivate();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    console.log("handle submit called");
    e.preventDefault();
    setLoader(true);
    const errors = {};
    if (rating === 0) {
      errors.rating = "Please provide rating";
    }
    setFormError(errors);
    if (Object.keys(errors).length === 0) {
      const payload = {
        rating,
        review: reviewText,
      };
      axios.post(`/ratings/user/${id}`, payload).then((response) => {
        setModal({
          show: true,
          title: "Submitted",
          message: "Review submitted successfully",
          type: "success",
          hideAfterSeconds: 2,
        });
      });
    }
    setLoader(false);
  };

  const handleStarClick = (star) => {
    setRating(star);
  };

  const fetchParkingLot = async () => {
    const response = await axios.get(`parking-lot/${id}`);
    setParkingLot(response.data.data);
  };

  const fetchPreviousReview = async () => {
    if (!loader) {
      setLoader(true);
    }
    const previousReview = await axios.get(`/ratings/user/${id}`);
    if (previousReview.data.data) {
      setRating(previousReview.data.data.rating);
      setReviewText(previousReview.data.data.review);
      setSubmitButtonText("Update Review");
    } else {
      setRating(0);
      setReviewText("");
      setSubmitButtonText("Submit Review");
    }
    setLoader(false);
  };

  useEffect(() => {
    if (!id) {
      navigate("/user-dashboard");
    }
    setLoader(true);
    fetchParkingLot();
    fetchPreviousReview();
    setLoader(false);
  }, []);

  return (
    <div className="review-container">
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
      <div className="row">
        <div className="col">
          <h2>{`Review for "${parkingLot.name}"`}</h2>
          <form>
            <div className="form-group">
              <label htmlFor="rating">Rating</label>
              <div>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`fa fa-star star-rating ${
                      star <= rating ? "checked" : ""
                    }`}
                    onClick={() => handleStarClick(star)}
                  ></span>
                ))}
              </div>
              <div className="form-error-message">{formError.rating}</div>
            </div>

            <div className="form-group">
              <label htmlFor="reviewText">Review</label>
              <textarea
                className="form-control"
                id="reviewText"
                rows="5"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="review-button-container">
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                {submitButtonText}
              </button>
              <button
                className="btn btn-danger"
                onClick={(e) => {
                  e.preventDefault();
                  fetchPreviousReview();
                }}
              >
                cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
