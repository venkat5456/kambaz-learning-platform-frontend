"use client";

import type { User } from "../client";  // ← only added this

export default function UsersTable({ users = [] }) {
  return (
    <div id="wd-users-table">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user: User) => (   // ← changed ONLY this line
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.role}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
