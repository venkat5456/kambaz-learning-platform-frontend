"use client";

import { useParams } from "next/navigation";
import QuestionsTab from "../QuestionsTab";

export default function QuestionsPage() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Quiz Editor</h1>

      {/* Tab Header */}
      <div className="flex gap-6 border-b pb-3 mb-6 text-lg">
        <a
          href={`/Courses/${cid}/Quizzes/${qid}/Editor`}
          className="pb-2"
        >
          Details
        </a>

        <a
          href={`/Courses/${cid}/Quizzes/${qid}/Editor/Questions`}
          className="pb-2 font-bold border-b-4 border-red-600"
        >
          Questions
        </a>
      </div>

      {/* Questions Editor */}
      <QuestionsTab cid={cid} qid={qid} />
    </div>
  );
}
