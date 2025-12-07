"use client";

import { useState } from "react";
import { updateQuestion, createQuestion } from "../../client";
import RichTextEditor from "./RichTextEditor";

interface Props {
  cid: string;
  qid: string;
  question: any;
  refresh: () => void;
  close: () => void;
}

export default function TrueFalseEditor({ cid, qid, question, refresh, close }: Props) {
  const [title, setTitle] = useState(question?.title || "");
  const [points, setPoints] = useState(question?.points || 0);
  const [body, setBody] = useState(question?.body || "");
  const [correct, setCorrect] = useState(
    question?.correctBoolean === true ? true : false
  );

  const save = async () => {
    const payload = {
      title,
      points,
      body,
      type: "TRUE_FALSE",
      correctBoolean: correct,
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

      {/* HEADER BAR */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-3">
          {/* Title dropdown (Canvas-style) */}
          <input
            className="form-control w-72"
            placeholder="Question Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Type selector */}
          <select className="form-select w-40" disabled>
            <option>True/False</option>
          </select>
        </div>

        {/* POINTS */}
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

      {/* QUESTION BODY */}
      <label className="fw-bold mb-1">Question:</label>
      <RichTextEditor value={body} onChange={setBody} />

      {/* ANSWER SECTION */}
      <h5 className="mt-4 mb-3 fw-bold">Answers:</h5>

      <div className="ms-3 d-flex flex-column gap-2">

        {/* TRUE OPTION */}
        <label className="d-flex align-items-center gap-2">
          <input
            type="radio"
            name="tf"
            checked={correct === true}
            onChange={() => setCorrect(true)}
          />
          <span className={correct ? "text-success fw-semibold" : ""}>
            True
          </span>
        </label>

        {/* FALSE OPTION */}
        <label className="d-flex align-items-center gap-2">
          <input
            type="radio"
            name="tf"
            checked={correct === false}
            onChange={() => setCorrect(false)}
          />
          <span className={!correct ? "text-success fw-semibold" : ""}>
            False
          </span>
        </label>
      </div>

      {/* BUTTONS */}
      <div className="d-flex gap-3 mt-4">
        <button className="btn btn-secondary" onClick={close}>
          Cancel
        </button>

        <button className="btn btn-danger" onClick={save}>
          {question?._id ? "Update Question" : "Save Question"}
        </button>
      </div>
    </div>
  );
}
