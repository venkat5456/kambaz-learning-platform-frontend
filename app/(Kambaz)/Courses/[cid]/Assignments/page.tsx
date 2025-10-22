"use client";

import { Button, Form, InputGroup, ListGroup, ListGroupItem } from "react-bootstrap";
import { FaSearch, FaPlus, FaClipboardList } from "react-icons/fa";
import { BsGripVertical, BsThreeDotsVertical, BsCheckCircle } from "react-icons/bs";
import { MdAssignment } from "react-icons/md";
import Link from "next/link";
import * as db from "../../../Database";
import { useParams } from "next/navigation";

// ✅ Define a clear interface for assignment data
interface Assignment {
  id: string;
  course: string;
  title: string;
  description?: string;
  points?: number;
  available?: string;
  due?: string;
}

export default function AssignmentsPage() {
  const { cid } = useParams();

  // ✅ Type cast db.assignments safely
  const assignments: Assignment[] = (db.assignments as Assignment[]).filter(
    (a) => a.course === cid
  );

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

        {/* ✅ Dynamic Assignment Items */}
        {assignments.length === 0 ? (
          <p className="p-3">No assignments found for this course.</p>
        ) : (
          assignments.map((assignment) => (
            <ListGroupItem
              key={assignment.id}
              className="wd-assignment d-flex justify-content-between align-items-center p-3"
              style={{
                borderLeft: "4px solid green",
                borderTop: "none",
                borderRight: "none",
                borderBottom: "1px solid #dee2e6",
                borderRadius: "0",
              }}
            >
              {/* Left side: icon + info */}
              <div className="d-flex align-items-start">
                <BsGripVertical className="me-3 fs-5 text-secondary" />
                <MdAssignment className="me-3 fs-4 text-success" />
                <div>
                  <Link
                    href={`/Courses/${cid}/Assignments/${assignment.id}`}
                    className="text-decoration-none text-dark fw-semibold"
                  >
                    {assignment.id}: {assignment.title}
                  </Link>
                  <div className="text-muted small">
                    Multiple Modules | Not available until{" "}
                    {assignment.available || "May 6 at 12:00am"} | Due{" "}
                    {assignment.due || "May 13 at 11:59pm"} |{" "}
                    {assignment.points || 100} pts
                  </div>
                </div>
              </div>

              {/* Right side icons */}
              <div className="d-flex align-items-center">
                <BsCheckCircle className="text-success fs-5 me-3" />
                <BsThreeDotsVertical className="fs-5 text-secondary" />
              </div>
            </ListGroupItem>
          ))
        )}
      </ListGroup>
    </div>
  );
}
