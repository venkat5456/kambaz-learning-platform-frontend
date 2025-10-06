"use client";

import { Button } from "react-bootstrap";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaEllipsisV, FaPlus, FaGripVertical } from "react-icons/fa";

export default function Modules() {
  return (
    <div id="wd-modules" className="p-3">
      {/* Toolbar */}
      <div className="d-flex justify-content-end mb-3 gap-2">
        <Button variant="secondary" size="sm">Collapse All</Button>
        <Button variant="secondary" size="sm">View Progress</Button>
        <Button variant="secondary" size="sm">Publish All</Button>
        <Button variant="danger" size="sm">+ Module</Button>
      </div>

      {/* Week 1 */}
      <div className="border rounded mb-3">
        <div className="p-2 bg-light border-bottom d-flex justify-content-between align-items-center">
          <span><FaGripVertical className="me-2 text-muted" /> <strong>Week 1, Lecture 1 - Course Introduction, Syllabus, Agenda</strong></span>
          <span>
            <GreenCheckmark /> 
            <FaPlus className="ms-3 text-muted" /> 
            <FaEllipsisV className="ms-3 text-muted" />
          </span>
        </div>

        <ul className="list-group list-group-flush">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span><FaGripVertical className="me-2 text-muted" /> LEARNING OBJECTIVES</span>
            <GreenCheckmark />
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span><FaGripVertical className="me-2 text-muted" /> Introduction to the course</span>
            <GreenCheckmark />
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span><FaGripVertical className="me-2 text-muted" /> Learn what is Web Development</span>
            <GreenCheckmark />
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span><FaGripVertical className="me-2 text-muted" /> READING</span>
            <GreenCheckmark />
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span><FaGripVertical className="me-2 text-muted" /> Full Stack Developer - Chapter 1 - Introduction</span>
            <GreenCheckmark />
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span><FaGripVertical className="me-2 text-muted" /> Full Stack Developer - Chapter 2 - Creating User Interfaces with HTML</span>
            <GreenCheckmark />
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span><FaGripVertical className="me-2 text-muted" /> SLIDES</span>
            <GreenCheckmark />
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center text-danger">
            <span><FaGripVertical className="me-2 text-muted" /> Introduction to Web Development</span>
            <GreenCheckmark />
          </li>
        </ul>
      </div>

      {/* Week 2 */}
      <div className="border rounded mb-3">
        <div className="p-2 bg-light border-bottom d-flex justify-content-between align-items-center">
          <span><FaGripVertical className="me-2 text-muted" /> <strong>Week 2</strong></span>
          <span>
            <GreenCheckmark /> 
            <FaPlus className="ms-3 text-muted" /> 
            <FaEllipsisV className="ms-3 text-muted" />
          </span>
        </div>

        <ul className="list-group list-group-flush">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span><FaGripVertical className="me-2 text-muted" /> LEARNING OBJECTIVES</span>
            <GreenCheckmark />
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span><FaGripVertical className="me-2 text-muted" /> LESSON 1</span>
            <GreenCheckmark />
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span><FaGripVertical className="me-2 text-muted" /> LESSON 2</span>
            <GreenCheckmark />
          </li>
        </ul>
      </div>
    </div>
  );
}
