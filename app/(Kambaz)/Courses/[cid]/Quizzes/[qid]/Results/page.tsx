"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  getQuizById,
  getQuestionsForQuiz,
  getLastAttemptForQuiz,
} from "../../client";

export default function QuizResultsPage() {
  const { cid, qid } = useParams();

  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [attempt, setAttempt] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const quizData = await getQuizById(qid as string);
      setQuiz(quizData);

      const qs = await getQuestionsForQuiz(qid as string);
      setQuestions(qs);

      const attemptData = await getLastAttemptForQuiz(qid as string);
      setAttempt(attemptData);
    };

    load();
  }, [qid]);

  if (!quiz || !questions.length) {
    return <p className="p-5">Loading Results…</p>;
  }

  if (!attempt) {
    return (
      <div className="p-5">
        <h2>No Attempt Found</h2>
        <p>You have not submitted this quiz yet.</p>
      </div>
    );
  }

  // ⭐ Canvas-style attempt logic:
  const attemptsAllowed = quiz.multipleAttempts
    ? quiz.numberOfAttempts || 1
    : 1;

  const attemptsUsed = attempt?.attemptNumber || 0;
  const attemptsLeft = Math.max(0, attemptsAllowed - attemptsUsed);

  return (
    <div className="container py-4" style={{ maxWidth: "900px" }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>{quiz.title} — Results</h2>

        {/* ⭐ NEW: RETAKE BUTTON */}
        {attemptsLeft > 0 && (
          <a
            href={`/Courses/${cid}/Quizzes/${qid}/Take`}
            className="btn btn-primary btn-lg"
          >
            Retake Quiz
          </a>
        )}
      </div>

      {/* SCORE BOX */}
      <div
        className="p-3 mb-4 rounded"
        style={{ background: "#f7f7f7", border: "1px solid #ddd" }}
      >
        <h4>
          Score:{" "}
          <span className="text-success">
            {attempt.score} / {attempt.maxScore}
          </span>
        </h4>
        <p className="text-muted mt-2">
          Attempt #{attempt.attemptNumber} • {new Date(attempt.createdAt).toLocaleString()}
        </p>

        {/* Attempts info */}
        <p className="text-muted">
          Attempts Used: {attemptsUsed} / {attemptsAllowed}
        </p>
      </div>

      {/* QUESTIONS LOOP */}
      {questions.map((question: any, idx: number) => {
        const ansObj = attempt.answers.find((a: any) => a.question === question._id);
        const studentAnswer = ansObj?.answer || "No Answer";
        const isCorrect = ansObj?.correct;

        return (
          <div
            key={question._id}
            className="mb-4 p-3 rounded"
            style={{
              border: `2px solid ${isCorrect ? "green" : "red"}`,
              background: "#fff",
            }}
          >
            <div className="d-flex justify-content-between mb-2">
              <h5>
                Question {idx + 1} — {question.points} pts
              </h5>
              {isCorrect ? (
                <span className="text-success fw-bold">✔ Correct</span>
              ) : (
                <span className="text-danger fw-bold">✘ Incorrect</span>
              )}
            </div>

            <p className="mb-3">{question.title}</p>

            {/* MCQ RESULTS */}
            {question.type === "MCQ" && (
              <div className="ms-3">
                {question.options.map((opt: any, i: number) => {
                  const isStudentChoice = studentAnswer === opt.text;
                  const isCorrectAnswer = opt.correct;

                  return (
                    <div
                      key={i}
                      className="mb-2 p-2 rounded"
                      style={{
                        background: isCorrectAnswer
                          ? "#d4edda"
                          : isStudentChoice
                          ? "#f8d7da"
                          : "#f7f7f7",
                      }}
                    >
                      <input type="radio" checked={isStudentChoice} disabled />{" "}
                      {opt.text}
                      {isCorrectAnswer && (
                        <span className="text-success"> (Correct)</span>
                      )}
                      {isStudentChoice && !isCorrectAnswer && (
                        <span className="text-danger"> (Your Answer)</span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* TRUE/FALSE RESULTS */}
            {question.type === "TRUE_FALSE" && (
              <div className="ms-3">
                <div
                  className="p-2 rounded mb-2"
                  style={{
                    background:
                      studentAnswer === true
                        ? question.correctBoolean === true
                          ? "#d4edda"
                          : "#f8d7da"
                        : "#f7f7f7",
                  }}
                >
                  <input type="radio" checked={studentAnswer === true} disabled /> True
                </div>

                <div
                  className="p-2 rounded"
                  style={{
                    background:
                      studentAnswer === false
                        ? question.correctBoolean === false
                          ? "#d4edda"
                          : "#f8d7da"
                        : "#f7f7f7",
                  }}
                >
                  <input type="radio" checked={studentAnswer === false} disabled /> False
                </div>
              </div>
            )}

            {/* FILL-IN RESULTS */}
            {question.type === "FILL_BLANK" && (
              <div className="ms-3">
                <input
                  type="text"
                  disabled
                  value={studentAnswer}
                  className="form-control w-50"
                  style={{
                    background: isCorrect ? "#d4edda" : "#f8d7da",
                  }}
                />
                {!isCorrect && (
                  <p className="mt-2 text-success">
                    Correct Answer(s): {question.correctAnswers.join(", ")}
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
