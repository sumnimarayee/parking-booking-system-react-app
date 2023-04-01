import React from "react";
import "./Tile.css";

const Tile = ({ title, value, type }) => {
  return (
    <div
      className={`tile ${
        type === "revenue"
          ? "revenue-tile"
          : type === "bookings"
          ? "bookings-tile"
          : ""
      }`}
    >
      <div className="title">{title}</div>
      <div className="value">
        {`${type === "revenue" ? "रू" : ""}`} {value}
      </div>
    </div>
  );
};

export default Tile;
