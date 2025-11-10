"use client";

import { useState } from "react";
import type { MouseEvent } from "react";

interface SimpleEvent {
  type: string;
  timeStamp: number;
  target: string;
  [key: string]: unknown; // allows extra keys if needed
}

export default function EventObject() {
  const [event, setEvent] = useState<SimpleEvent | null>(null);

  const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
    const simplified: SimpleEvent = {
      type: e.type,
      timeStamp: e.timeStamp,
      target: (e.target as HTMLElement).outerHTML,
    };
    setEvent(simplified);
  };

  return (
    <div id="wd-event-object">
      <h2>Event Object</h2>
      <button
        onClick={handleClick}
        className="btn btn-primary"
        id="wd-display-event-obj-click"
      >
        Display Event Object
      </button>
      <pre>{JSON.stringify(event, null, 2)}</pre>
      <hr />
    </div>
  );
}