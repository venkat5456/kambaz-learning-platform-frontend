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
  setModules
} from "./reducer";
import * as client from "../../client";
import React, { useState, useEffect } from "react";

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
  const { cid } = useParams();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY"; // 🔒 ROLE CHECK

  const { modules } = useSelector((state: RootState) => state.modulesReducer);
  const [moduleName, setModuleName] = useState<string>("");

  const fetchModules = async () => {
    if (!cid) return;
    const fetchedModules = await client.findModulesForCourse(cid as string);
    dispatch(setModules(fetchedModules));
  };

  useEffect(() => {
    fetchModules();
  }, [cid]);

  const onCreateModuleForCourse = async () => {
    if (!isFaculty) return alert("❌ Students cannot create modules!");
    if (!cid) return;
    const newModule = await client.createModuleForCourse(cid as string, {
      name: moduleName,
    });
    dispatch(setModules([...modules, newModule]));
    setModuleName("");
  };

  const onUpdateModule = async (module: any) => {
    if (!isFaculty) return alert("❌ Students cannot update modules!");
    await client.updateModule(module);
    dispatch(
      setModules(modules.map((m: any) => (m._id === module._id ? module : m)))
    );
  };

  const onRemoveModule = async (moduleId: string) => {
    if (!isFaculty) return alert("❌ Students cannot delete modules!");
    await client.deleteModule(moduleId);
    dispatch(setModules(modules.filter((m: any) => m._id !== moduleId)));
  };

  return (
    <div className="p-3 wd-modules">
      {/* 🔒 Hide Add Module UI for students */}
      {isFaculty && (
        <ModulesControls
          moduleName={moduleName}
          setModuleName={setModuleName}
          addModule={onCreateModuleForCourse}
        />
      )}
      <br /><br />

      <ListGroup id="wd-modules" className="rounded-0">
        {(modules as Module[]).map((module) => (
          <ListGroupItem
            key={module._id}
            className="wd-module p-0 mb-5 fs-5 border-gray"
          >
            <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center text-white">
              <div className="d-flex align-items-center w-100">
                <BsGripVertical className="me-2 fs-3" />

                {!module.editing && <span>{module.name}</span>}

                {module.editing && isFaculty && ( // 🔒 students cannot edit
                  <FormControl
                    className="w-50 d-inline-block"
                    value={module.name}
                    onChange={(e) =>
                      dispatch(updateModule({ ...module, name: e.target.value }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        onUpdateModule({ ...module, editing: false });
                      }
                    }}
                  />
                )}
              </div>

              {/* 🔒 Hide edit/delete buttons for students */}
              {isFaculty && (
                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={() => onRemoveModule(module._id)}
                  editModule={() => dispatch(editModule(module._id))}
                />
              )}
            </div>

            {module.lessons?.length ? (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson: Lesson, i: number) => (
                  <ListGroupItem key={i} className="wd-lesson p-3 ps-1">
                    <BsGripVertical className="me-2 fs-3" />
                    {lesson.name}

                    {/* Optional: You may hide lesson controls for students too */}
                    {isFaculty && <LessonControlButtons />}
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
