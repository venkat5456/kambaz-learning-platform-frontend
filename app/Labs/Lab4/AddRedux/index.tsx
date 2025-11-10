"use client";

import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { add } from "./addReducer";
import { RootState } from "../store";

export default function AddRedux() {
  const [a, setA] = useState(12);
  const [b, setB] = useState(23);
  const { sum } = useSelector((state: RootState) => state.addReducer);
  const dispatch = useDispatch();

  return (
    <div id="wd-add-redux" className="p-3 border rounded space-y-2">
      <h3>Add Redux</h3>
      <h4>
        {a} + {b} = {sum}
      </h4>

      <div className="flex flex-col gap-2 w-32">
        <input
          type="number"
          value={a}
          onChange={(e) => setA(parseInt(e.target.value))}
          className="border px-2 py-1 rounded"
        />
        <input
          type="number"
          value={b}
          onChange={(e) => setB(parseInt(e.target.value))}
          className="border px-2 py-1 rounded"
        />
        <button
          id="wd-add-redux-click"
          className="border px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
          onClick={() => dispatch(add({ a, b }))}
        >
          Add Redux
        </button>
      </div>

      <hr />
    </div>
  );
}