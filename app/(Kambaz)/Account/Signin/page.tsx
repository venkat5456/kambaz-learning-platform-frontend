
"use client";

import { useRouter } from "next/navigation";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

export default function Signin() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/Dashboard"); 
  };

  return (
    <div id="wd-signin-screen" className="p-3" style={{ maxWidth: "300px" }}>
      <h1 className="mb-4">Sign in</h1>

      <Form onSubmit={handleSubmit}>
        <FormControl
          id="wd-username"
          placeholder="username"
          className="mb-2"
        />
        <FormControl
          id="wd-password"
          placeholder="password"
          type="password"
          className="mb-2"
        />

        <Button
          id="wd-signin-btn"
          type="submit"
          className="btn btn-primary w-100 mb-2"
        >
          Sign in
        </Button>

        <div className="text-center">
          <a id="wd-signup-link" href="/Account/Signup">
            Sign up
          </a>
        </div>
      </Form>
    </div>
  );
}
