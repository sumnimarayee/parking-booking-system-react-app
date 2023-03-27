import React, { useState, useEffect } from "react";
import "../../styles/ImageCarousel.css";

const ImageCarousel = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState("left");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDirection("left");
      setActiveIndex((activeIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [activeIndex]);

  const handleTransitionEnd = () => {
    console.log("");
    setDirection("");
  };

  return (
    <div className="image-slider">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Image ${index + 1}`}
          className={`slider-item ${
            index === activeIndex ? "active" : ""
          } ${direction}`}
          onTransitionEnd={handleTransitionEnd}
        />
      ))}
    </div>
  );
};

export default ImageCarousel;
