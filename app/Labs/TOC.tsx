"use client";

import { Nav, NavItem, NavLink } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TOC() {
  const pathname = usePathname();

  return (
    <Nav variant="pills" className="mb-3">
      <NavItem>
        <NavLink
          as={Link}
          href="/Labs"
          className={pathname.endsWith("/Labs") ? "active" : ""}
        >
          Labs
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          as={Link}
          href="/Labs/Lab1"
          className={pathname.endsWith("/Lab1") ? "active" : ""}
        >
          Lab 1
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          as={Link}
          href="/Labs/Lab2"
          className={pathname.endsWith("/Lab2") ? "active" : ""}
        >
          Lab 2
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          as={Link}
          href="/Labs/Lab3"
          className={pathname.endsWith("/Lab3") ? "active" : ""}
        >
          Lab 3
        </NavLink>
      </NavItem>

      {/* ⭐ Lab 4 added here */}
      <NavItem>
        <NavLink
          as={Link}
          href="/Labs/Lab4"
          className={pathname.endsWith("/Lab4") ? "active" : ""}
        >
          Lab 4
        </NavLink>
      </NavItem>

      {/* ⭐ Lab 5 added here */}
      <NavItem>
        <NavLink
          as={Link}
          href="/Labs/Lab5"
          className={pathname.endsWith("/Lab5") ? "active" : ""}
        >
          Lab 5
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink as={Link} href="/">
          Kambaz
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink href="https://github.com/venkat5456" target="_blank">
          My GitHub
        </NavLink>
      </NavItem>
    </Nav>
  );
}