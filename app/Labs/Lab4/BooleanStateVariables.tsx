"use client";

import { useState } from "react";

export default function BooleanStateVariables() {
  // declare and initialize boolean state variable
  const [done, setDone] = useState(true);

  return (
    <div id="wd-boolean-state-variables" className="p-2">
      <h2>Boolean State Variables</h2>

      {/* render content based on boolean state */}
      <p>{done ? "Done" : "Not done"}</p>

      {/* handle checkbox change to toggle state */}
      <label className="form-control">
        <input
          type="checkbox"
          checked={done}
          onChange={() => setDone(!done)}
          id="wd-boolean-toggle"
        />{" "}
        Done
      </label>

      {/* conditional rendering based on boolean */}
      {done && (
        <div className="alert alert-success mt-2">
          Yay! You are done ✅
        </div>
      )}

      <hr />
    </div>
  );
}