import React from "react";
import "../../styles/Unauthorized.css";

const Unauthorized = () => {
  return (
    <div className="unauthorized">
      <h1>Unauthorized</h1>
      <p>You do not have permission to access this page.</p>
      <button onClick={() => window.history.back()}>Go back</button>
    </div>
  );
};

export default Unauthorized;
