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

// ✅ Add Todo type here to remove red underline
export interface Todo {
  id: string | number;
  title?: string;
  description?: string;
  completed?: boolean;
}

export default function TodosClient() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoId, setTodoId] = useState<string>("1");
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");
  const [newCompleted, setNewCompleted] = useState<boolean>(false);

  const loadTodos = async () => {
    const data = await fetchTodos();
    setTodos(data);
  };

  const getTodo = async () => {
    const todo = await fetchTodoById(todoId);
    alert(JSON.stringify(todo, null, 2));
  };

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
    } catch {
      alert(`ERROR: Unable to delete Todo with ID: ${todoId}`);
    }
  };

  const updateTitleClick = async () => {
    const updated = await updateTodoTitle(todoId, newTitle);
    setTodos(updated);
  };

  const updateDescriptionClick = async () => {
    const updated = await updateTodoDescription(todoId, newDescription);
    setTodos(updated);
  };

  const updateCompletedClick = async () => {
    const updated = await updateTodoCompleted(todoId, newCompleted);
    setTodos(updated);
  };

  return (
    <div>
      <h2>Async CRUD with Todos</h2>
      <hr />

      <button className="btn btn-primary" onClick={loadTodos}>
        Load Todos
      </button>

      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            {t.id}. {t.title} — completed: {t.completed ? "true" : "false"}
          </li>
        ))}
      </ul>

      <hr />

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

      <h3>Create Todo</h3>
      <button className="btn btn-success" onClick={createNew}>
        Create New Todo
      </button>

      <hr />

      <h3>Delete Todo</h3>
      <button className="btn btn-danger" onClick={deleteOne}>
        Delete Todo
      </button>

      <hr />

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
