import React from "react";

export default function Checklist({ tasks, refresh }) {
  const toggleTask = async (taskId) => {
    await fetch(`/api/tracker/tasks/${taskId}`, { method: "POST" });
    refresh();
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
