"use client";

import { useEffect, useState } from "react";
import { getQuizById, updateQuiz } from "../../client";
import RichTextEditor from "./RichTextEditor";
import { useRouter } from "next/navigation";

export default function DetailsTabContent({ cid, qid }: any) {
  const router = useRouter();
  const [quiz, setQuiz] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const data = await getQuizById(qid);
      setQuiz(data);
    };
    load();
  }, [qid]);

  if (!quiz) return <p>Loading...</p>;

  // Update quiz state from inputs
  const handleChange = (e: any) => {
    const { name, value, checked, type } = e.target;

    setQuiz((prev: any) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const saveQuiz = async () => {
    await updateQuiz(qid, quiz);
    alert("Saved!");
    router.refresh();
  };

  const saveAndPublish = async () => {
    await updateQuiz(qid, { ...quiz, published: true });
    alert("Saved & Published!");
    router.push(`/Courses/${cid}/Quizzes`);
  };

  return (
    <div className="max-w-4xl space-y-6">

      {/* TITLE */}
      <div>
        <label className="text-sm font-semibold">Quiz Title</label>
        <input
          type="text"
          name="title"
          value={quiz.title || ""}
          onChange={handleChange}
          className="w-full mt-1 border rounded p-2"
        />
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="text-sm font-semibold">Quiz Instructions</label>
        <RichTextEditor
          content={quiz.description || ""}
          onChange={(value: string) =>
            setQuiz((prev: any) => ({ ...prev, description: value }))
          }
        />
      </div>

      {/* QUIZ TYPE */}
      <div>
        <label className="text-sm font-semibold">Quiz Type</label>
        <select
          name="quizType"
          value={quiz.quizType || "GRADED"}
          onChange={handleChange}
          className="w-full mt-1 border rounded p-2"
        >
          <option value="GRADED">Graded Quiz</option>
          <option value="PRACTICE">Practice Quiz</option>
          <option value="SURVEY">Graded Survey</option>
        </select>
      </div>

      {/* ASSIGNMENT GROUP */}
      <div>
        <label className="text-sm font-semibold">Assignment Group</label>
        <select
          name="group"
          value={quiz.group || "ASSIGNMENTS"}
          onChange={handleChange}
          className="w-full mt-1 border rounded p-2"
        >
          <option value="ASSIGNMENTS">ASSIGNMENTS</option>
          <option value="QUIZZES">QUIZZES</option>
        </select>
      </div>

      {/* ⭐⭐⭐ OPTIONS SECTION (Updated to match rubric) */}
      <div className="border p-4 rounded">
        <p className="font-semibold mb-2">Options</p>

        {/* SHUFFLE ANSWERS */}
        <label className="block">
          <input
            type="checkbox"
            name="shuffle"
            checked={quiz.shuffle || false}
            onChange={handleChange}
          />{" "}
          Shuffle Answers
        </label>

        {/* ⭐ NEW — TIME LIMIT ENABLED CHECKBOX */}
        <label className="block mt-3">
          <input
            type="checkbox"
            name="hasTimeLimit"
            checked={quiz.hasTimeLimit || false}
            onChange={handleChange}
          />{" "}
          Time Limit Enabled
        </label>

        {/* TIME LIMIT INPUT */}
        <div className="flex gap-2 mt-2">
          <input
            type="number"
            name="timeLimit"
            value={quiz.timeLimit || ""}
            onChange={handleChange}
            className="border rounded p-2 w-32"
            disabled={!quiz.hasTimeLimit}
          />
          <span className="mt-2">Minutes</span>
        </div>

        {/* MULTIPLE ATTEMPTS */}
        <label className="block mt-3">
          <input
            type="checkbox"
            name="allowAttempts"
            checked={quiz.allowAttempts || false}
            onChange={handleChange}
          />{" "}
          Allow Multiple Attempts
        </label>
      </div>

      {/* ⭐ NEW — POINTS INPUT (Required by rubric) */}
      <div>
        <label className="text-sm font-semibold">Points</label>
        <input
          type="number"
          name="points"
          value={quiz.points || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded mt-1"
        />
      </div>

      {/* ASSIGN SECTION */}
      <div className="border p-4 rounded">
        <p className="font-semibold mb-2">Assign To</p>

        <input
          type="text"
          disabled
          value="Everyone"
          className="border rounded p-2 w-full bg-gray-100"
        />

        {/* DATE INPUTS */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div>
            <label className="text-sm font-semibold">Due</label>
            <input
              type="datetime-local"
              name="dueDate"
              value={quiz.dueDate || ""}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Available From</label>
            <input
              type="datetime-local"
              name="availableFrom"
              value={quiz.availableFrom || ""}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Until</label>
            <input
              type="datetime-local"
              name="untilDate"
              value={quiz.untilDate || ""}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            />
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={() => router.back()}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>

        <button
          onClick={saveQuiz}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save
        </button>

        {/* ⭐ NEW — SAVE & PUBLISH BUTTON (Rubric requirement) */}
        <button
          onClick={saveAndPublish}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Save & Publish
        </button>
      </div>
    </div>
  );
}
