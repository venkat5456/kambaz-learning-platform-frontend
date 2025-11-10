"use client";

import {
  Button,
  Form,
  InputGroup,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { FaSearch, FaPlus, FaClipboardList } from "react-icons/fa";
import {
  BsGripVertical,
  BsThreeDotsVertical,
  BsCheckCircle,
} from "react-icons/bs";
import { MdAssignment } from "react-icons/md";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { deleteAssignment } from "./reducer";

// ✅ Define assignment interface
interface Assignment {
  _id: string;
  course: string;
  title: string;
  description?: string;
  points?: number;
  availableFrom?: string;
  dueDate?: string;
}

export default function AssignmentsPage() {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  // ✅ Redux selectors
  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer
  );
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  // ✅ Filter assignments by course
  const courseAssignments = assignments.filter((a) => a.course === cid);

  // ✅ Role-based access (faculty only can add/edit/delete)
  const isFaculty = currentUser?.role === "faculty";

  return (
    <div id="wd-assignments" className="p-3">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Assignments</h2>

        {/* ✅ Faculty-only Add buttons */}
        {isFaculty && (
          <div>
            <Button variant="secondary" size="sm" className="me-2">
              <FaPlus className="me-1" /> Group
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => router.push(`/Courses/${cid}/Assignments/new`)} // ✅ FIXED
            >
              <FaPlus className="me-1" /> Assignment
            </Button>
          </div>
        )}
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
        {courseAssignments.length === 0 ? (
          <p className="p-3">No assignments found for this course.</p>
        ) : (
          courseAssignments.map((assignment: Assignment) => (
            <ListGroupItem
              key={assignment._id}
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
                  {/* ✅ FIXED LINK — correct path for editor/view */}
                  <Link
                    href={`/Courses/${cid}/Assignments/${assignment._id}`}
                    className="text-decoration-none text-dark fw-semibold"
                  >
                    {assignment.title}
                  </Link>

                  <div className="text-muted small">
                    Not available until{" "}
                    {assignment.availableFrom || "—"} | Due{" "}
                    {assignment.dueDate || "—"} |{" "}
                    {assignment.points || 100} pts
                  </div>
                </div>
              </div>

              {/* Right side icons/buttons */}
              <div className="d-flex align-items-center">
                <BsCheckCircle className="text-success fs-5 me-3" />

                {/* ✅ Faculty-only Delete */}
                {isFaculty && (
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => dispatch(deleteAssignment(assignment._id))}
                  >
                    Delete
                  </Button>
                )}

                <BsThreeDotsVertical className="fs-5 text-secondary ms-2" />
              </div>
            </ListGroupItem>
          ))
        )}
      </ListGroup>
    </div>
  );
}
