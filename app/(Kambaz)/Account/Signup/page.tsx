"use client";

import Link from "next/link";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import * as db from "../../Database";
import { redirect } from "next/dist/client/components/navigation";
import { v4 as uuidv4 } from "uuid";

// ✅ Define consistent Credential and User types
interface Credentials {
  username: string;
  password: string;
}

interface User {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  role: "USER" | "ADMIN" | "FACULTY" | "STUDENT";
}

export default function Signup() {
  // ✅ Replace `any` with specific Credentials type
  const [credentials, setCredentials] = useState<Credentials>({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();

  const signup = (): void => {
    // ✅ Create a new user object (typed)
    const newUser: User = {
      _id: uuidv4(),
      username: credentials.username,
      password: credentials.password,
      firstName: credentials.username,
      lastName: "",
      email: `${credentials.username}@example.com`,
      dob: "2000-01-01",
      role: "USER",
    };

    // ✅ Add the new user to in-memory DB
    (db.users as User[]).push(newUser);

    // ✅ Save the new user as current user in Redux
    dispatch(setCurrentUser(newUser));

    // ✅ Redirect to Dashboard
    redirect("/Dashboard");
  };

  return (
    <div id="wd-signup-screen" className="p-3" style={{ maxWidth: "300px" }}>
      <h1 className="mb-4">Sign Up</h1>

      <FormControl
        id="wd-username"
        placeholder="username"
        className="mb-2"
        value={credentials.username}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
      />

      <FormControl
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-2"
        value={credentials.password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />

      <Button
        id="wd-signup-btn"
        onClick={signup}
        className="btn btn-primary w-100 mb-2"
      >
        Sign Up
      </Button>

      <div className="text-center">
        <Link id="wd-signin-link" href="/Account/Signin">
          Sign In
        </Link>
      </div>
    </div>
  );
}
