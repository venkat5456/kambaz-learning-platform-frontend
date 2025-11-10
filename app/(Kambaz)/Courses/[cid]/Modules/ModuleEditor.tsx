"use client";
import { Modal, Button, Form } from "react-bootstrap";

export default function ModuleEditor({
  show,
  handleClose,
  dialogTitle,
  moduleName,
  setModuleName,
  addModule,
}: {
  show: boolean;
  handleClose: () => void;
  dialogTitle: string;
  moduleName: string;
  setModuleName: (name: string) => void;
  addModule: () => void;
}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{dialogTitle}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Control
          type="text"
          value={moduleName}
          placeholder="Introduction to Rocket Science"
          onChange={(e) => setModuleName(e.target.value)}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            addModule();
            handleClose();
          }}
        >
          Add Module
        </Button>
      </Modal.Footer>
    </Modal>
  );
}