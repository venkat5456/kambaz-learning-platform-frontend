"use client";

import React, { useState } from "react";
import {
  fetchTodos,
  fetchTodoById,
  createTodo,
  deleteTodo,
  updateTodoTitle,
  updateTodoCompleted,
  updateTodoDescription,
} from "./todosClient";

export default function TodosClient() {
  const [todos, setTodos] = useState([]);
  const [todoId, setTodoId] = useState("1");
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newCompleted, setNewCompleted] = useState(false);

  // LOAD ALL TODOS
  const loadTodos = async () => {
    const data = await fetchTodos();
    setTodos(data);
  };

  // GET ONE TODO
  const getTodo = async () => {
    const todo = await fetchTodoById(todoId);
    alert(JSON.stringify(todo, null, 2));
  };

  // CREATE TODO
  const createNew = async () => {
    const updated = await createTodo();
    setTodos(updated);
  };

  const deleteOne = async () => {
  if (!todoId) return alert("Please enter a Todo ID");

  try {
    const updated = await deleteTodo(todoId);
    alert(`Deleted Todo with ID: ${todoId}`);
    setTodos(updated);
  } catch (err) {
    alert(`ERROR: Unable to delete Todo with ID: ${todoId}`);
  }
};


  // UPDATE TITLE
  const updateTitleClick = async () => {
    const updated = await updateTodoTitle(todoId, newTitle);
    setTodos(updated);
  };

  // UPDATE DESCRIPTION
  const updateDescriptionClick = async () => {
    const updated = await updateTodoDescription(todoId, newDescription);
    setTodos(updated);
  };

  // UPDATE COMPLETED
  const updateCompletedClick = async () => {
    const updated = await updateTodoCompleted(todoId, newCompleted);
    setTodos(updated);
  };

  return (
    <div>
      <h2>Async CRUD with Todos</h2>
      <hr />

      {/* LOAD TODOS */}
      <button className="btn btn-primary" onClick={loadTodos}>
        Load Todos
      </button>

      <ul>
        {todos.map((t: any) => (
          <li key={t.id}>
            {t.id}. {t.title} — completed: {t.completed ? "true" : "false"}
          </li>
        ))}
      </ul>

      <hr />

      {/* GET TODO BY ID */}
      <h3>Get Todo by ID</h3>
      <input
        value={todoId}
        onChange={(e) => setTodoId(e.target.value)}
        className="form-control w-25 mb-2"
      />
      <button className="btn btn-secondary" onClick={getTodo}>
        Get Todo
      </button>

      <hr />

      {/* CREATE TODO */}
      <h3>Create Todo</h3>
      <button className="btn btn-success" onClick={createNew}>
        Create New Todo
      </button>

      <hr />

      {/* DELETE TODO */}
      <h3>Delete Todo</h3>
      <button className="btn btn-danger" onClick={deleteOne}>
        Delete Todo
      </button>

      <hr />

      {/* UPDATE TITLE */}
      <h3>Update Todo Title</h3>
      <input
        placeholder="New Title"
        className="form-control w-50 mb-2"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <button className="btn btn-warning" onClick={updateTitleClick}>
        Update Title
      </button>

      <hr />

      {/* UPDATE DESCRIPTION */}
      <h3>Update Todo Description</h3>
      <input
        placeholder="New Description"
        className="form-control w-50 mb-2"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
      />
      <button className="btn btn-info" onClick={updateDescriptionClick}>
        Update Description
      </button>

      <hr />

      {/* UPDATE COMPLETED */}
      <h3>Update Completed Status</h3>
      <label className="me-2">
        <input
          type="checkbox"
          checked={newCompleted}
          onChange={(e) => setNewCompleted(e.target.checked)}
        />
        &nbsp;Completed?
      </label>
      <br />
      <button className="btn btn-dark mt-2" onClick={updateCompletedClick}>
        Update Completed
      </button>

      <hr />
    </div>
  );
}
