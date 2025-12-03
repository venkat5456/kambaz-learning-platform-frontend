"use client";

import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaPencil, FaCheck } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { FormControl } from "react-bootstrap";
import * as client from "../../../Account/client";

export default function PeopleDetails({ uid, onClose }) {
  const [user, setUser] = useState<any>({});
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);

  // LOAD THE USER
  const fetchUser = async () => {
    if (!uid) return;
    const data = await client.findUserById(uid);
    setUser(data);
    setName(`${data.firstName} ${data.lastName}`);
  };

  useEffect(() => {
    fetchUser();
  }, [uid]);

  if (!uid) return null;

  // SAVE USER
  const saveUser = async () => {
    const [firstName, ...rest] = name.trim().split(" ");
    const lastName = rest.join(" ");

    const updatedUser = { ...user, firstName, lastName };

    // ⭐ FIXED — must send (id, body)
    await client.updateUser(updatedUser._id!, updatedUser);

    setUser(updatedUser);
    setEditing(false);
    onClose();
  };

  const deleteUserHandler = async () => {
    await client.deleteUser(uid);
    onClose();
  };

  return (
    <div
      className="position-fixed top-0 end-0 bottom-0 bg-white shadow p-4"
      style={{ width: "330px", zIndex: 999 }}
    >
      <IoCloseSharp
        onClick={onClose}
        className="fs-1 position-absolute end-0 top-0 m-3"
        style={{ cursor: "pointer" }}
      />

      {/* PROFILE ICON */}
      <div className="text-center mt-4 mb-3">
        <FaUserCircle className="text-secondary" style={{ fontSize: "65px" }} />
      </div>

      <hr />

      {/* NAME + EDIT */}
      <div className="position-relative mb-4">
        {!editing && (
          <FaPencil
            className="position-absolute end-0 top-50 translate-middle-y text-secondary"
            style={{ fontSize: "20px", cursor: "pointer" }}
            onClick={() => setEditing(true)}
          />
        )}

        {editing && (
          <FaCheck
            className="position-absolute end-0 top-50 translate-middle-y text-danger"
            style={{ fontSize: "24px", cursor: "pointer" }}
            onClick={saveUser}
          />
        )}

        {!editing && (
          <div
            className="fs-4 text-danger"
            style={{ paddingRight: "35px", cursor: "pointer" }}
            onClick={() => setEditing(true)}
          >
            {user.firstName} {user.lastName}
          </div>
        )}

        {editing && (
          <FormControl
            className="fs-5 py-2"
            value={name}
            autoFocus
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                saveUser();   // ⭐ ENTER NOW WORKS
              }
            }}
          />
        )}
      </div>

      {/* DETAILS */}
      <div className="mt-2">
        <b>Role:</b> {user.role || "—"} <br />
        <b>Login ID:</b> {user.username || "—"} <br />
        <b>Section:</b> {user.section || "—"} <br />
        <b>Total Activity:</b> {user.totalActivity || "—"} <br />
      </div>

      <hr className="mt-4" />

      <div className="d-flex justify-content-end gap-2">
        <button className="btn btn-secondary" onClick={onClose}>
          Cancel
        </button>

        <button className="btn btn-danger" onClick={deleteUserHandler}>
          Delete
        </button>
      </div>
    </div>
  );
}
