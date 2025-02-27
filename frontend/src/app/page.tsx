"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css"; // Import external CSS

const API_URL = "http://localhost:3001/todos";

type Todo = {
  id: number;
  task: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTask, setEditTask] = useState<string>("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      if (Array.isArray(response.data)) {
        setTodos(response.data);
      } else {
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleAdd = async () => {
    if (!task.trim()) return;
    try {
      await axios.post(API_URL, { task });
      setTask("");
      fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleEdit = async (id: number) => {
    if (!editTask.trim()) return;
    try {
      await axios.put(`${API_URL}/${id}`, { task: editTask });
      setEditingId(null);
      setEditTask("");
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDelete = async (id: number) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this task?");
    if (!isConfirmed) return;
  
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };
  

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>

      {/* Input Field */}
      <div className="input-group">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task"
        />
        <button className="add-btn" onClick={handleAdd}>Add</button>
      </div>

      {/* To-Do List */}
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            {editingId === todo.id ? (
              <>
                <input
                  className="edit-input"
                  value={editTask}
                  onChange={(e) => setEditTask(e.target.value)}
                />
                <button className="save-btn" onClick={() => handleEdit(todo.id)}>Save</button>
                <button className="cancel-btn" onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span className="todo-text">{todo.task}</span>
                <div className="button-group">
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setEditingId(todo.id);
                      setEditTask(todo.task);
                    }}
                  >
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(todo.id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
