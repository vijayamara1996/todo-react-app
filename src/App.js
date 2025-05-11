import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const addTask = () => {
    if (input.trim() === '') return;
    if (editIndex !== null) {
      const updated = [...tasks];
      updated[editIndex].text = input;
      setTasks(updated);
      setEditIndex(null);
    } else {
      setTasks([...tasks, { text: input, completed: false }]);
    }
    setInput('');
  };

  const toggleComplete = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const editTask = (index) => {
    setInput(tasks[index].text);
    setEditIndex(index);
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  return (
    <div className="container p-4">
      <h2 className="text-center mb-4">TodoS</h2>
      <div className="mb-3">
        <h4>Create Task</h4>
        <div className="input-group">
          <input
            className="form-control"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What needs to be done?"
          />
          <button className="btn btn-primary" onClick={addTask}>
            {editIndex !== null ? 'Update' : 'Add'}
          </button>
        </div>
      </div>

      <h4>My Tasks</h4>
      <ul className="list-group">
        {tasks.map((task, index) => (
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
            key={index}
            style={{ backgroundColor: '#eaf6fd' }}
          >
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                checked={task.completed}
                onChange={() => toggleComplete(index)}
              />
              <label
                className={`form-check-label ms-2 ${
                  task.completed ? 'text-decoration-line-through text-muted' : ''
                }`}
              >
                {task.text}
              </label>
            </div>
            <div>
              <button
                className="btn btn-sm btn-outline-secondary me-2"
                onClick={() => editTask(index)}
              >
                ✏️
              </button>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => deleteTask(index)}
              >
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
