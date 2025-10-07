import React, { useState, useEffect } from "react";

export default function Countdown({ lastReset, onReset }) {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const calculateTime = () => {
      const nextReset = new Date(lastReset);
      nextReset.setDate(nextReset.getDate() + 1);
      return Math.max(0, nextReset - new Date());
    };

    setTimeLeft(calculateTime());

    const interval = setInterval(() => {
      const t = calculateTime();
      setTimeLeft(t);

      if (t <= 0) {
        onReset();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastReset, onReset]);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const s = String(totalSeconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return <div className="countdown">Time until reset: {formatTime(timeLeft)}</div>;
}
