import { ReactNode } from "react";

export default function Square({ children }: { children: ReactNode }) {
  const num = Number(children);
  return (
    <span id="wd-square" className="p-2">
      {num * num}
    </span>
  );
}