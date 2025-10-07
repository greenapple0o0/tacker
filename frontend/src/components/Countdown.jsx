import React, { useState, useEffect } from "react";

export default function Countdown({ lastReset, onReset }) {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const resetTime = new Date(lastReset);
      resetTime.setDate(resetTime.getDate() + 1);
      const diff = resetTime - now;
      if (diff <= 0) {
        onReset();
      } else {
        setTimeLeft(diff);
      }
    };

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();

    return () => clearInterval(interval);
  }, [lastReset, onReset]);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  return (
    <div className="countdown">
      <h2>Time left until next reset:</h2>
      <div>{formatTime(timeLeft)}</div>
    </div>
  );
}
