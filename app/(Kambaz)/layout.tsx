"use client";

import { ReactNode } from "react";
import KambazNavigation from "./Navigation";
import "./styles.css"; 
import store from "./store"; 
import { Provider } from "react-redux"; 

export default function KambazLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Provider store={store}>
      <div id="wd-kambaz">
        {/* Sidebar (fixed position) */}
        <KambazNavigation />

        {/* Main content offset so it doesn't go under sidebar */}
        <div className="wd-main-content-offset p-3 flex-fill">
          {children}
        </div>
      </div>
    </Provider>
  );
}