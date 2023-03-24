import React from "react";
import "../../styles/NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>Oops!</h1>
      <p>We couldn't find the page you're looking for.</p>
      <button onClick={() => window.history.back()}>Go back</button>
    </div>
  );
};

export default NotFound;
