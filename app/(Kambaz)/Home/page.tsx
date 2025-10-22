"use client";
import Link from "next/link";
import { Card } from "react-bootstrap";

export default function Home() {
  return (
    <div className="container py-5 text-center">
      <h1 className="fw-bold mb-3 text-primary">Welcome to Kambaz</h1>
      <p className="text-secondary mb-4">
        Your learning portal for courses, modules, and assignments.
      </p>

      <div className="d-flex justify-content-center gap-3 flex-wrap">
        <Card className="p-4 shadow-sm" style={{ width: "18rem" }}>
          <h5 className="mb-3">Dashboard</h5>
          <Link href="/Dashboard" className="btn btn-primary w-100">
            Go to Dashboard
          </Link>
        </Card>

        <Card className="p-4 shadow-sm" style={{ width: "18rem" }}>
          <h5 className="mb-3">Courses</h5>
          <Link href="/Courses" className="btn btn-success w-100">
            View Courses
          </Link>
        </Card>

        <Card className="p-4 shadow-sm" style={{ width: "18rem" }}>
          <h5 className="mb-3">Labs</h5>
          <Link href="/Labs" className="btn btn-warning w-100">
            Explore Labs
          </Link>
        </Card>
      </div>
    </div>
  );
}
