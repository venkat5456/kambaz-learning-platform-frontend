"use client";

import { useState } from "react";
import { FormControl } from "react-bootstrap";

export default function ObjectStateVariable() {

  const [person, setPerson] = useState({ name: "Peter", age: 24 });

  return (
    <div id="wd-object-state-variables" className="p-2">
      <h2>Object State Variables</h2>

      {/* display raw JSON */}
      <pre>{JSON.stringify(person, null, 2)}</pre>

      {/* update name */}
      <FormControl
        type="text"
        value={person.name}
        onChange={(e) => setPerson({ ...person, name: e.target.value })}
        id="wd-object-name"
        className="mb-2"
      />

      {/* update age */}
      <FormControl
        type="number"
        value={person.age}
        onChange={(e) =>
          setPerson({ ...person, age: parseInt(e.target.value) || 0 })
        }
        id="wd-object-age"
      />

      <hr />
    </div>
  );
}
