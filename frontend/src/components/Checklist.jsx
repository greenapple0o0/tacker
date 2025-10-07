import React from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;

export default function Checklist({ tasks, refresh }) {
  const toggleTask = async (taskId) => {
    try {
      await axios.post(`${API_BASE}/tasks/toggle`, { id: taskId });
      refresh();
    } catch (err) {
      console.error("Failed to toggle task:", err);
    }
  };

  return (
    <div className="checklist">
      <h2>Tasks</h2>
      {tasks.map((task) => (
        <div key={task.id}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
          />
          {task.name} ({task.person})
        </div>
      ))}
    </div>
  );
}
