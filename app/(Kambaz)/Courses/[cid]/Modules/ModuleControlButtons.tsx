"use client";

import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import GreenCheckmark from "./GreenCheckmark";

export default function ModuleControlButtons() {
  return (
    <div className="float-end d-flex align-items-center">
      <GreenCheckmark />
      <BsPlus className="fs-4 text-muted ms-2" />
      <IoEllipsisVertical className="fs-4 text-muted ms-2" />
    </div>
  );
}
