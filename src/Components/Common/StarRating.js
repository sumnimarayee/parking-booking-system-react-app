import StarRateIcon from "@mui/icons-material/StarRate";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

import { useState } from "react";
import { useEffect } from "react";

const StarRating = ({ rating, size }) => {
  const [fullFirstStars, setFullFirstStars] = useState(0);
  const [halfStars, setHalfStars] = useState(0);
  const [fullLastStars, setFullLastStars] = useState(0);
  const [starStyle, setStarStyle] = useState({ color: "rgb(242,99,6)" });

  const setStars = () => {
    const amount = rating.toString();
    if (rating > 5 || rating < 1) {
      setFullFirstStars(0);
      setHalfStars(0);
      setFullLastStars(0);
    } else if (rating % 0.5 != 0) {
      setFullFirstStars(0);
      setHalfStars(0);
      setFullLastStars(0);
    }
    if (amount.split(".").length > 1) {
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
    console.log(starStyle);
    const stars = [];
    for (let i = 1; i <= fullFirstStars; i++) {
      stars.push(<StarRateIcon key={i} style={starStyle} />);
    }
    return stars;
  };

  const renderHalfStars = () => {
    const stars = [];
    for (let i = 1; i <= halfStars; i++) {
      stars.push(<StarHalfIcon key={i} style={starStyle} />);
    }
    return stars;
  };

  const renderLastStars = () => {
    const stars = [];
    for (let i = 1; i <= fullLastStars; i++) {
      stars.push(<StarOutlineIcon key={i} style={starStyle} />);
    }
    return stars;
  };

  useEffect(() => {
    if (size) {
      console.log("size is ===== " + size);
      setStarStyle({ ...starStyle, height: `${size}rem`, width: `${size}rem` });
    }
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
