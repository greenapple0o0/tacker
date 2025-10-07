import React from 'react';

const Checklist = ({ tasks = [], refresh }) => {
  // ✅ Always provide default empty array
  const safeTasks = tasks || [];

  return (
    <div className="checklist">
      <h2>Daily Tasks</h2>
      {safeTasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        safeTasks.map(task => (  // ✅ Now safe to use .map()
          <div key={task.id} className="task-item">
            <input 
              type="checkbox" 
              checked={task.completed || false}
              onChange={() => {/* handle change */}}
            />
            <span>{task.text || 'Unnamed task'}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default Checklist;