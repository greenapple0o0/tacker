import React from "react";

export default function Scoreboard({ scores }) {
  return (
    <div className="scoreboard">
      <h2>Leaderboard</h2>
      <p>Person 1: {scores.person1} pts</p>
      <p>Person 2: {scores.person2} pts</p>
      <p>
        Winner:{" "}
        {scores.person1 === scores.person2
          ? "Tie"
          : scores.person1 > scores.person2
          ? "Person 1"
          : "Person 2"}
      </p>
    </div>
  );
}
