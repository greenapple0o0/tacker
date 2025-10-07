import React from "react";

export default function Scoreboard({ scores }) {
  return (
    <div className="scoreboard">
      <h2>Scoreboard</h2>
      <p>Person1: {scores.person1}</p>
      <p>Person2: {scores.person2}</p>
    </div>
  );
}
