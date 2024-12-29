// src/components/Map.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Land from "./Land";
import "./Map.css"; // We'll create a CSS file for the map grid

const Map = () => {
  const [soldLands, setSoldLands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch sold lands data from the backend API
    axios
      .get("/api/sold-lands")
      .then((response) => {
        setSoldLands(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching sold lands:", error);
        setLoading(false);
      });
  }, []);

  const renderLands = () => {
    const totalLands = 3360;
    const lands = [];
    for (let i = 0; i < totalLands; i++) {
      const soldLand = soldLands.find((land) => land.id === i);
      const isSold = soldLand !== undefined;
      const userAvatarUrl = isSold ? soldLand.userAvatarUrl : "";
      lands.push(
        <Land key={i} id={i} isSold={isSold} userAvatarUrl={userAvatarUrl} />
      );
    }
    return lands;
  };

  return (
    <div className="map-container">
      {loading ? (
        <div>Loading map...</div>
      ) : (
        <div className="map">{renderLands()}</div>
      )}
    </div>
  );
};

export default Map;
