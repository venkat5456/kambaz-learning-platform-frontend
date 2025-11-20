"use client";

import React, { useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";
import * as client from "./client";

interface Assignment {
  id?: number;
  title?: string;
  description?: string;
  due?: string;
  completed?: boolean;
}

export default function WorkingWithObjectsAsynchronously() {
  const [assignment, setAssignment] = useState<Assignment>({});

  const fetchAssignment = async (): Promise<void> => {
    const data = await client.fetchAssignment();
    setAssignment(data);
  };

  const updateTitle = async (title: string): Promise<void> => {
    const updated = await client.updateTitle(title);
    setAssignment(updated);
  };

  useEffect(() => {
    fetchAssignment();
  }, []);

  return (
    <div id="wd-asynchronous-objects">
      <h3>Working with Objects Asynchronously</h3>
      <h4>Assignment</h4>

      {/* Title */}
      <FormControl
        className="mb-2"
        value={assignment.title || ""}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />

      {/* Description */}
      <FormControl
        className="mb-2"
        rows={3}
        as="textarea"
        value={assignment.description || ""}
        onChange={(e) =>
          setAssignment({ ...assignment, description: e.target.value })
        }
      />

      {/* Due Date */}
      <FormControl
        className="mb-2"
        type="date"
        value={assignment.due || ""}
        onChange={(e) =>
          setAssignment({ ...assignment, due: e.target.value })
        }
      />

      {/* Completed Toggle */}
      <div className="form-check form-switch">
        <input
          id="wd-completed"
          type="checkbox"
          className="form-check-input"
          checked={assignment.completed || false}
          onChange={(e) =>
            setAssignment({
              ...assignment,
              completed: e.target.checked,
            })
          }
        />
        <label htmlFor="wd-completed" className="form-check-label">
          Completed
        </label>
      </div>

      {/* Submit */}
      <button
        className="btn btn-primary mt-2"
        onClick={() => updateTitle(assignment.title || "")}
      >
        Update Title
      </button>

      <pre>{JSON.stringify(assignment, null, 2)}</pre>
      <hr />
    </div>
  );
}
