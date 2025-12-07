"use client";

import { useEffect, useState } from "react";
import { getQuestionsForQuiz, deleteQuestion } from "../../client";

import MultipleChoiceEditor from "./MultipleChoiceEditor";
import TrueFalseEditor from "./TrueFalseEditor";
import FillBlankEditor from "./FillBlankEditor";

export default function QuestionsTab({ cid, qid }: any) {
  const [questions, setQuestions] = useState([]);
  const [editing, setEditing] = useState<any>(null);

  const loadQuestions = async () => {
    const data = await getQuestionsForQuiz(qid);
    setQuestions(data);
  };

  useEffect(() => {
    loadQuestions();
  }, [qid]);

  // ------------------------
  // Which editor to show?
  // ------------------------
  const openEditor = (q: any) => {
    setEditing(q); // store question in state
  };

  const closeEditor = () => {
    setEditing(null);
  };

  return (
    <div className="p-3">
      {/* ACTIVE EDITOR */}
      {editing && (
        <div className="mb-4">
          {editing.type === "MCQ" && (
            <MultipleChoiceEditor
              cid={cid}
              qid={qid}
              question={editing}
              refresh={loadQuestions}     // ⭐ FIX
              close={closeEditor}          // ⭐ FIX
            />
          )}

          {editing.type === "TRUE_FALSE" && (
            <TrueFalseEditor
              cid={cid}
              qid={qid}
              question={editing}
              refresh={loadQuestions}     // ⭐ FIX
              close={closeEditor}          // ⭐ FIX
            />
          )}

          {editing.type === "FILL_BLANK" && (
            <FillBlankEditor
              cid={cid}
              qid={qid}
              question={editing}
              refresh={loadQuestions}     // ⭐ FIX
              close={closeEditor}          // ⭐ FIX
            />
          )}
        </div>
      )}

      {/* LIST OF QUESTIONS */}
      <h2 className="fw-bold mb-3">Questions</h2>

      {questions.length === 0 && <p>No questions yet.</p>}

      <ul className="list-group">
        {questions.map((q: any) => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={q._id}>
            <div>
              <strong>{q.title}</strong>
              <div className="text-muted small">{q.type}</div>
            </div>

            <div className="d-flex gap-2">
              <button className="btn btn-outline-dark btn-sm" onClick={() => openEditor(q)}>
                Edit
              </button>

              <button
                className="btn btn-outline-danger btn-sm"
                onClick={async () => {
                  await deleteQuestion(q._id);
                  loadQuestions();
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* ADD QUESTION BUTTONS */}
      {!editing && (
        <div className="mt-4 d-flex gap-2">
          <button
            className="btn btn-danger"
            onClick={() =>
              setEditing({ type: "MCQ" }) // NEW MCQ QUESTION
            }
          >
            + Multiple Choice
          </button>

          <button
            className="btn btn-danger"
            onClick={() =>
              setEditing({ type: "TRUE_FALSE" }) // NEW TRUE/FALSE
            }
          >
            + True / False
          </button>

          <button
            className="btn btn-danger"
            onClick={() =>
              setEditing({ type: "FILL_BLANK" }) // NEW FILL IN BLANK
            }
          >
            + Fill in Blank
          </button>
        </div>
      )}
    </div>
  );
}
