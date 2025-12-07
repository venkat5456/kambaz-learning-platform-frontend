"use client";

import { useState, useEffect } from "react";
import { getQuestionById, updateQuestion, createQuestion } from "../../client";
import RichTextEditor from "./RichTextEditor";

export default function FillBlankEditor({ cid, qid, question, refresh, close }: any) {
  const [localQ, setLocalQ] = useState<any>(
    question?._id
      ? question
      : {
          title: "",
          text: "",
          points: 0,
          correctAnswers: [""],
          type: "FILL_BLANK",
        }
  );

  useEffect(() => {
    const load = async () => {
      if (question?._id) {
        const q = await getQuestionById(question._id);
        setLocalQ(q);
      }
    };
    load();
  }, [question]);

  if (!localQ) return <p>Loading...</p>;

  const addAnswer = () => {
    setLocalQ({
      ...localQ,
      correctAnswers: [...localQ.correctAnswers, ""],
    });
  };

  const updateAnswer = (i: number, value: string) => {
    const updated = [...localQ.correctAnswers];
    updated[i] = value;
    setLocalQ({ ...localQ, correctAnswers: updated });
  };

  const deleteAnswer = (i: number) => {
    const updated = [...localQ.correctAnswers];
    updated.splice(i, 1);
    setLocalQ({ ...localQ, correctAnswers: updated });
  };

  const save = async () => {
    const payload = { ...localQ, type: "FILL_BLANK" };

    if (question?._id) {
      await updateQuestion(question._id, payload);
    } else {
      await createQuestion(qid, payload);
    }

    refresh();
    close();
  };

  return (
    <div className="border p-8 rounded bg-white shadow-sm max-w-3xl space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">

        <div className="flex gap-6">
          <select className="border rounded px-4 py-3 bg-gray-100">
            <option>Easy fill the blank</option>
            <option>Medium fill the blank</option>
            <option>Hard fill the blank</option>
          </select>

          <select className="border rounded px-4 py-3 bg-gray-100" disabled>
            <option>Fill In the Blank</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-semibold text-lg">pts:</span>
          <input
            type="number"
            value={localQ.points}
            onChange={(e) => setLocalQ({ ...localQ, points: Number(e.target.value) })}
            className="border rounded px-3 py-2 w-24"
          />
        </div>
      </div>

      {/* TITLE */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold">Question Title</label>
        <input
          value={localQ.title}
          onChange={(e) => setLocalQ({ ...localQ, title: e.target.value })}
          className="border rounded p-3 w-full"
        />
      </div>

      {/* INSTRUCTIONS */}
      <div className="space-y-2">
        <p className="text-gray-600 leading-relaxed">
          Enter your question text, then define all possible correct answers for the blank.
          Students will see the question followed by a small text box to type their answer.
        </p>

        <label className="font-semibold block">Question:</label>
        <RichTextEditor
          value={localQ.text}
          onChange={(html: string) => setLocalQ({ ...localQ, text: html })}
        />
      </div>

      {/* ANSWERS */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Answers:</h3>

        <div className="space-y-4">
          {localQ.correctAnswers.map((ans: string, idx: number) => (
            <div
              key={idx}
              className="flex items-center gap-4 p-4 bg-gray-50 border rounded"
            >
              <span className="text-sm text-gray-600 w-40 font-medium">
                Possible Answer:
              </span>

              <input
                className="border rounded p-3 flex-1"
                value={ans}
                onChange={(e) => updateAnswer(idx, e.target.value)}
              />

              <button
                onClick={() => deleteAnswer(idx)}
                className="text-red-600 hover:text-red-800 text-xl"
              >
                🗑
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={addAnswer}
          className="text-red-600 font-medium mt-2"
        >
          + Add Another Answer
        </button>
      </div>

      {/* BUTTONS */}
      <div className="flex gap-4 pt-4">
        <button
          onClick={close}
          className="px-6 py-3 border rounded hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          onClick={save}
          className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700"
        >
          {question?._id ? "Update Question" : "Save Question"}
        </button>
      </div>
    </div>
  );
}
