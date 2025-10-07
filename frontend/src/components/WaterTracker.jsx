import React from "react";
import axios from "axios";

export default function WaterTracker({ water, refresh }) {
  const addGlass = async (person) => {
    await axios.post(`https://tracker-6zxo.onrender.com${person}`);
    refresh();
  };

  const renderGlasses = (count) => {
    let glasses = [];
    for (let i = 0; i < 8; i++) {
      glasses.push(
        <span key={i} className={`glass ${i < count ? "full" : ""}`}>🥛</span>
      );
    }
    return glasses;
  };

  return (
    <div className="water-tracker">
      <h2>Water Tracker</h2>
      <div className="person">
        <h3>Person 1</h3>
        <div className="glasses">{renderGlasses(water.person1)}</div>
        <button onClick={() => addGlass("person1")}>+1 Glass</button>
      </div>
      <div className="person">
        <h3>Person 2</h3>
        <div className="glasses">{renderGlasses(water.person2)}</div>
        <button onClick={() => addGlass("person2")}>+1 Glass</button>
      </div>
    </div>
  );
}
