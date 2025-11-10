"use client";

import { useState } from "react";
import ChildStateComponent from "./ChildStateComponent";

export default function ParentStateComponent() {
  const [counter, setCounter] = useState(123);

  return (
    <div id="wd-parent-state-component" className="p-3 border rounded">
      <h2>Parent State Component</h2>
      <h3>Counter {counter}</h3>

      {/* Pass references to child */}
      <ChildStateComponent counter={counter} setCounter={setCounter} />

      <hr />
    </div>
  );
}