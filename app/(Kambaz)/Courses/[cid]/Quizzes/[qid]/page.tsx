"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useSelector } from "react-redux";
import {
  getQuizById,
  getLastAttemptForQuiz,
  togglePublishQuiz,
} from "../client";

export default function QuizDetailsPage() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();

  // 🔥 Read logged-in user
  const currentUser = useSelector(
    (state: any) => state.accountReducer?.currentUser
  );

  // If not logged in, treat as student
  const role = currentUser?.role || "STUDENT";

  const [quiz, setQuiz] = useState<any>(null);
  const [lastAttempt, setLastAttempt] = useState<any | null>(null);
  const [attemptsLoading, setAttemptsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await getQuizById(qid as string);
      setQuiz(data);

      // Only students care about attempts
      if (role === "STUDENT") {
        try {
          const attempt = await getLastAttemptForQuiz(qid as string);
          setLastAttempt(attempt);
        } catch (e) {
          console.error("Error loading last attempt", e);
        }
      }

      setAttemptsLoading(false);
    };
    load();
  }, [qid, role]);

  if (!quiz) return <div className="p-5">Loading...</div>;

  // Compute attempts allowed / used
  const attemptsAllowed = quiz.multipleAttempts
    ? quiz.numberOfAttempts || 1
    : 1;

  const attemptsUsed = lastAttempt?.attemptNumber || 0;
  const attemptsLeft = Math.max(0, attemptsAllowed - attemptsUsed);

  return (
    <div className="d-flex justify-content-center">
      <div style={{ width: "85%", maxWidth: "900px" }}>
        {/* --------------------------------------------------
            TOP HEADER (FACULTY SEES EDIT/PREVIEW/PUBLISH)
        -------------------------------------------------- */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">{quiz.title}</h2>

          {role === "FACULTY" && (
            <div>
              {/* PREVIEW */}
              <Link
                href={`/Courses/${cid}/Quizzes/${qid}/Preview`}
                className="btn btn-light me-2"
              >
                Preview
              </Link>

              {/* EDIT */}
              <Link
                href={`/Courses/${cid}/Quizzes/${qid}/Editor`}
                className="btn btn-secondary me-2"
              >
                Edit
              </Link>

              {/* ⭐ NEW — PUBLISH / UNPUBLISH BUTTON */}
              <button
                className={
                  quiz.published
                    ? "btn btn-success ms-2"
                    : "btn btn-outline-success ms-2"
                }
                onClick={async () => {
                  await togglePublishQuiz(qid as string);
                  const updated = await getQuizById(qid as string);
                  setQuiz(updated);
                }}
              >
                {quiz.published ? "Unpublish" : "Publish"}
              </button>
            </div>
          )}
        </div>

        {/* --------------------------------------------------
            STUDENT VIEW — START / RETAKE / RESULTS
        -------------------------------------------------- */}
        {role === "STUDENT" && (
          <div
            className="p-4 mb-4"
            style={{
              border: "1px solid #ddd",
              borderRadius: "6px",
              background: "white",
            }}
          >
            <p className="mb-2">
              This quiz contains <b>{quiz.questionsCount || 0}</b> questions.
            </p>

            {quiz.multipleAttempts && (
              <p className="mb-2 text-muted">
                Attempts:{" "}
                <b>
                  {attemptsUsed} / {attemptsAllowed}
                </b>
              </p>
            )}

            {!quiz.multipleAttempts && (
              <p className="mb-2 text-muted">
                Attempts: <b>{attemptsUsed > 0 ? "Used" : "Not taken yet"}</b>
              </p>
            )}

            <div className="mt-3">
              {attemptsLoading ? (
                <span className="text-muted">Checking attempts…</span>
              ) : attemptsLeft > 0 ? (
                <Link
                  href={`/Courses/${cid}/Quizzes/${qid}/Take`}
                  className="btn btn-primary btn-lg me-2"
                >
                  {attemptsUsed > 0 ? "Retake Quiz" : "Start Quiz"}
                </Link>
              ) : (
                <button className="btn btn-secondary btn-lg me-2" disabled>
                  No Attempts Remaining
                </button>
              )}

              {lastAttempt && (
                <Link
                  href={`/Courses/${cid}/Quizzes/${qid}/Results`}
                  className="btn btn-outline-secondary btn-lg"
                >
                  View Last Attempt
                </Link>
              )}
            </div>
          </div>
        )}

        {/* --------------------------------------------------
            FACULTY VIEW — DETAILS TABLE
        -------------------------------------------------- */}
        {role === "FACULTY" && (
          <div
            className="p-4"
            style={{
              border: "2px dotted #ccc",
              borderRadius: "6px",
              background: "white",
            }}
          >
            <table style={{ width: "100%", marginBottom: "30px" }}>
              <tbody>
                {renderRow("Quiz Type", "Graded Quiz")}
                {renderRow("Points", quiz.points || 0)}
                {renderRow("Assignment Group", "QUIZZES")}
                {renderRow("Shuffle Answers", quiz.shuffleAnswers ? "Yes" : "No")}
                {renderRow(
                  "Time Limit",
                  quiz.timeLimit ? quiz.timeLimit + " Minutes" : "—"
                )}
                {renderRow(
                  "Multiple Attempts",
                  quiz.multipleAttempts ? "Yes" : "No"
                )}
                {renderRow("How Many Attempts", quiz.numberOfAttempts || "1")}
                {renderRow("View Responses", quiz.viewResponses || "Always")}
                {renderRow(
                  "Show Correct Answers",
                  quiz.showCorrectAnswers || "Immediately"
                )}
                {renderRow(
                  "One Question at a Time",
                  quiz.oneQuestionAtATime ? "Yes" : "No"
                )}
                {renderRow(
                  "Require Respondus LockDown Browser",
                  quiz.lockDown ? "Yes" : "No"
                )}
                {renderRow(
                  "Required to View Quiz Results",
                  quiz.viewResults ? "Yes" : "No"
                )}
                {renderRow(
                  "Webcam Required",
                  quiz.webcamRequired ? "Yes" : "No"
                )}
                {renderRow(
                  "Lock Questions After Answering",
                  quiz.lockQuestions ? "Yes" : "No"
                )}
              </tbody>
            </table>

            <hr />

            <table style={{ width: "100%", marginTop: "20px" }}>
              <thead>
                <tr>
                  <th className="text-start">Due</th>
                  <th className="text-start">For</th>
                  <th className="text-start">Available from</th>
                  <th className="text-start">Until</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>{quiz.dueDate || "—"}</td>
                  <td>Everyone</td>
                  <td>{quiz.availableFrom || "—"}</td>
                  <td>{quiz.untilDate || "—"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------
   Helper to render a row
---------------------------- */
function renderRow(label: string, value: string | number) {
  return (
    <tr>
      <th
        style={{
          textAlign: "right",
          paddingRight: "20px",
          width: "40%",
          fontWeight: 600,
        }}
      >
        {label}
      </th>

      <td style={{ textAlign: "left", width: "60%" }}>{value}</td>
    </tr>
  );
}
