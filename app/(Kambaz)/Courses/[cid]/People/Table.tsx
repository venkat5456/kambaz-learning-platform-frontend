"use client";

import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import PeopleDetails from "./Details";
import type { User } from "../../../Account/client";   // ✔ correct path & type

export default function PeopleTable({
  users = [],
  fetchUsers,
}: {
  users?: User[];            // ✔ replace any[] → User[]
  fetchUsers: () => void;
}) {
  const [showDetails, setShowDetails] = useState(false);
  const [uid, setUid] = useState<string | null>(null);

  return (
    <div id="wd-people-table" className="p-3">
      {showDetails && (
        <PeopleDetails
          uid={uid}
          onClose={() => {
            setShowDetails(false);
            setUid(null);
            fetchUsers();
          }}
        />
      )}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user: User) => (        // ✔ replace any → User
            <tr key={user._id}>
              <td
                className="text-danger fw-bold"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setUid(user._id ?? null);   // ✔ safe for string | null
                  setShowDetails(true);
                }}
              >
                <FaUserCircle className="me-2 fs-3 text-secondary" />
                {user.firstName} {user.lastName}
              </td>

              {/* Login ID */}
              <td>{user.username ?? "—"}</td>

              {/* No section info available */}
              <td>—</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
