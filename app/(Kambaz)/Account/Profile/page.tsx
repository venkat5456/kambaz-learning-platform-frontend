
"use client";

import { redirect } from "next/dist/client/components/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { RootState } from "../../store";
import { Button, FormControl } from "react-bootstrap";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  const fetchProfile = () => {
    if (!currentUser) return redirect("/Account/Signin");
    setProfile(currentUser);
  };

  const signout = () => {
    dispatch(setCurrentUser(null));
    redirect("/Account/Signin");
  };

  useEffect(() => {
    fetchProfile();
    // re-run if currentUser changes
  }, [currentUser]);

  return (
    <div id="wd-profile-screen" className="p-3">
      <h1>Profile</h1>
      {profile && (
        <>
          <FormControl
            id="wd-username"
            placeholder="username"
            defaultValue={profile.username}
            className="mb-2"
            onChange={(e) => setProfile({ ...profile, username: e.target.value })}
          /><br />
          <FormControl
            id="wd-password"
            placeholder="password"
            type="password"
            defaultValue={profile.password}
            className="mb-2"
            onChange={(e) => setProfile({ ...profile, password: e.target.value })}
          /><br />
          <FormControl
            id="wd-firstname"
            placeholder="First Name"
            defaultValue={profile.firstName}
            className="mb-2"
            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
          /><br />
          <FormControl
            id="wd-lastname"
            placeholder="Last Name"
            defaultValue={profile.lastName}
            className="mb-2"
            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
          /><br />
          <FormControl
            id="wd-dob"
            type="date"
            defaultValue={profile.dob}
            className="mb-2"
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
          /><br />
          <FormControl
            id="wd-email"
            type="email"
            placeholder="email"
            defaultValue={profile.email}
            className="mb-2"
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          /><br />

          <select
            id="wd-role"
            className="form-control mb-2"
            defaultValue={profile.role}
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>

          <Button
            id="wd-signout-btn"
            variant="danger"
            className="w-100 mt-2"
            onClick={signout}
          >
            Signout
          </Button>
        </>
      )}
    </div>
  );
}
