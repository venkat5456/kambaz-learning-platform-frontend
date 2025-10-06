"use client";

import { Button, Form, InputGroup, ListGroup, ListGroupItem } from "react-bootstrap";
import { FaSearch, FaPlus, FaClipboardList } from "react-icons/fa";
import { MdAssignment } from "react-icons/md";
import Link from "next/link";

export default function AssignmentsPage({ params }: { params: { cid: string } }) {
  const { cid } = params;

  return (
    <div id="wd-assignments" className="p-3">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Assignments</h2>

        <div>
          <Button variant="secondary" size="sm" className="me-2">
            <FaPlus className="me-1" /> Group
          </Button>
          <Button variant="danger" size="sm">
            <FaPlus className="me-1" /> Assignment
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <InputGroup className="mb-4" style={{ maxWidth: "400px" }}>
        <InputGroup.Text>
          <FaSearch />
        </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Search for Assignment"
          aria-label="Search Assignments"
        />
      </InputGroup>

      {/* Assignment Group */}
      <ListGroup className="rounded-0">
        {/* Group Header */}
        <ListGroupItem className="p-3 fs-5 bg-light d-flex justify-content-between align-items-center">
          <span>
            <FaClipboardList className="me-2 text-muted" />
            ASSIGNMENTS
          </span>
          <span className="text-muted">40% of Total</span>
        </ListGroupItem>

        {/* Assignment Items */}
        <ListGroupItem className="wd-lesson p-3 ps-2">
          <Link href={`/Courses/${cid}/Assignments/A1`} className="text-decoration-none text-dark">
            <h5 className="mb-1">
              <MdAssignment className="me-2 text-success" />
              A1 - ENV + HTML
            </h5>
            <small className="text-muted">Due Jan 21 at 11:59pm | 100 pts</small>
          </Link>
        </ListGroupItem>

        <ListGroupItem className="wd-lesson p-3 ps-2">
          <Link href={`/Courses/${cid}/Assignments/A2`} className="text-decoration-none text-dark">
            <h5 className="mb-1">
              <MdAssignment className="me-2 text-success" />
              A2 - CSS + BOOTSTRAP
            </h5>
            <small className="text-muted">Due Jan 28 at 11:59pm | 100 pts</small>
          </Link>
        </ListGroupItem>

        <ListGroupItem className="wd-lesson p-3 ps-2">
          <Link href={`/Courses/${cid}/Assignments/A3`} className="text-decoration-none text-dark">
            <h5 className="mb-1">
              <MdAssignment className="me-2 text-success" />
              A3 - JAVASCRIPT + REACT
            </h5>
            <small className="text-muted">Due Feb 4 at 11:59pm | 100 pts</small>
          </Link>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}