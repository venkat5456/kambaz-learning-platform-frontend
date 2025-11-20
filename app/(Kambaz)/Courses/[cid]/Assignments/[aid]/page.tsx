"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment } from "../reducer";
import type { Assignment } from "../reducer";
import { RootState } from "../../../../store";
import { v4 as uuidv4 } from "uuid";
import { Form, Button, Row, Col, Card } from "react-bootstrap";

// ⭐ Backend axios client (FIXED PATH)
import {
  createAssignment,
  updateAssignment as updateAssignmentBackend,
  findAssignmentById,
} from "../client"; // <-- FIXED HERE

export default function AssignmentEditorPage() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer
  );

  const existing = assignments.find(
    (a) => a.course === cid && a._id === aid
  );

  const [assignment, setAssignment] = useState<Assignment>(
    existing || {
      _id: aid === "new" ? uuidv4() : (aid as string),
      course: cid as string,
      title: "New Assignment",
      description: "New Assignment Description",
      points: 100,
      availableFrom: "",
      dueDate: "",
      untilDate: "",
    }
  );

  // 🔥 Load from backend also if editing existing
  useEffect(() => {
    const loadFromBackend = async () => {
      if (aid !== "new" && !existing) {
        const data = await findAssignmentById(aid as string);
        setAssignment(data);
        dispatch(updateAssignment(data));
      }
    };
    loadFromBackend();
  }, [aid]);

  const handleSave = async (): Promise<void> => {
    if (existing) {
      await updateAssignmentBackend(assignment._id!, assignment);
      dispatch(updateAssignment(assignment));
    } else {
      const created = await createAssignment(assignment);
      dispatch(addAssignment(created));
    }

    router.push(`/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignment-editor" className="p-4">
      <h2 className="mb-4">
        {existing ? "Edit Assignment" : "New Assignment"}
      </h2>

      <Card className="p-4 shadow-sm border-0">
        <Form>
          <Form.Group className="mb-3" controlId="assignmentTitle">
            <Form.Label className="fw-semibold">Assignment Name</Form.Label>
            <Form.Control
              type="text"
              value={assignment.title}
              onChange={(e) =>
                setAssignment({ ...assignment, title: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="assignmentDescription">
            <Form.Control
              as="textarea"
              rows={4}
              value={assignment.description}
              onChange={(e) =>
                setAssignment({ ...assignment, description: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="assignmentPoints">
            <Form.Label className="fw-semibold">Points</Form.Label>
            <Form.Control
              type="number"
              value={assignment.points || 0}
              onChange={(e) =>
                setAssignment({
                  ...assignment,
                  points: Number(e.target.value),
                })
              }
            />
          </Form.Group>

          <h5 className="fw-semibold mt-4">Assign</h5>
          <Card className="p-3 mt-2 border-0 bg-light">
            <Row className="align-items-center">
              <Col md={4}>
                <Form.Label>Due</Form.Label>
                <Form.Control
                  type="date"
                  value={assignment.dueDate || ""}
                  onChange={(e) =>
                    setAssignment({ ...assignment, dueDate: e.target.value })
                  }
                />
              </Col>

              <Col md={4}>
                <Form.Label>Available from</Form.Label>
                <Form.Control
                  type="date"
                  value={assignment.availableFrom || ""}
                  onChange={(e) =>
                    setAssignment({
                      ...assignment,
                      availableFrom: e.target.value,
                    })
                  }
                />
              </Col>

              <Col md={4}>
                <Form.Label>Until</Form.Label>
                <Form.Control
                  type="date"
                  value={assignment.untilDate || ""}
                  onChange={(e) =>
                    setAssignment({
                      ...assignment,
                      untilDate: e.target.value,
                    })
                  }
                />
              </Col>
            </Row>
          </Card>

          <div className="d-flex justify-content-end mt-4">
            <Button
              variant="secondary"
              className="me-2"
              onClick={() =>
                router.push(`/Courses/${cid}/Assignments`)
              }
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleSave}>
              Save
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
