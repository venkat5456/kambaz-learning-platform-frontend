"use client";

import { ReactNode } from "react";
import KambazNavigation from "./Navigation";
import "./styles.css"; // ✅ import your custom styles

export default function KambazLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div id="wd-kambaz">
      {/* Sidebar (fixed position) */}
      <KambazNavigation />

      {/* Main content offset so it doesn't go under sidebar */}
      <div className="wd-main-content-offset p-3 flex-fill">
        {children}
      </div>
    </div>
  );
}
