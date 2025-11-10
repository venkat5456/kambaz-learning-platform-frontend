"use client";

import { Button, ListGroupItem } from "react-bootstrap";

export default function TodoItem({
  todo,
  deleteTodo,
  setTodo,
}: {
  todo: { id: string; title: string };
  deleteTodo: (id: string) => void;
  setTodo: (todo: { id: string; title: string }) => void;
}) {
  return (
    <ListGroupItem key={todo.id} className="d-flex justify-content-between align-items-center">
      <div>{todo.title}</div>
      <div className="d-flex gap-2">
        <Button
          id="wd-delete-todo-click"
          variant="danger"
          onClick={() => deleteTodo(todo.id)}
        >
          Delete
        </Button>
        <Button
          id="wd-set-todo-click"
          variant="warning"
          onClick={() => setTodo(todo)}
        >
          Edit
        </Button>
      </div>
    </ListGroupItem>
  );
}