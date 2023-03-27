import StarRateIcon from "@mui/icons-material/StarRate";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { useState } from "react";
import { useEffect } from "react";

const StarRating = ({ rating }) => {
  const [fullFirstStars, setFullFirstStars] = useState(0);
  const [halfStars, setHalfStars] = useState(0);
  const [fullLastStars, setFullLastStars] = useState(0);

  const setStars = () => {
    const amount = rating.toString();
    if (rating > 5 || rating < 0) {
      setFullFirstStars(0);
      setHalfStars(0);
      setFullLastStars(0);
    } else if (rating % 0.5 != 0) {
      setFullFirstStars(0);
      setHalfStars(0);
      setFullLastStars(0);
    }
    if (amount.split(".").length > 1) {
      console.log("HERE");
      console.log("firstfull = " + amount.split(".")[0]);
      console.log("HALF = " + 1);
      console.log("LASTfull = " + (5 - (parseInt(amount.split(".")[0]) + 1)));

      setFullFirstStars(parseInt(amount.split(".")[0]));
      setHalfStars(1);
      setFullLastStars(5 - (parseInt(amount.split(".")[0]) + 1));
    } else if ((amount.split(".").length = 1)) {
      setFullFirstStars(rating);
      setHalfStars(0);
      setFullLastStars(5 - rating);
    }
  };

  const renderFirstStars = () => {
    const stars = [];
    for (let i = 1; i <= fullFirstStars; i++) {
      stars.push(<StarRateIcon key={i} style={{ color: "green" }} />);
    }
    return stars;
  };

  const renderHalfStars = () => {
    const stars = [];
    for (let i = 1; i <= halfStars; i++) {
      stars.push(<StarHalfIcon key={i} style={{ color: "green" }} />);
    }
    return stars;
  };

  const renderLastStars = () => {
    const stars = [];
    for (let i = 1; i <= fullLastStars; i++) {
      stars.push(<StarOutlineIcon key={i} style={{ color: "green" }} />);
    }
    return stars;
  };

  useEffect(() => {
    setStars();
  }, []);
  return (
    <div style={{ display: "flex" }}>
      {renderFirstStars()}
      {renderHalfStars()}
      {renderLastStars()}
    </div>
  );
};

export default StarRating;
