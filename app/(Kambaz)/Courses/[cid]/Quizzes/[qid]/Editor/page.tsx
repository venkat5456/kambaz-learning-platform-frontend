"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import DetailsTab from "./DetailsTab";
import QuestionsTab from "./QuestionsTab";

export default function QuizEditorPage() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const pathname = usePathname();

  const isDetails = pathname.endsWith("Editor");
  const isQuestions = pathname.includes("Questions");

  return (
    <div className="p-6">
      {/* PAGE TITLE */}
      <h1 className="text-2xl font-semibold mb-6">Quiz Editor</h1>

      {/* TAB BAR */}
      <div className="flex gap-6 border-b pb-3 mb-6 text-lg">
        <Link
          href={`/Courses/${cid}/Quizzes/${qid}/Editor`}
          className={`pb-2 ${
            isDetails ? "font-bold border-b-4 border-red-600" : ""
          }`}
        >
          Details
        </Link>

        <Link
          href={`/Courses/${cid}/Quizzes/${qid}/Editor/Questions`}
          className={`pb-2 ${
            isQuestions ? "font-bold border-b-4 border-red-600" : ""
          }`}
        >
          Questions
        </Link>
      </div>

      {/* TAB CONTENT */}
      {isDetails && <DetailsTab cid={cid} qid={qid} />}
      {isQuestions && <QuestionsTab cid={cid} qid={qid} />}
    </div>
  );
}
