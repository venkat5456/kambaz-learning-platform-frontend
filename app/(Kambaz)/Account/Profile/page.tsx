
"use client";

import { FormControl, Button } from "react-bootstrap";

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="p-3">
      <h1>Profile</h1>
      <FormControl
        id="wd-username"
        placeholder="username"
        defaultValue="alice"
        className="mb-2"
      /><br />
      <FormControl
        id="wd-password"
        placeholder="password"
        type="password"
        defaultValue="123"
        className="mb-2"
      /><br />
      <FormControl
        id="wd-firstname"
        placeholder="First Name"
        defaultValue="Alice"
        className="mb-2"
      /><br />
      <FormControl
        id="wd-lastname"
        placeholder="Last Name"
        defaultValue="Wonderland"
        className="mb-2"
      /><br />
      <FormControl
        id="wd-dob"
        type="date"
        defaultValue="2000-01-01"
        className="mb-2"
      /><br />
      <FormControl
        id="wd-email"
        type="email"
        placeholder="email"
        defaultValue="alice@wonderland.com"
        className="mb-2"
      /><br />
      <FormControl
        id="wd-role"
        placeholder="Role"
        defaultValue="User"
        className="mb-2"
      /><br />
      <Button
        id="wd-signout-btn"
        variant="danger"
        className="w-100 mt-2"
      >
        Signout
      </Button>
    </div>
  );
}
