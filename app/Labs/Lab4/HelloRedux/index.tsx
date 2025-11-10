"use client";

import { useSelector } from "react-redux";
import { RootState } from "../store"; // ✅ path from Lab4/HelloRedux to Lab4/store

export default function HelloRedux() {
  const { message } = useSelector((state: RootState) => state.helloReducer);

  return (
    <div id="wd-hello-redux" className="p-3 border rounded space-y-2">
      <h3>Hello Redux</h3>
      <h4>{message}</h4>
      <hr />
    </div>
  );
}