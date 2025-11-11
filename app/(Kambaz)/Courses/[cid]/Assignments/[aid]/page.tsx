"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment } from "../reducer";
import type { Assignment } from "../reducer"; // ✅ reuse shared type
import { v4 as uuidv4 } from "uuid";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { RootState } from "../../../../store"; // ✅ correct path (4 levels up)

export default function AssignmentEditorPage() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  // ✅ Typed selector
  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer
  );

  // ✅ Type-safe lookup (TypeScript infers Assignment from Redux slice)
  const existing = assignments.find(
    (a) => a.course === cid && a._id === aid
  );

  // ✅ Ensure all optional fields are defined
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

  // ✅ Handlers
  const handleSave = (): void => {
    if (existing) {
      dispatch(updateAssignment(assignment));
    } else {
      dispatch(addAssignment(assignment));
    }
    router.push(`/Courses/${cid}/Assignments`);
  };

  const handleCancel = (): void => {
    router.push(`/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignment-editor" className="p-4">
      <h2 className="mb-4">
        {existing ? "Edit Assignment" : "New Assignment"}
      </h2>

      <Card className="p-4 shadow-sm border-0">
        <Form>
          {/* Assignment Name */}
          <Form.Group className="mb-3" controlId="assignmentTitle">
            <Form.Label className="fw-semibold">Assignment Name</Form.Label>
            <Form.Control
              type="text"
              value={assignment.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAssignment({ ...assignment, title: e.target.value })
              }
            />
          </Form.Group>

          {/* Description */}
          <Form.Group className="mb-3" controlId="assignmentDescription">
            <Form.Control
              as="textarea"
              rows={4}
              value={assignment.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setAssignment({ ...assignment, description: e.target.value })
              }
            />
          </Form.Group>

          {/* Points */}
          <Form.Group className="mb-3" controlId="assignmentPoints">
            <Form.Label className="fw-semibold">Points</Form.Label>
            <Form.Control
              type="number"
              value={assignment.points || 0}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAssignment({
                  ...assignment,
                  points: Number(e.target.value),
                })
              }
            />
          </Form.Group>

          {/* Assign Section */}
          <h5 className="fw-semibold mt-4">Assign</h5>
          <Card className="p-3 mt-2 border-0 bg-light">
            <Row className="align-items-center">
              <Col md={4} className="mb-3">
                <Form.Label className="fw-semibold">Due</Form.Label>
                <Form.Control
                  type="date"
                  value={assignment.dueDate || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAssignment({ ...assignment, dueDate: e.target.value })
                  }
                />
              </Col>

              <Col md={4} className="mb-3">
                <Form.Label className="fw-semibold">Available from</Form.Label>
                <Form.Control
                  type="date"
                  value={assignment.availableFrom || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAssignment({
                      ...assignment,
                      availableFrom: e.target.value,
                    })
                  }
                />
              </Col>

              <Col md={4} className="mb-3">
                <Form.Label className="fw-semibold">Until</Form.Label>
                <Form.Control
                  type="date"
                  value={assignment.untilDate || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAssignment({
                      ...assignment,
                      untilDate: e.target.value,
                    })
                  }
                />
              </Col>
            </Row>
          </Card>

          {/* Buttons */}
          <div className="d-flex justify-content-end mt-4">
            <Button variant="secondary" className="me-2" onClick={handleCancel}>
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
