// src/components/Land.js
import React from "react";

const Land = ({ id, userAvatarUrl, isSold, userInfo }) => {
  return (
    <div
      className={`land ${isSold ? "sold" : ""}`}
      style={{
        backgroundImage: isSold ? `url(${userAvatarUrl})` : "none",
        backgroundSize: "cover",
      }}
      id={`land-${id}`}
    >
      {!isSold && <div className="land-placeholder">Available</div>}
      {isSold && userInfo && (
        <div className="land-info">
          {userInfo.username} <br /> {userInfo.location}
        </div>
      )}
    </div>
  );
};

export default Land;
