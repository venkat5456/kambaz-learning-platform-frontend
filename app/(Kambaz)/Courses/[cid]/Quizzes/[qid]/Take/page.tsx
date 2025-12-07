"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  getQuizById,
  getQuestionsForQuiz,
  submitQuiz,
  getCurrentUser,
} from "../../client";

export default function TakeQuizPage() {
  const { cid, qid } = useParams();
  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [index, setIndex] = useState(0);

  // Store answers in THIS format:
  // { "questionId": userAnswer }
  const [answers, setAnswers] = useState<any>({});

  const [user, setUser] = useState<any>(null);

  // Load user
  useEffect(() => {
    const loadUser = async () => {
      const u = await getCurrentUser();
      setUser(u);
    };
    loadUser();
  }, []);

  // Load quiz + questions
  useEffect(() => {
    const load = async () => {
      const qz = await getQuizById(qid as string);
      setQuiz(qz);

      const qs = await getQuestionsForQuiz(qid as string);
      setQuestions(qs);
    };

    load();
  }, [qid]);

  if (!quiz) return <p>Loading...</p>;
  if (questions.length === 0) return <p>No questions found.</p>;

  const q = questions[index];

  // Save user's answer (correct format)
  const answerQuestion = (qid: string, answer: any) => {
    setAnswers((prev: any) => ({
      ...prev,
      [qid]: answer,
    }));
  };

  // --------------------------
  // SUBMIT FIXED — IMPORTANT
  // --------------------------
  const handleSubmit = async () => {
    // 🚀 BACKEND EXPECTS THIS:
    // { answers: { questionId: answer } }
    const payload = {
      answers: answers,
    };

    await submitQuiz(qid as string, payload);
    alert("Quiz submitted!");
  };

  return (
    <div className="container mt-4">
      <h2>{quiz.title}</h2>

      {/* QUESTION CARD */}
      <div className="card p-4 mt-3">
        <h4>Question {index + 1}</h4>
        <p>{q.title}</p>

        {/* MCQ */}
        {q.type === "MCQ" &&
          q.options.map((o: any, i: number) => (
            <label key={i} className="d-block mb-2">
              <input
                type="radio"
                name={`q-${q._id}`}
                className="me-2"
                checked={answers[q._id] === o.text}
                onChange={() => answerQuestion(q._id, o.text)}
              />
              {o.text}
            </label>
          ))}

        {/* TRUE/FALSE */}
        {q.type === "TRUE_FALSE" && (
          <>
            <label className="d-block mb-2">
              <input
                type="radio"
                name={`q-${q._id}`}
                className="me-2"
                checked={answers[q._id] === true}
                onChange={() => answerQuestion(q._id, true)}
              />
              True
            </label>

            <label className="d-block">
              <input
                type="radio"
                name={`q-${q._id}`}
                className="me-2"
                checked={answers[q._id] === false}
                onChange={() => answerQuestion(q._id, false)}
              />
              False
            </label>
          </>
        )}

        {/* FILL IN THE BLANK */}
        {q.type === "FILL_BLANK" && (
          <input
            className="form-control w-50"
            placeholder="Enter answer"
            value={answers[q._id] || ""}
            onChange={(e) => answerQuestion(q._id, e.target.value)}
          />
        )}
      </div>

      {/* NAVIGATION */}
      <div className="mt-3 d-flex justify-content-between">
        <button
          className="btn btn-secondary"
          disabled={index === 0}
          onClick={() => setIndex(index - 1)}
        >
          Previous
        </button>

        <button
          className="btn btn-primary"
          disabled={index === questions.length - 1}
          onClick={() => setIndex(index + 1)}
        >
          Next
        </button>
      </div>

      {/* SUBMIT BUTTON */}
      <div className="text-end mt-4">
        <button className="btn btn-success btn-lg" onClick={handleSubmit}>
          Submit Quiz
        </button>
      </div>
    </div>
  );
}
