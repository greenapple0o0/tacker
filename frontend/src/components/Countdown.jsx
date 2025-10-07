import React, { useEffect, useState } from "react";

export default function Countdown({ lastReset, onReset }) {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const nextReset = new Date(lastReset);
      nextReset.setDate(nextReset.getDate() + 1);
      const diff = nextReset - new Date();
      setTimeLeft(diff > 0 ? diff : 0);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [lastReset]);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="countdown">
      <h2>Next Reset In: {formatTime(timeLeft)}</h2>
      {timeLeft === 0 && <button onClick={onReset}>Reset Now</button>}
    </div>
  );
}
