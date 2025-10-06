"use client";

import { FaCheckCircle, FaCircle } from "react-icons/fa";

export default function GreenCheckmark() {
  return (
    <span className="me-1 position-relative d-inline-block" style={{ width: "1rem", height: "1rem" }}>
      {/* Green checkmark (front) */}
      <FaCheckCircle
        className="text-success position-absolute fs-5"
        style={{ top: "0px", left: "0px" }}
      />
      {/* White circle underneath (background) */}
      <FaCircle className="text-white fs-6" />
    </span>
  );
}
