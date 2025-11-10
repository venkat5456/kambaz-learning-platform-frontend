"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment } from "../reducer";
import { v4 as uuidv4 } from "uuid";
import { Form, Button, Row, Col, Card } from "react-bootstrap";

// ✅ Correct relative import for store
// eslint-disable-next-line @typescript-eslint/no-var-requires
const store = require("../../../../store").default;
type RootState = ReturnType<typeof store.getState>;

export default function AssignmentEditorPage() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  // ✅ Get assignments from Redux
  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer
  );

  // ✅ Find existing assignment or create new one
  const existing = assignments.find(
    (a: any) => a.course === cid && a._id === aid
  );

  const [assignment, setAssignment] = useState(
    existing || {
      _id: aid === "new" ? uuidv4() : aid,
      course: cid,
      title: "New Assignment",
      description: "New Assignment Description",
      points: 100,
      availableFrom: "",
      dueDate: "",
      untilDate: "",
    }
  );

  // ✅ Handlers
  const handleSave = () => {
    if (existing) {
      dispatch(updateAssignment(assignment));
    } else {
      dispatch(addAssignment(assignment));
    }
    router.push(`/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Assignments`);
  };

  // ✅ UI Layout (matches Figure 4.4.5.2)
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
              onChange={(e) =>
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
              onChange={(e) =>
                setAssignment({ ...assignment, description: e.target.value })
              }
            />
          </Form.Group>

          {/* Points */}
          <Form.Group className="mb-3" controlId="assignmentPoints">
            <Form.Label className="fw-semibold">Points</Form.Label>
            <Form.Control
              type="number"
              value={assignment.points}
              onChange={(e) =>
                setAssignment({
                  ...assignment,
                  points: Number(e.target.value),
                })
              }
            />
          </Form.Group>

          {/* Assign section */}
          <h5 className="fw-semibold mt-4">Assign</h5>
          <Card className="p-3 mt-2 border-0 bg-light">
            <Row className="align-items-center">
              <Col md={4} className="mb-3">
                <Form.Label className="fw-semibold">Due</Form.Label>
                <Form.Control
                  type="date"
                  value={assignment.dueDate}
                  onChange={(e) =>
                    setAssignment({
                      ...assignment,
                      dueDate: e.target.value,
                    })
                  }
                />
              </Col>

              <Col md={4} className="mb-3">
                <Form.Label className="fw-semibold">Available from</Form.Label>
                <Form.Control
                  type="date"
                  value={assignment.availableFrom}
                  onChange={(e) =>
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
                  value={assignment.untilDate}
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

          {/* Buttons */}
          <div className="d-flex justify-content-end mt-4">
            <Button
              variant="secondary"
              className="me-2"
              onClick={handleCancel}
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
