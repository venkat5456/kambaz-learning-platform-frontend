"use client";

import Link from "next/link";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { redirect } from "next/navigation";
import { setCurrentUser } from "../reducer";
import * as client from "../client";

export default function Signup() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();

  const signup = async () => {
    const newUser = await client.signup({
      username: credentials.username, // correct key
      password: credentials.password,
    });

    if (!newUser) {
      alert("Signup failed");
      return;
    }

    dispatch(setCurrentUser(newUser));
    redirect("/Dashboard");
  };

  return (
    <div id="wd-signup-screen" className="p-3" style={{ maxWidth: "300px" }}>
      <h1 className="mb-4">Sign Up</h1>

      <FormControl
        id="wd-username"
        placeholder="Username"
        className="mb-2"
        value={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
      />

      <FormControl
        id="wd-password"
        type="password"
        placeholder="Password"
        className="mb-2"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />

      <Button
        id="wd-signup-btn"
        className="btn btn-primary w-100 mb-2"
        onClick={signup}
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
