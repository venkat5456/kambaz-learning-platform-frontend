"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const pathname = usePathname();

  return (
    <Nav variant="pills" className="flex-column" id="wd-account-navigation">

      {!currentUser && (
        <>
          <NavItem>
            <NavLink as={Link} href="/Account/Signin">Signin</NavLink>
          </NavItem>
          <NavItem>
            <NavLink as={Link} href="/Account/Signup">Signup</NavLink>
          </NavItem>
        </>
      )}

      {currentUser && (
        <>
          <NavItem>
            <NavLink as={Link} href="/Account/Profile">Profile</NavLink>
          </NavItem>

          {currentUser.role === "ADMIN" && (
            <NavItem>
              <NavLink as={Link} href="/Account/Users">Users</NavLink>
            </NavItem>
          )}
        </>
      )}

    </Nav>
  );
}
