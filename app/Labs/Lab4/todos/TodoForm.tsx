"use client";

import { Button, FormControl, ListGroupItem } from "react-bootstrap";

export default function TodoForm({
  todo,
  setTodo,
  addTodo,
  updateTodo,
}: {
  todo: { id: string; title: string };
  setTodo: (todo: { id: string; title: string }) => void;
  addTodo: (todo: { id: string; title: string }) => void;
  updateTodo: (todo: { id: string; title: string }) => void;
}) {
  return (
    <ListGroupItem className="d-flex flex-column gap-2">
      <div className="d-flex gap-2">
        <Button
          id="wd-add-todo-click"
          variant="primary"
          onClick={() => addTodo(todo)}
        >
          Add
        </Button>
        <Button
          id="wd-update-todo-click"
          variant="success"
          onClick={() => updateTodo(todo)}
        >
          Update
        </Button>
        <FormControl
          value={todo.title}
          placeholder="Enter todo title"
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
        />
      </div>
    </ListGroupItem>
  );
}