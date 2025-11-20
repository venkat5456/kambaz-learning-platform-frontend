"use client";

import axios from "axios";

// User Type Definition
export interface User {
  _id?: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  dob?: string;
  role?: "STUDENT" | "FACULTY" | "USER"; // update if you have more roles
}

const axiosWithCredentials = axios.create({ withCredentials: true });

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const USERS_API = `${HTTP_SERVER}/api/users`;

// SIGNUP
export const signup = async (credentials: User): Promise<User> => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/signup`,
    credentials
  );
  return response.data;
};

// SIGNIN
export const signin = async (credentials: Pick<User, "username" | "password">): Promise<User> => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/signin`,
    credentials
  );
  return response.data;
};

// SIGNOUT
export const signout = async (): Promise<void> => {
  await axiosWithCredentials.post(`${USERS_API}/signout`);
};

// PROFILE
export const profile = async (): Promise<User> => {
  const response = await axiosWithCredentials.get(`${USERS_API}/profile`);
  return response.data;
};

// UPDATE USER
export const updateUser = async (
  userId: string,
  user: Record<string, unknown>
) => {
  const response = await axiosWithCredentials.put(
    `${USERS_API}/${userId}`,
    user
  );
  return response.data;
};
