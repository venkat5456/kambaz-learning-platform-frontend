import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

// FETCH ALL TODOS
export const fetchTodos = async () => {
  const response = await axios.get(`${HTTP_SERVER}/lab5/todos`);
  return response.data;
};

// FETCH ONE TODO
export const fetchTodoById = async (id: string | number) => {
  const response = await axios.get(`${HTTP_SERVER}/lab5/todos/${id}`);
  return response.data;
};

// CREATE NEW TODO
export const createTodo = async () => {
  const response = await axios.get(`${HTTP_SERVER}/lab5/todos/create`);
  return response.data;
};

// DELETE TODO
export const deleteTodo = async (id: string | number) => {
  const response = await axios.get(
    `${HTTP_SERVER}/lab5/todos/${id}/delete`
  );
  return response.data;
};

// UPDATE TODO TITLE
export const updateTodoTitle = async (id: string | number, title: string) => {
  const response = await axios.get(
    `${HTTP_SERVER}/lab5/todos/${id}/title/${title}`
  );
  return response.data;
};

// UPDATE TODO COMPLETED
export const updateTodoCompleted = async (
  id: string | number,
  completed: boolean
) => {
  const response = await axios.get(
    `${HTTP_SERVER}/lab5/todos/${id}/completed/${completed}`
  );
  return response.data;
};

// UPDATE TODO DESCRIPTION
export const updateTodoDescription = async (
  id: string | number,
  description: string
) => {
  const response = await axios.get(
    `${HTTP_SERVER}/lab5/todos/${id}/description/${description}`
  );
  return response.data;
};
