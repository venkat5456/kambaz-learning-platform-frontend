"use client";

import { useState } from "react";
import { ListGroup } from "react-bootstrap";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";


interface Todo {
  id: string;
  title: string;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" },
  ]);

  const [todo, setTodo] = useState<Todo>({ id: "-1", title: "Learn Mongo" });

  
  const addTodo = (todo: Todo): void => {
    const newTodos: Todo[] = [
      ...todos,
      { ...todo, id: new Date().getTime().toString() },
    ];
    setTodos(newTodos);
    setTodo({ id: "-1", title: "" });
  };

  
  const deleteTodo = (id: string): void => {
    const newTodos = todos.filter((t) => t.id !== id);
    setTodos(newTodos);
  };

  
  const updateTodo = (updated: Todo): void => {
    const newTodos: Todo[] = todos.map((t) =>
      t.id === updated.id ? updated : t
    );
    setTodos(newTodos);
    setTodo({ id: "-1", title: "" });
  };

  return (
    <div id="wd-todo-list-redux" className="p-3 border rounded space-y-3 w-75">
      <h2>Todo List</h2>
      <ListGroup>
        {/* ✅ TodoForm at the top */}
        <TodoForm
          todo={todo}
          setTodo={setTodo}
          addTodo={addTodo}
          updateTodo={updateTodo}
        />

        {/* ✅ Render TodoItem for each todo */}
        {todos.map((t) => (
          <TodoItem
            key={t.id}
            todo={t}
            deleteTodo={deleteTodo}
            setTodo={setTodo}
          />
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}