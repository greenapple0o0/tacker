import React, { useState, useEffect } from "react";
import Checklist from "./components/Checklist";
import WaterTracker from "./components/WaterTracker";
import Scoreboard from "./components/Scoreboard";
import Countdown from "./components/Countdown";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "https://tracker-6zxo.onrender.com/api";

export default function App() {
  const [trackerData, setTrackerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching from:', `${API_BASE}/tracker`);
      const res = await axios.get(`${API_BASE}/tracker`);
      console.log('API Response:', res.data);
      
      // ✅ SAFE DATA VALIDATION
      const safeData = {
        scores: res.data.scores || { person1: 0, person2: 0 },
        tasks: Array.isArray(res.data.tasks) ? res.data.tasks : [],
        water: res.data.water || { person1: 0, person2: 0 },
        lastReset: res.data.lastReset || new Date().toISOString()
      };
      
      setTrackerData(safeData);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch data:", err);
      setError("Failed to load data from server");
      setLoading(false);
      // Set safe fallback data
      setTrackerData({
        scores: { person1: 0, person2: 0 },
        tasks: [],
        water: { person1: 0, person2: 0 },
        lastReset: new Date().toISOString()
      });
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

  // ✅ EXTRA SAFETY CHECK before rendering
  if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>;
  if (error) return <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>{error}</div>;
  
  // Ensure trackerData exists and has the required structure
  if (!trackerData) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>No data available</div>;
  }

  // ✅ SAFE DESTRUCTURING with defaults
  const { 
    scores = { person1: 0, person2: 0 }, 
    tasks = [], 
    water = { person1: 0, person2: 0 }, 
    lastReset = new Date().toISOString() 
  } = trackerData || {};

  return (
    <div className="app-container" style={{ padding: '20px' }}>
      <h1>2-Person Competitive Tracker</h1>
      
      <Countdown lastReset={lastReset} onReset={resetData} />
      <Scoreboard scores={scores} />
      <Checklist tasks={tasks} refresh={fetchData} />
      <WaterTracker water={water} refresh={fetchData} />
    </div>
  );
}