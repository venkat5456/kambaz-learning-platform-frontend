"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function AccountNavigation() {
  // ✅ Get the current user from Redux store
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  // ✅ If user is signed in → show Profile
  // ✅ If not signed in → show Signin & Signup
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];

  const pathname = usePathname();

  return (
    <Nav variant="pills" className="flex-column" id="wd-account-navigation">
      {links.map((link) => (
        <NavItem key={link}>
          <NavLink
            as={Link}
            href={`/Account/${link}`}
            active={pathname.endsWith(link.toLowerCase())}
            className="text-dark border-0"
          >
            {link}
          </NavLink>
        </NavItem>
      ))}
    </Nav>
  );
}