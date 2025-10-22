"use client";

import { useParams } from "next/navigation";
import * as db from "../../../Database";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";

export default function ModulesPage() {
  const { cid } = useParams();               // e.g. "CS1234"
  const modules = db.modules;                // all modules from modules.json

  // 🔹 filter modules for the selected course
  const filteredModules = modules.filter((m: any) => m.course === cid);

  return (
    <div className="p-3">
      <ModulesControls />
      <br />
      <br />
      <br />
      <br />

      <ListGroup className="rounded-0" id="wd-modules">
        {filteredModules.length === 0 ? (
          <p>No modules found for this course.</p>
        ) : (
          filteredModules.map((module: any, index: number) => (
            <ListGroupItem
              key={index}
              className="wd-module p-0 mb-5 fs-5 border-gray"
            >
              {/* Module title */}
              <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center text-white">
                <div>
                  <BsGripVertical className="me-2 fs-3" /> {module.name}
                </div>
                <ModuleControlButtons />
              </div>

              {/* Lessons inside the module */}
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson: any, i: number) => (
                  <ListGroupItem
                    key={i}
                    className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <BsGripVertical className="me-2 fs-3" /> {lesson.name}
                    </div>
                    <LessonControlButtons />
                  </ListGroupItem>
                ))}
              </ListGroup>
            </ListGroupItem>
          ))
        )}
      </ListGroup>
    </div>
  );
}