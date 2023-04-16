import React from "react";
import "../../styles/ImageCarousel.css";

const ImageCarousel = ({ images }) => {
  const [index, setIndex] = React.useState(0);

  return (
    <div className="imageCarousel">
      {images?.length > 0 ? (
        <div
          className="slideshowSlider"
          style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
        >
          {images.map((imageUrl, index) => (
            <div
              className="slide"
              key={index}
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          ))}
        </div>
      ) : (
        ""
      )}

      {images.length === 1 ? (
        ""
      ) : (
        <div className="slideshowDots">
          {images.map((_, idx) => (
            <div
              key={idx}
              className={`slideshowDot${index === idx ? " active" : ""}`}
              onClick={() => {
                setIndex(idx);
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
