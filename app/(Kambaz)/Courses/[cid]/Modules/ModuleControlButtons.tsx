"use client";

import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";

export default function ModuleControlButtons({
  moduleId,
  deleteModule,
  editModule,
}: {
  moduleId: string;
  deleteModule: (moduleId: string) => void;
  editModule: (moduleId: string) => void;
}) {
  return (
    <div className="float-end d-flex align-items-center">
      {/* ✏️ Edit icon */}
      <FaPencil
        onClick={() => editModule(moduleId)}
        className="text-primary fs-5 me-3"
        style={{ cursor: "pointer" }}
      />

      {/* 🗑️ Delete icon */}
      <FaTrash
        onClick={() => deleteModule(moduleId)}
        className="text-danger fs-5 me-3"
        style={{ cursor: "pointer" }}
      />

      {/* ✅ Checkmark, ➕, ⋮ icons */}
      <GreenCheckmark />
      <BsPlus className="fs-4 text-light ms-3 me-3" />
      <IoEllipsisVertical className="fs-4 text-light" />
    </div>
  );
}