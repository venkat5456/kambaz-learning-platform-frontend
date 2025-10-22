import { ListGroup } from "react-bootstrap";
import TodoItem from "./TodoItem";
import todos from "./todos.json";

export default function TodoList() {
  return (
    <div id="wd-todo-list" className="p-3">
      <h3>Todo List</h3>
      <ListGroup>
        {todos.map((todo, idx) => (
          <TodoItem key={idx} todo={todo} />
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}