import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const TODOS_API = `${HTTP_SERVER}/lab5/todos`;
const ASSIGNMENT_API = `${HTTP_SERVER}/lab5/assignment`;

// Types
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  editing?: boolean;
}

// ---------------------
// OLD LAB FUNCTIONS (NEEDED FOR HttpClient.tsx)
// ---------------------
export const fetchWelcomeMessage = async (): Promise<string> => {
  const response = await axios.get(`${HTTP_SERVER}/lab5/welcome`);
  return response.data;
};

export const fetchA = async (): Promise<string> => {
  const response = await axios.get(`${HTTP_SERVER}/lab5/a`);
  return response.data;
};

export const fetchB = async (): Promise<string> => {
  const response = await axios.get(`${HTTP_SERVER}/lab5/b`);
  return response.data;
};

export const fetchC = async (): Promise<string> => {
  const response = await axios.get(`${HTTP_SERVER}/lab5/c`);
  return response.data;
};

// ---------------------
// ASSIGNMENT (ASYNC OBJECTS)
// ---------------------
export const fetchAssignment = async () => {
  const response = await axios.get(ASSIGNMENT_API);
  return response.data;
};

export const updateTitle = async (title: string) => {
  const response = await axios.get(`${ASSIGNMENT_API}/title/${title}`);
  return response.data;
};

// ---------------------
// TODOS (ASYNC ARRAYS)
// ---------------------
export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await axios.get(TODOS_API);
  return response.data;
};

// GET delete (old)
export const removeTodo = async (todo: Todo): Promise<Todo[]> => {
  const response = await axios.get(`${TODOS_API}/${todo.id}/delete`);
  return response.data;
};

// DELETE
export const deleteTodo = async (todo: Todo): Promise<Todo[]> => {
  const response = await axios.delete(`${TODOS_API}/${todo.id}`);
  return response.data;
};

// GET create (old)
export const createNewTodo = async (): Promise<Todo[]> => {
  const response = await axios.get(`${TODOS_API}/create`);
  return response.data;
};

// POST create
export const postNewTodo = async (
  todo: Pick<Todo, "title" | "completed">
): Promise<Todo> => {
  const response = await axios.post(TODOS_API, todo);
  return response.data;
};

// PUT update
export const updateTodo = async (todo: Todo): Promise<Todo[]> => {
  const response = await axios.put(`${TODOS_API}/${todo.id}`, todo);
  return response.data;
};
