import React from "react";

export default function Scoreboard({ scores }) {
  return (
    <div className="scoreboard">
      <h2>Scoreboard</h2>
      <div>
        Person 1: {scores.person1 || 0} | Person 2: {scores.person2 || 0}
      </div>
    </div>
  );
}
