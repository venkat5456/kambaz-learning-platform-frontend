"use client";

import React, { useEffect, useState } from "react";
import {
  getQuizById,
  getQuestionsForQuiz,
  getCurrentUser,
} from "../../client";

export default function PreviewQuiz({ params }: any) {
  const { cid, qid } = params; // ✅ FIX: correct param usage

  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [index, setIndex] = useState(0);
  const [user, setUser] = useState<any>(null);

  // -------------------------------
  // Load current user
  // -------------------------------
  useEffect(() => {
    const loadUser = async () => {
      const u = await getCurrentUser();
      setUser(u);
    };
    loadUser();
  }, []);

  // -------------------------------
  // Load quiz + questions
  // -------------------------------
  useEffect(() => {
    const load = async () => {
      const quizData = await getQuizById(qid);
      setQuiz(quizData);

      const qs = await getQuestionsForQuiz(qid);
      setQuestions(qs);
    };
    load();
  }, [qid]);

  if (!quiz) return <p className="p-5">Loading Quiz…</p>;
  if (!questions.length) return <p className="p-5">No questions found.</p>;

  const q = questions[index];

  // ------------------------------------------
  // Canvas-style navigation numbers (Q1 Q2 Q3)
  // ------------------------------------------
  const QuestionNav = () => (
    <div
      className="d-flex gap-2 flex-wrap mb-4"
      style={{ maxWidth: "600px" }}
    >
      {questions.map((_: any, i: number) => (
        <button
          key={i}
          className="btn"
          style={{
            border:
              i === index ? "2px solid #d00" : "1px solid #ccc",
            background: i === index ? "#ffe6e6" : "white",
            borderRadius: "6px",
            width: "45px",
          }}
          onClick={() => setIndex(i)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );

  // -------------------------------
  // UI START
  // -------------------------------
  return (
    <div className="mx-auto mt-4 mb-5" style={{ maxWidth: "900px" }}>
      {/* HEADER */}
      <h2 className="fw-bold mb-2">{quiz.title || "Quiz Preview"}</h2>

      {/* FACULTY WARNING */}
      {user?.role === "FACULTY" && (
        <div
          className="alert alert-warning py-2 mb-4"
          style={{ borderLeft: "5px solid #d58512" }}
        >
          ⚠️ <strong>Faculty Preview Mode:</strong> Answers will NOT be saved.
        </div>
      )}

      {/* Question Navigation */}
      <QuestionNav />

      {/* QUESTION CARD */}
      <div className="card shadow-sm border-0 mb-4">
        <div
          className="px-3 py-2 d-flex justify-content-between align-items-center"
          style={{
            background: "#f7f7f7",
            borderBottom: "1px solid #ddd",
          }}
        >
          <h5 className="m-0">Question {index + 1}</h5>
          <span className="text-muted">{q.points || 0} pts</span>
        </div>

        {/* QUESTION BODY */}
        <div className="card-body" style={{ padding: "25px" }}>
          {/* TITLE */}
          <div
            className="mb-3"
            dangerouslySetInnerHTML={{ __html: q.body || q.title }}
          />

          {/* TRUE / FALSE */}
          {q.type === "TRUE_FALSE" && (
            <div className="ms-2 mt-2">
              <label className="d-block mb-2">
                <input type="radio" className="me-2" disabled />
                True
              </label>
              <label className="d-block">
                <input type="radio" className="me-2" disabled />
                False
              </label>
            </div>
          )}

          {/* MULTIPLE CHOICE */}
          {q.type === "MCQ" && (
            <div className="ms-2 mt-2">
              {q.options?.map((opt: any, i: number) => (
                <label key={i} className="d-block mb-2">
                  <input type="radio" className="me-2" disabled />
                  {opt.text}
                </label>
              ))}
            </div>
          )}

          {/* FILL IN THE BLANK */}
          {q.type === "FILL_BLANK" && (
            <input
              type="text"
              className="form-control w-50 mt-3"
              placeholder="Enter your answer"
              disabled
            />
          )}
        </div>
      </div>

      {/* NAVIGATION BUTTONS */}
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-secondary"
          disabled={index === 0}
          onClick={() => setIndex(index - 1)}
        >
          « Previous
        </button>

        <button
          className="btn btn-primary"
          disabled={index === questions.length - 1}
          onClick={() => setIndex(index + 1)}
        >
          Next »
        </button>
      </div>

      {/* SUBMIT (DISABLED IN PREVIEW) */}
      <div className="text-end mt-4">
        <button className="btn btn-success btn-lg px-4" disabled>
          Submit Quiz (Preview Only)
        </button>
      </div>
    </div>
  );
}
