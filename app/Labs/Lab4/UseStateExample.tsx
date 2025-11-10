"use client";

import { useState } from "react";

export default function UseStateExample() {
  // declare a state variable called count and a setter setCount
  const [count, setCount] = useState(0);

  // event handler to increment count
  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div id="wd-use-state">
      <h2>useState Example</h2>
      <p>Current count: {count}</p>
      <button
        onClick={handleClick}
        className="btn btn-primary"
        id="wd-increment-click"
      >
        Increment
      </button>
      <hr />
    </div>
  );
}