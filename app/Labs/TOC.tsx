"use client";

import { Nav, NavItem, NavLink } from "react-bootstrap";
import Link from "next/link";

export default function TOC() {
  return (
    <Nav variant="pills" className="mb-3">
      <NavItem>
        <Link href="/Labs" passHref legacyBehavior>
          <NavLink>Labs</NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link href="/Labs/Lab1" passHref legacyBehavior>
          <NavLink>Lab 1</NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link href="/Labs/Lab2" passHref legacyBehavior>
          <NavLink>Lab 2</NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link href="/Labs/Lab3" passHref legacyBehavior>
          <NavLink>Lab 3</NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link href="/" passHref legacyBehavior>
          <NavLink>Kambaz</NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <NavLink href="https://github.com/venkat5456" target="_blank">
          My GitHub
        </NavLink>
      </NavItem>
    </Nav>
  );
}
