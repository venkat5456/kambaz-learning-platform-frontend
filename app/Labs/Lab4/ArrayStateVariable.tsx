"use client";

import { useState } from "react";

export default function ArrayStateVariable() {
  // declare array state
  const [array, setArray] = useState<number[]>([1, 2, 3, 4, 5]);

  // event handler appends random number at end of array
  const addElement = (): void => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };

  // event handler removes element by index
  const deleteElement = (index: number): void => {
    setArray(array.filter((_, i) => i !== index));
  };

  return (
    <div id="wd-array-state-variables" className="p-2">
      <h2>Array State Variables</h2>

      {/* green Add Element button */}
      <button
        onClick={addElement}
        className="btn btn-success mb-3"
        id="wd-add-element"
      >
        Add Element
      </button>

      {/* iterate over array items */}
      <ul className="list-group">
        {array.map((item, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>{item}</span>
            <button
              onClick={() => deleteElement(index)}
              className="btn btn-danger btn-sm"
              id={`wd-delete-${index}`}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <hr />
    </div>
  );
}