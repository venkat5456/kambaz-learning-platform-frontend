"use client";

import { useState, useEffect } from "react";
import { updateQuestion, createQuestion, deleteQuestion } from "../../client";
import RichTextEditor from "./RichTextEditor";

interface Props {
  cid: string;
  qid: string;
  question: any;
  refresh: () => void; // reload questions list after save
  close: () => void;   // close editor
}

export default function MultipleChoiceEditor({ cid, qid, question, refresh, close }: Props) {
  const [title, setTitle] = useState(question?.title || "");
  const [points, setPoints] = useState(question?.points || 0);
  const [body, setBody] = useState(question?.body || "");
  const [choices, setChoices] = useState(
    question?.options?.length
      ? question.options
      : [
          { text: "", correct: false },
          { text: "", correct: false },
        ]
  );

  // -------- FUNCTIONS --------

  const updateChoice = (index: number, text: string) => {
    const updated = [...choices];
    updated[index].text = text;
    setChoices(updated);
  };

  const setCorrectChoice = (index: number) => {
    setChoices(
      choices.map((c, i) => ({
        ...c,
        correct: i === index,
      }))
    );
  };

  const addChoice = () => {
    setChoices([...choices, { text: "", correct: false }]);
  };

  const removeChoice = (index: number) => {
    setChoices(choices.filter((_, i) => i !== index));
  };

  const saveQuestion = async () => {
    const payload = {
      title,
      points,
      body,
      type: "MCQ",
      options: choices,
    };

    if (question?._id) {
      await updateQuestion(question._id, payload);
    } else {
      await createQuestion(qid, payload);
    }

    refresh();
    close();
  };

  return (
    <div className="border p-4 rounded bg-white shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-3">
          <select className="form-select w-40">
            <option>Easy Question</option>
            <option>Medium Question</option>
            <option>Hard Question</option>
          </select>

          <select className="form-select w-40">
            <option>Multiple Choice</option>
          </select>
        </div>

        <div className="text-lg">
          pts:{" "}
          <input
            type="number"
            className="border rounded p-1 w-16"
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
          />
        </div>
      </div>

      {/* Question Title */}
      <label className="fw-bold">Question Title:</label>
      <input
        className="form-control mb-3"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Question Body (WYSIWYG) */}
      <label className="fw-bold">Question:</label>
      <RichTextEditor value={body} onChange={setBody} />

      {/* Choices */}
      <h5 className="mt-4 mb-2 fw-bold">Answers:</h5>

      {choices.map((choice, index) => (
        <div key={index} className="d-flex align-items-center gap-3 mb-2">
          {/* Radio button for correct answer */}
          <input
            type="radio"
            checked={choice.correct}
            onChange={() => setCorrectChoice(index)}
          />

          <input
            type="text"
            className="form-control"
            placeholder="Possible Answer"
            value={choice.text}
            onChange={(e) => updateChoice(index, e.target.value)}
          />

          {/* Delete button */}
          {choices.length > 2 && (
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => removeChoice(index)}
            >
              🗑
            </button>
          )}
        </div>
      ))}

      {/* Add new answer */}
      <button className="btn btn-link text-danger" onClick={addChoice}>
        + Add Another Answer
      </button>

      {/* Footer Buttons */}
      <div className="d-flex gap-3 mt-4">
        <button className="btn btn-secondary" onClick={close}>
          Cancel
        </button>

        <button className="btn btn-danger" onClick={saveQuestion}>
          {question?._id ? "Update Question" : "Save Question"}
        </button>
      </div>
    </div>
  );
}
