
"use client";

import Link from "next/link";
import { redirect } from "next/dist/client/components/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as db from "../../Database";
import { FormControl, Button } from "react-bootstrap";

// ✅ Define consistent User type
interface User {
  _id?: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: "USER" | "ADMIN" | "FACULTY" | "STUDENT";
}

// ✅ Define credentials type for signin form
interface Credentials {
  username: string;
  password: string;
}

export default function Signin() {
  const [credentials, setCredentials] = useState<Credentials>({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();

  const signin = (): void => {
    // find user in db.users that matches credentials
    const user = (db.users as User[]).find(
      (u) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );

    // if no user found, stop
    if (!user) {
      alert("Invalid username or password");
      return;
    }

    // store user in Redux and go to Dashboard
    dispatch(setCurrentUser(user));
    redirect("/Dashboard");
  };

  return (
    <div id="wd-signin-screen" className="p-3" style={{ maxWidth: "300px" }}>
      <h1 className="mb-4">Sign In</h1>

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
        id="wd-signin-btn"
        className="btn btn-primary w-100 mb-2"
        onClick={signin}
      >
        Sign In
      </Button>

      <div className="text-center">
        <Link id="wd-signup-link" href="/Account/Signup">
          Sign Up
        </Link>
      </div>
    </div>
  );
}