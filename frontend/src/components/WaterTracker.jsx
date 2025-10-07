import React from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;

export default function WaterTracker({ water, refresh }) {
  const addGlass = async (person) => {
    try {
      await axios.post(`${API_BASE}/water/add`, { person });
      refresh();
    } catch (err) {
      console.error("Failed to add water:", err);
    }
  };

  return (
    <div className="water-tracker">
      <h2>Water Tracker</h2>
      {["person1", "person2"].map((p) => (
        <div key={p}>
          <strong>{p}:</strong> {water[p] || 0} glasses
          <button onClick={() => addGlass(p)}>+1</button>
        </div>
      ))}
    </div>
  );
}
