import React, { useState, useEffect } from "react";
import Checklist from "./components/Checklist";
import WaterTracker from "./components/WaterTracker";
import Scoreboard from "./components/Scoreboard";
import Countdown from "./components/Countdown";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;

export default function App() {
  const [trackerData, setTrackerData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch tracker data from backend
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/tracker`);
      setTrackerData(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch data:", err);
      setLoading(false);
    }
  };

  // Reset tracker data (called when countdown reaches zero)
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

  if (loading || !trackerData) return <div>Loading...</div>;

  return (
    <div className="app-container">
      <h1>2-Person Competitive Tracker</h1>
      
      {/* Countdown timer */}
      <Countdown lastReset={trackerData.lastReset} onReset={resetData} />
      
      {/* Scoreboard */}
      <Scoreboard scores={trackerData.scores} />
      
      {/* Checklist tasks */}
      <Checklist tasks={trackerData.tasks} refresh={fetchData} />
      
      {/* Water tracker */}
      <WaterTracker water={trackerData.water} refresh={fetchData} />
    </div>
  );
}
