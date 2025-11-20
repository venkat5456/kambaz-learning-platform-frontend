"use client";

import { ReactNode } from "react";
import KambazNavigation from "./Navigation";
import "./styles.css"; 
import store from "./store"; 
import { Provider } from "react-redux"; 
import Session from "./Account/Session";  // ⭐ ADD THIS IMPORT

export default function KambazLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Provider store={store}>
      <Session> {/* ⭐ CHECK SESSION BEFORE RENDERING APP */}
        <div id="wd-kambaz">
          {/* Sidebar (fixed position) */}
          <KambazNavigation />

          {/* Main content */}
          <div className="wd-main-content-offset p-3 flex-fill">
            {children}
          </div>
        </div>
      </Session>
    </Provider>
  );
}
