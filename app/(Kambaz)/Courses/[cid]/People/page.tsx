"use client";
import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "next/navigation";
import * as db from "../../../Database";

// ✅ Define simple types instead of using `any`
interface User {
  _id: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  loginId?: string;
  section?: string;
  role?: string;
  lastActivity?: string;
  totalActivity?: string;
}

interface Enrollment {
  user: string;
  course: string;
}

export default function PeopleTable() {
  const { cid } = useParams();
  const { users, enrollments } = db;

  return (
    <div id="wd-people-table" className="p-3">
      <h2 className="mb-4">People</h2>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>

        {/* ✅ Dynamic, data-driven table rows */}
        <tbody>
          {users
            .filter((usr: User) =>
              enrollments.some(
                (enrollment: Enrollment) =>
                  enrollment.user === usr._id && enrollment.course === cid
              )
            )
            .map((user: User) => {
              const displayName =
                user.firstName && user.lastName
                  ? `${user.firstName} ${user.lastName}`
                  : user.name || "Unnamed User";

              return (
                <tr key={user._id}>
                  <td className="wd-full-name text-nowrap">
                    <FaUserCircle className="me-2 fs-1 text-secondary" />
                    {displayName}
                  </td>
                  <td className="wd-login-id">{user.loginId}</td>
                  <td className="wd-section">{user.section}</td>
                  <td className="wd-role">{user.role}</td>
                  <td className="wd-last-activity">{user.lastActivity}</td>
                  <td className="wd-total-activity">{user.totalActivity}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}
