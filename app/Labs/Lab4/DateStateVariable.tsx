"use client";

import { useState, useEffect } from "react";
import { FormControl } from "react-bootstrap";

export default function DateStateVariable() {
  // initialize with null so server and client output match initially
  const [startDate, setStartDate] = useState<Date | null>(null);

  // set the date after the component mounts on the client
  useEffect(() => {
    setStartDate(new Date());
  }, []);

  // utility function to convert Date object to YYYY-MM-DD
  const dateObjectToHtmlDateString = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // wait until date is set before rendering content
  if (!startDate) return null;

  return (
    <div id="wd-date-state-variables" className="p-2">
      <h2>Date State Variables</h2>

      {/* display raw date object */}
      <h3>{JSON.stringify(startDate)}</h3>

      {/* display in YYYY-MM-DD format */}
      <h3>{dateObjectToHtmlDateString(startDate)}</h3>

      {/* HTML date input bound to state */}
      <FormControl
        type="date"
        value={dateObjectToHtmlDateString(startDate)}
        onChange={(e) => setStartDate(new Date(e.target.value))}
        id="wd-date-picker"
      />

      <hr />
    </div>
  );
}