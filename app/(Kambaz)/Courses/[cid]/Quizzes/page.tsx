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
  BsXCircle,
} from "react-icons/bs";
import { MdQuiz } from "react-icons/md";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useEffect, useState } from "react";

import {
  getQuizzesForCourse,
  createQuiz,
  deleteQuiz,
  togglePublishQuiz,
} from "./client";

export default function QuizzesPage() {
  const { cid } = useParams();
  const router = useRouter();

  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  const isFaculty = currentUser?.role === "FACULTY";

  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    console.log("HTTP_SERVER =", process.env.NEXT_PUBLIC_HTTP_SERVER);
  }, []);

  const loadQuizzes = async () => {
    try {
      let data = await getQuizzesForCourse(cid as string);

      // ⭐ SORT by availableFrom (required by rubric)
      data = data.sort((a: any, b: any) => {
        if (!a.availableFrom) return 1;
        if (!b.availableFrom) return -1;
        return new Date(a.availableFrom).getTime() - new Date(b.availableFrom).getTime();
      });

      setQuizzes(data);
    } catch (err) {
      console.error("Error loading quizzes", err);
    }
  };

  useEffect(() => {
    loadQuizzes();
  }, [cid]);

  // ⭐ FIXED createQuiz call
  const handleCreate = async () => {
    const q = await createQuiz(cid as string);
    router.push(`/Courses/${cid}/Quizzes/${q._id}/Editor`);
  };

  const handleDelete = async (qid: string) => {
    await deleteQuiz(qid);
    loadQuizzes();
  };

  const handlePublishToggle = async (qid: string) => {
    await togglePublishQuiz(qid);
    loadQuizzes();
  };

  return (
    <div className="p-3">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Quizzes</h2>

        {isFaculty && (
          <Button variant="danger" size="sm" onClick={handleCreate}>
            <FaPlus className="me-1" /> Quiz
          </Button>
        )}
      </div>

      {/* SEARCH BAR */}
      <InputGroup className="mb-4" style={{ maxWidth: "400px" }}>
        <InputGroup.Text>
          <FaSearch />
        </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Search for Quiz"
          aria-label="Search Quizzes"
        />
      </InputGroup>

      {/* QUIZ LIST */}
      <ListGroup className="rounded-0">
        <ListGroupItem className="p-3 fs-5 bg-light d-flex justify-content-between align-items-center">
          <span>
            <FaClipboardList className="me-2 text-muted" />
            ASSIGNMENT QUIZZES
          </span>
          <span className="text-muted">—</span>
        </ListGroupItem>

        {quizzes.length === 0 ? (
          <p className="p-3">No quizzes yet. Click + Quiz to add one.</p>
        ) : (
          quizzes.map((quiz: any) => (
            <ListGroupItem
              key={quiz._id}
              className="d-flex justify-content-between align-items-center p-3"
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
                <MdQuiz className="me-3 fs-4 text-success" />

                <div>
                  <Link
                    href={`/Courses/${cid}/Quizzes/${quiz._id}`}
                    className="text-decoration-none text-dark fw-semibold"
                  >
                    {quiz.title}
                  </Link>

                  <div className="text-muted small">
                    {!quiz.availableFrom && "Not available — "}
                    {quiz.availableFrom &&
                      new Date() < new Date(quiz.availableFrom) &&
                      `Not available until ${quiz.availableFrom} — `}
                    {quiz.availableFrom &&
                      quiz.untilDate &&
                      new Date() >= new Date(quiz.availableFrom) &&
                      new Date() <= new Date(quiz.untilDate) &&
                      "Available — "}
                    {quiz.untilDate &&
                      new Date() > new Date(quiz.untilDate) &&
                      "Closed — "}

                    Due {quiz.dueDate || "—"} | {quiz.points || 0} pts
                  </div>

                  <div className="text-muted small">
                    {quiz.questions?.length || 0} Questions
                  </div>
                </div>
              </div>

              {/* RIGHT BUTTONS */}
              <div className="d-flex align-items-center">
                {quiz.published ? (
                  <BsCheckCircle
                    className="text-success fs-5 me-3"
                    onClick={() => handlePublishToggle(quiz._id)}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <BsXCircle
                    className="text-danger fs-5 me-3"
                    onClick={() => handlePublishToggle(quiz._id)}
                    style={{ cursor: "pointer" }}
                  />
                )}

                {isFaculty && (
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(quiz._id)}
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
