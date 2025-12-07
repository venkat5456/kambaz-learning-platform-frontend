"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getQuizById, getCurrentUser } from "../../client";

export default function QuizDetailsPage() {
  const { cid, qid } = useParams();
  const router = useRouter();

  const [quiz, setQuiz] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  // LOAD QUIZ + USER
  useEffect(() => {
    const load = async () => {
      const userData = await getCurrentUser();
      console.log("USER:", userData);
      setUser(userData);

      const quizData = await getQuizById(qid as string);
      setQuiz(quizData);
    };

    load();
  }, [qid]);

  if (!quiz) return <p className="p-5">Loading...</p>;

  // DETERMINE ROLE
  const isFaculty = user?.role === "FACULTY";
  const isStudent = user?.role === "STUDENT";

  return (
    <div className="px-10 py-6">
      
      {/* ---------- TOP BUTTONS ---------- */}
      <div className="flex justify-end gap-3 mb-4">

        {/* FACULTY ONLY: PREVIEW */}
        {isFaculty && (
          <Link
            href={`/Courses/${cid}/Quizzes/${qid}/Preview`}
            className="px-4 py-2 border rounded bg-gray-100 hover:bg-gray-200"
          >
            Preview
          </Link>
        )}

        {/* FACULTY ONLY: EDIT */}
        {isFaculty && (
          <Link
            href={`/Courses/${cid}/Quizzes/${qid}/Editor`}
            className="px-4 py-2 border rounded bg-gray-100 hover:bg-gray-200"
          >
            Edit
          </Link>
        )}

        {/* STUDENT ONLY: TAKE QUIZ */}
        {isStudent && (
          <Link
            href={`/Courses/${cid}/Quizzes/${qid}/Take`}
            className="px-4 py-2 border rounded bg-green-600 text-white hover:bg-green-700"
          >
            Take Quiz
          </Link>
        )}
      </div>

      {/* ---------- TITLE & DETAILS ---------- */}
      <div className="border p-5 rounded">
        <h1 className="text-2xl font-bold mb-4">
          {quiz.title || "Untitled Quiz"}
        </h1>

        <div className="space-y-2 text-sm">
          <DetailsRow label="Quiz Type" value="Graded Quiz" />
          <DetailsRow label="Points" value={quiz.points} />
          <DetailsRow label="Assignment Group" value="QUIZZES" />
          <DetailsRow label="Shuffle Answers" value={quiz.shuffleAnswers ? "Yes" : "No"} />
          <DetailsRow label="Time Limit" value={`${quiz.timeLimit} Minutes`} />
          <DetailsRow label="Multiple Attempts" value={quiz.multipleAttempts ? "Yes" : "No"} />
          <DetailsRow label="View Responses" value="Always" />
          <DetailsRow label="Show Correct Answers" value="Immediately" />
          <DetailsRow label="One Question at a Time" value={quiz.oneQuestionAtATime ? "Yes" : "No"} />
        </div>

        {/* ---------- DATES TABLE ---------- */}
        <table className="w-full text-left text-sm mt-6">
          <thead className="border-b">
            <tr>
              <th className="py-2">Due</th>
              <th>For</th>
              <th>Available from</th>
              <th>Until</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2">{quiz.dueDate || "N/A"}</td>
              <td>Everyone</td>
              <td>{quiz.availableDate || "N/A"}</td>
              <td>{quiz.untilDate || "N/A"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Helper row renderer
function DetailsRow({ label, value }: any) {
  return (
    <div className="flex gap-10">
      <div className="font-bold w-48">{label}</div>
      <div>{value}</div>
    </div>
  );
}
