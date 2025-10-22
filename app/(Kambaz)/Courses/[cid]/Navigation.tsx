"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export default function CourseNavigation({ cid }: { cid: string }) {
  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];

  const pathname = usePathname();

  return (
    <ListGroup id="wd-course-navigation" className="rounded-0 fs-5">
      {links.map((label) => {
        const href = `/Courses/${cid}/${label}`;
        const isActive =
          pathname.endsWith(`/${label}`) ||
          (label === "Home" && pathname === `/Courses/${cid}`);

        return (
          <ListGroupItem
            key={label}
            as={Link}
            href={href}
            id={`wd-course-${label.toLowerCase()}-link`}
            // ✅ New styling: black left border, no red background
            className={`border-0 rounded-0 py-2 ${
              isActive
                ? "border-start border-4 border-dark text-dark bg-white fw-semibold"
                : "text-danger bg-white"
            }`}
            style={{
              textDecoration: "none",
            }}
          >
            {label}
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
}
