"use client";

import Link from "next/link";

export default function AccountNavigation() {
  return (
    <div id="wd-account-navigation" className="nav flex-column">
      <Link
        href="/Account/Signin"
        className="nav-link active text-dark border-0"
      >
        Signin
      </Link>
      <Link
        href="/Account/Signup"
        className="nav-link text-danger border-0"
      >
        Signup
      </Link>
      <Link
        href="/Account/Profile"
        className="nav-link text-danger border-0"
      >
        Profile
      </Link>
    </div>
  );
}
