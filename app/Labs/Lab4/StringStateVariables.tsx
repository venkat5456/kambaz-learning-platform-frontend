"use client";

import { useState } from "react";
import { FormControl } from "react-bootstrap";

export default function StringStateVariables() {
  // declare and initialize string state variable
  const [firstName, setFirstName] = useState("John");

  return (
    <div id="wd-string-state-variables" className="p-2">
      <h2>String State Variables</h2>

      {/* render string state variable */}
      <p>{firstName}</p>

      {/* initialize text input field with the state variable
          update state variable at each keystroke */}
      <FormControl
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        id="wd-string-input"
      />

      <hr />
    </div>
  );
}