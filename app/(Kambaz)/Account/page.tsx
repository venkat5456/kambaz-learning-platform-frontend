"use client";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { redirect } from "next/navigation";

export default function AccountPage() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  // ✅ If no one is signed in → go to Signin
  if (!currentUser) {
    redirect("/Account/Signin");
  }

  // ✅ If someone is signed in → go to Profile
  redirect("/Account/Profile");
}