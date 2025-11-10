"use client";

import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { RootState } from "../../../store";
import {
  addModule,
  deleteModule,
  editModule,
  updateModule,
} from "./reducer";
import React, { useState } from "react";

// ✅ Define Lesson and Module interfaces
interface Lesson {
  _id?: string;
  name: string;
}

interface Module {
  _id: string;
  name: string;
  course: string | string[] | undefined;
  editing?: boolean;
  lessons?: Lesson[];
}

export default function ModulesPage() {
  const { cid } = useParams(); // e.g., "CS1234"
  const dispatch = useDispatch();

  // ✅ Access global modules state from Redux
  const { modules } = useSelector((state: RootState) => state.modulesReducer);

  // ✅ Local state for module input only
  const [moduleName, setModuleName] = useState<string>("");

  return (
    <div className="p-3 wd-modules">
      {/* ✅ Top control bar */}
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={() => {
          dispatch(addModule({ name: moduleName, course: cid }));
          setModuleName("");
        }}
      />
      <br />
      <br />

      {/* ✅ Render modules */}
      <ListGroup id="wd-modules" className="rounded-0">
        {(modules as Module[])
          .filter((module) => module.course === cid)
          .map((module) => (
            <ListGroupItem
              key={module._id}
              className="wd-module p-0 mb-5 fs-5 border-gray"
            >
              {/* Module header */}
              <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center text-white">
                {/* Left side: show name or editable input */}
                <div className="d-flex align-items-center w-100">
                  <BsGripVertical className="me-2 fs-3" />
                  {!module.editing && <span>{module.name}</span>}
                  {module.editing && (
                    <FormControl
                      className="w-50 d-inline-block"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        dispatch(
                          updateModule({ ...module, name: e.target.value })
                        )
                      }
                      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === "Enter") {
                          dispatch(
                            updateModule({ ...module, editing: false })
                          );
                        }
                      }}
                      defaultValue={module.name}
                    />
                  )}
                </div>

                {/* Right side: control icons */}
                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={(moduleId) => dispatch(deleteModule(moduleId))}
                  editModule={(moduleId) => dispatch(editModule(moduleId))}
                />
              </div>

              {/* Lessons section */}
              {module.lessons && module.lessons.length > 0 ? (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson: Lesson, i: number) => (
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
              ) : (
                <p className="p-3 text-muted mb-0">
                  No lessons found in this module.
                </p>
              )}
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}