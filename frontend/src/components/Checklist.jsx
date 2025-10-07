import React from "react";
import axios from "axios";

export default function Checklist({ tasks, refresh }) {
  const toggleTask = async (id, person) => {
    await axios.post(`http://localhost:5000/api/tracker/task/${id}/${person}`);
    refresh();
  };

  return (
    <div className="checklist">
      <h2>Checklist</h2>
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Person 1</th>
            <th>Person 2</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task._id || task.id}>
              <td>{task.name}</td>
              <td>
                <input
                  type="checkbox"
                  checked={task.person1}
                  onChange={() => toggleTask(task._id || task.id, "person1")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={task.person2}
                  onChange={() => toggleTask(task._id || task.id, "person2")}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
