"use client";

import type { User } from "../client";

export default function UsersTable({ users = [] }: { users: User[] }) {
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
          {users.map((user: User) => (
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
