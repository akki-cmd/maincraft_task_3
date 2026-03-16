import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Todo.css";

function Todo() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const res = await axios.get("/api/tasks");
      setTasks(res.data);
    } catch (error) {
      console.log("Error fetching tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add or update task
  const addTask = async () => {

    if (!title.trim()) return;

    try {

      if (editId) {
        await axios.put(`/api/tasks/${editId}`, { title });
        setEditId(null);
      } else {
        await axios.post("/api/tasks", { title });
      }

      setTitle("");
      fetchTasks();

    } catch (error) {
      console.log("Error saving task");
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.log("Error deleting task");
    }
  };

  // Edit task
  const editTask = (task) => {
    setTitle(task.title);
    setEditId(task._id);
  };

  return (

    <div className="todo-container">

      <div className="header">
        <h2>🚀 Task Manager</h2>
      </div>

      <div className="input-section">

        <input
          type="text"
          placeholder="Add new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button className="add-btn" onClick={addTask}>
          {editId ? "Update" : "Add"}
        </button>

      </div>

      <ul className="task-list">

        {tasks.map((task) => (

          <li key={task._id} className="task-item">

            <span className="task-title">{task.title}</span>

            <div className="actions">

              <button
                className="edit"
                onClick={() => editTask(task)}
              >
                Edit
              </button>

              <button
                className="delete"
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </button>

            </div>

          </li>

        ))}

      </ul>

      <div className="counter">
        Total Tasks: {tasks.length}
      </div>

    </div>

  );
}

export default Todo;