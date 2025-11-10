"use client";

import { useSelector } from "react-redux";
import { RootState } from "./store";
import HelloRedux from "./HelloRedux";
import CounterRedux from "./CounterRedux";
import AddRedux from "./AddRedux"; // ✅ new import

export default function ReduxExamples() {
  const message = useSelector((state: RootState) => state.helloReducer.message);

  return (
    <div id="wd-redux-examples" className="p-3 border rounded space-y-3">
      <h2>Redux Examples</h2>
      <p>This section demonstrates Redux state management.</p>
      <hr />

      <HelloRedux />
      <CounterRedux />
      <AddRedux /> {/* ✅ new addition */}

      <h3>Main ReduxExamples Component</h3>
      <p>{message}</p>
    </div>
  );
}