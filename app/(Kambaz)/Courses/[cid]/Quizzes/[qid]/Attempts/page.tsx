"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getQuizById, getAttemptsForQuiz } from "../../client";

export default function QuizAttemptsPage() {
  const { cid, qid } = useParams();
  const [quiz, setQuiz] = useState<any>(null);
  const [attempts, setAttempts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const qz = await getQuizById(qid as string);
      setQuiz(qz);

      const list = await getAttemptsForQuiz(qid as string);
      setAttempts(list);
      setLoading(false);
    };
    load();
  }, [qid]);

  if (loading) return <div className="p-4">Loading attempts…</div>;

  return (
    <div className="container mt-4" style={{ maxWidth: "900px" }}>
      <h2 className="mb-3">
        Attempts — {quiz?.title || "Quiz"}
      </h2>

      {attempts.length === 0 ? (
        <p>No attempts yet.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Attempt</th>
              <th>Score</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {attempts.map((a: any) => (
              <tr key={a._id}>
                <td>{a.attemptNumber}</td>
                <td>
                  {a.score} / {a.maxScore}
                </td>
                <td>
                  {new Date(a.createdAt || a.updatedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="mt-3 d-flex justify-content-between">
        <Link
          href={`/Courses/${cid}/Quizzes/${qid}`}
          className="btn btn-outline-secondary"
        >
          Back to Quiz Details
        </Link>
        <Link
          href={`/Courses/${cid}/Quizzes/${qid}/Results`}
          className="btn btn-primary"
        >
          View Last Attempt
        </Link>
      </div>
    </div>
  );
}
