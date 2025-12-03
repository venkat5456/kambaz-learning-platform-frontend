"use client";

import { useEffect, useState } from "react";
import PeopleTable from "./Table";
import * as coursesClient from "../../../Courses/client";
import { useParams } from "next/navigation";

export default function PeoplePage() {
  const [users, setUsers] = useState<any[]>([]);
  const { cid } = useParams(); // course ID from URL

  const fetchUsers = async () => {
    if (!cid) return;
    const result = await coursesClient.findUsersForCourse(cid as string);
    setUsers(result);
  };

  useEffect(() => {
    fetchUsers();
  }, [cid]);

  return (
    <div className="p-3">
      <h2 className="mb-4">People Enrolled in this Course</h2>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}
