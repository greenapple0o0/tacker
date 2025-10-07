import React, { useState, useEffect } from "react";
import Checklist from "./components/Checklist";
import WaterTracker from "./components/WaterTracker";
import Scoreboard from "./components/Scoreboard";
import Countdown from "./components/Countdown";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function App() {
  const [trackerData, setTrackerData] = useState(null);

  const fetchData = async () => {
    try {
      const res = await axios.get(API_BASE);
      setTrackerData(res.data);
    } catch (err) {
      console.error("Failed to fetch tracker data:", err);
    }
  };

  const resetData = async () => {
    try {
      await axios.post(`${API_BASE}/reset`);
      fetchData();
    } catch (err) {
      console.error("Failed to reset data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!trackerData) return <div>Loading...</div>;

  return (
    <div className="app-container">
      <h1>2-Person Competitive Tracker</h1>
      <Countdown lastReset={trackerData.lastReset} onReset={resetData} />
      <Scoreboard scores={trackerData.scores} />
      <Checklist tasks={trackerData.tasks} refresh={fetchData} />
      <WaterTracker water={trackerData.water} refresh={fetchData} />
    </div>
  );
}
