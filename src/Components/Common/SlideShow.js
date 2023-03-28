import React from "react";
import "../../styles/SlideShow.css";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "orange", "yellow"];
const delay = 3500000;

const SlideShow = ({ images }) => {
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="slideshow">
      {images?.length > 0 ? (
        <div
          className="slideshowSlider"
          style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
        >
          {/* {colors.map((backgroundColor, index) => (
          <div className="slide" key={index} style={{ backgroundColor }}></div>
        ))} */}
          {images.map((imageUrl, index) => (
            <div
              className="slide"
              key={index}
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "cover",
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

export default SlideShow;
