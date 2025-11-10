"use client";

import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./counterReducer";
import { RootState } from "../store";

export default function CounterRedux() {
  const { count } = useSelector((state: RootState) => state.counterReducer);
  const dispatch = useDispatch();

  return (
    <div id="wd-counter-redux" className="p-3 border rounded space-y-2">
      <h3>Counter Redux</h3>
      <h4>{count}</h4>
      <div className="flex gap-2">
        <button
          id="wd-counter-redux-increment-click"
          className="border px-3 py-1 rounded"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <button
          id="wd-counter-redux-decrement-click"
          className="border px-3 py-1 rounded"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
      <hr />
    </div>
  );
}