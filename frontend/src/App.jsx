import React, { useState, useEffect } from "react";
import Checklist from "./components/Checklist";
import WaterTracker from "./components/WaterTracker";
import Scoreboard from "./components/Scoreboard";
import Countdown from "./components/Countdown";
import axios from "axios";

export default function App() {
  const [trackerData, setTrackerData] = useState(null);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/api/tracker");
    setTrackerData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const resetData = async () => {
    await axios.post("http://localhost:5000/api/tracker/reset");
    fetchData();
  };

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
