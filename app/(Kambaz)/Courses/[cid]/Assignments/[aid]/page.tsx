"use client";

import { Form, Button, Row, Col } from "react-bootstrap";

export default function EditAssignmentPage() {
  return (
    <div id="wd-edit-assignment" className="p-4">
      <h2 className="mb-4">Edit Assignment: A1</h2>

      <Form>
        {/* Assignment Name */}
        <Form.Group className="mb-3" controlId="assignmentName">
          <Form.Label className="fw-bold">Assignment Name</Form.Label>
          <Form.Control type="text" defaultValue="A1 - Example Assignment" />
        </Form.Group>

        {/* Description */}
        <Form.Group className="mb-3" controlId="assignmentDescription">
          <Form.Label className="fw-bold">Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            defaultValue={`The assignment is available online.
Submit a link to the landing page of your Web application running on Netlify.

The landing page should include:
- Your full name and section
- Links to each of the lab assignments
- Link to the Kambaz application
- Links to all relevant source code repositories`}
          />
        </Form.Group>

        {/* Points */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2} className="fw-bold">
            Points
          </Form.Label>
          <Col sm={4}>
            <Form.Control type="number" defaultValue={100} />
          </Col>
        </Form.Group>

        {/* Assignment Group */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2} className="fw-bold">
            Assignment Group
          </Form.Label>
          <Col sm={6}>
            <Form.Select defaultValue="Assignments">
              <option>Assignments</option>
              <option>Labs</option>
              <option>Projects</option>
            </Form.Select>
          </Col>
        </Form.Group>

        {/* Display Grade As */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2} className="fw-bold">
            Display Grade as
          </Form.Label>
          <Col sm={6}>
            <Form.Select defaultValue="Percentage">
              <option>Percentage</option>
              <option>Points</option>
              <option>Complete/Incomplete</option>
            </Form.Select>
          </Col>
        </Form.Group>

        {/* Submission Type */}
        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">Submission Type</Form.Label>
          <Form.Select defaultValue="Online">
            <option>Online</option>
            <option>On Paper</option>
            <option>No Submission</option>
          </Form.Select>
          <div className="mt-2 ps-3">
            <Form.Check type="checkbox" label="Text Entry" />
            <Form.Check type="checkbox" label="Website URL" defaultChecked />
            <Form.Check type="checkbox" label="Media Recordings" />
            <Form.Check type="checkbox" label="File Uploads" />
          </div>
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
            <Form.Control type="datetime-local" defaultValue="2025-05-13T23:59" />
          </Col>
          <Col>
            <Form.Label>Available From</Form.Label>
            <Form.Control type="datetime-local" defaultValue="2025-05-06T00:00" />
          </Col>
          <Col>
            <Form.Label>Until</Form.Label>
            <Form.Control type="datetime-local" />
          </Col>
        </Row>

        {/* Buttons */}
        <div className="mt-4">
          <Button variant="danger" type="submit" className="me-2">
            Save
          </Button>
          <Button variant="secondary">Cancel</Button>
        </div>
      </Form>
    </div>
  );
}
