"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "react-bootstrap";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import ModuleEditor from "./ModuleEditor";

export default function ModulesControls({
  moduleName,
  setModuleName,
  addModule,
}: {
  moduleName: string;
  setModuleName: (title: string) => void;
  addModule: () => void;
}) {
  // ✅ Modal visibility state
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  // 🧩 FIX: Clear input before showing modal
  const handleShow = () => {
    setModuleName(""); // ✅ clear previous text so modal starts blank
    setShow(true);
  };

  return (
    <div id="wd-modules-controls" className="text-nowrap mb-3">
      {/* ✅ Add Module Button — opens modal */}
      <Button
        variant="danger"
        size="lg"
        className="me-1 float-end"
        id="wd-add-module-btn"
        onClick={handleShow}
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Module
      </Button>

      {/* ✅ Publish All Dropdown */}
      <Dropdown className="float-end me-2">
        <DropdownToggle variant="secondary" size="lg" id="wd-publish-all-btn">
          <GreenCheckmark /> Publish All
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem id="wd-publish-all">
            <GreenCheckmark /> Publish All
          </DropdownItem>
          <DropdownItem id="wd-publish-all-modules-and-items">
            <GreenCheckmark /> Publish all modules and items
          </DropdownItem>
          <DropdownItem id="wd-publish-modules-only">
            <GreenCheckmark /> Publish modules only
          </DropdownItem>
          <DropdownItem id="wd-unpublish-all-modules-and-items">
            ❌ Unpublish all modules and items
          </DropdownItem>
          <DropdownItem id="wd-unpublish-modules-only">
            ❌ Unpublish modules only
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {/* ✅ View Progress & Collapse All */}
      <Button
        variant="secondary"
        size="lg"
        className="float-end me-2"
        id="wd-view-progress"
      >
        View Progress
      </Button>
      <Button
        variant="secondary"
        size="lg"
        className="float-end me-2"
        id="wd-collapse-all"
      >
        Collapse All
      </Button>

      {/* ✅ Modal Component */}
      <ModuleEditor
        show={show}
        handleClose={handleClose}
        dialogTitle="Add Module"
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={addModule}
      />
    </div>
  );
}
