"use client";

import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const USERS_API = `${HTTP_SERVER}/api/users`;


// CREATE USER (use signup, not generic createUser)
export const signup = async (credentials: any) => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/signup`,
    credentials
  );
  return response.data;
};

// SIGNIN
export const signin = async (credentials: any) => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/signin`,
    credentials
  );
  return response.data;
};

// SIGNOUT
export const signout = async () => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/signout`
  );
  return response.data;
};

// PROFILE (🔹 use GET instead of POST)
export const profile = async () => {
  const response = await axiosWithCredentials.get(
    `${USERS_API}/profile`
  );
  return response.data;
};

// UPDATE USER (🔹 will now match backend PUT route)
export const updateUser = async (userId: string, user: any) => {
  const response = await axiosWithCredentials.put(
    `${USERS_API}/${userId}`,
    user
  );
  return response.data;
};
