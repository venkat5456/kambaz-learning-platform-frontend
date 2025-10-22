"use client";

import { Form, Button, Row, Col } from "react-bootstrap";
import Link from "next/link";
import { useParams } from "next/navigation";
import * as db from "../../../../Database";

// ✅ Define a proper Assignment type
interface Assignment {
  id: string;
  course: string;
  title: string;
  description?: string;
  points?: number;
  due?: string;
  available?: string;
}

export default function EditAssignmentPage() {
  const { cid, aid } = useParams();

  // ✅ Tell TypeScript the type of items in db.assignments
  const assignments: Assignment[] = db.assignments as Assignment[];

  // ✅ Use the correct field names and typed variable
  const assignment = assignments.find(
    (a) => a.course === cid && a.id === aid
  );

  if (!assignment) {
    return <div className="p-4">Assignment not found.</div>;
  }

  return (
    <div id="wd-edit-assignment" className="p-4">
      <h2 className="mb-4">Edit Assignment: {assignment.id}</h2>

      <Form>
        {/* Assignment Name */}
        <Form.Group className="mb-3" controlId="assignmentName">
          <Form.Label className="fw-bold">Assignment Name</Form.Label>
          <Form.Control type="text" defaultValue={assignment.title} />
        </Form.Group>

        {/* Description */}
        <Form.Group className="mb-3" controlId="assignmentDescription">
          <Form.Label className="fw-bold">Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            defaultValue={assignment.description}
          />
        </Form.Group>

        {/* Points */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2} className="fw-bold">
            Points
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              type="number"
              defaultValue={assignment.points || 100}
            />
          </Col>
        </Form.Group>

        {/* Assign To Section */}
        <h5 className="mt-4">Assign</h5>
        <Form.Group className="mb-3">
          <Form.Label>Assign To</Form.Label>
          <Form.Control type="text" defaultValue="Everyone" />
        </Form.Group>

        <Row className="mb-3">
          <Col>
            <Form.Label>Due</Form.Label>
            <Form.Control
              type="datetime-local"
              defaultValue={
                assignment.due
                  ? `${assignment.due}T23:59`
                  : "2025-05-13T23:59"
              }
            />
          </Col>
          <Col>
            <Form.Label>Available From</Form.Label>
            <Form.Control
              type="datetime-local"
              defaultValue={
                assignment.available
                  ? `${assignment.available}T00:00`
                  : "2025-05-06T00:00"
              }
            />
          </Col>
          <Col>
            <Form.Label>Until</Form.Label>
            <Form.Control type="datetime-local" />
          </Col>
        </Row>

        {/* Buttons */}
        <div className="mt-4">
          <Link href={`/Courses/${cid}/Assignments`}>
            <Button variant="danger" type="button" className="me-2">
              Save
            </Button>
          </Link>
          <Link href={`/Courses/${cid}/Assignments`}>
            <Button variant="secondary" type="button">
              Cancel
            </Button>
          </Link>
        </div>
      </Form>
    </div>
  );
}
