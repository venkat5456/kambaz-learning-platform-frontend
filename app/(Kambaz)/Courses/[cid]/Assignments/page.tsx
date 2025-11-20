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
import { RootState } from "../../../store";
import { deleteAssignment } from "./reducer";

// ⭐ FIXED → Correct backend axios client path
import {
  findAssignments,
  deleteAssignmentById,
} from "./client"; // <-- FIXED

import { useEffect, useState } from "react";
import type { Assignment } from "./client"; // <-- FIXED

export default function AssignmentsPage() {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  // ⭐ Local fallback state + server state
  const [serverAssignments, setServerAssignments] = useState<Assignment[]>([]);

  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer
  );
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  const isFaculty = currentUser?.role === "FACULTY";

  const loadAssignments = async () => {
    try {
      const data = await findAssignments(cid as string);
      setServerAssignments(data);
    } catch (err) {
      console.error("Error loading assignments:", err);
    }
  };

  useEffect(() => {
    loadAssignments();
  }, [cid]);

  const courseAssignments =
    serverAssignments.length > 0
      ? serverAssignments
      : assignments.filter((a) => a.course === cid);

  return (
    <div id="wd-assignments" className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Assignments</h2>

        {isFaculty && (
          <Button
            variant="danger"
            size="sm"
            onClick={() => router.push(`/Courses/${cid}/Assignments/new`)}
          >
            <FaPlus className="me-1" /> Assignment
          </Button>
        )}
      </div>

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

      <ListGroup className="rounded-0">
        <ListGroupItem className="p-3 fs-5 bg-light d-flex justify-content-between align-items-center">
          <span>
            <FaClipboardList className="me-2 text-muted" />
            ASSIGNMENTS
          </span>
          <span className="text-muted">40% of Total</span>
        </ListGroupItem>

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
              <div className="d-flex align-items-start">
                <BsGripVertical className="me-3 fs-5 text-secondary" />
                <MdAssignment className="me-3 fs-4 text-success" />
                <div>
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

              <div className="d-flex align-items-center">
                <BsCheckCircle className="text-success fs-5 me-3" />

                {isFaculty && (
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={async () => {
                      await deleteAssignmentById(assignment._id!);
                      dispatch(deleteAssignment(assignment._id!));
                      loadAssignments();
                    }}
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
