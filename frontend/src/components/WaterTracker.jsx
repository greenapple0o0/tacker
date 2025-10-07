import React from "react";

export default function WaterTracker({ water, refresh }) {
  const addWater = async (person) => {
    await fetch(`/api/tracker/water/${person}`, { method: "POST" });
    refresh();
  };

  return (
    <div className="water-tracker">
      <h2>Water Intake</h2>
      <div>
        Person1: {water.person1} <button onClick={() => addWater("person1")}>+</button>
      </div>
      <div>
        Person2: {water.person2} <button onClick={() => addWater("person2")}>+</button>
      </div>
    </div>
  );
}
