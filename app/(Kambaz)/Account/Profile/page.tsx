
"use client";

import { redirect } from "next/dist/client/components/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { RootState } from "../../store";
import { Button, FormControl } from "react-bootstrap";

// ✅ Define the Profile interface for strong typing
interface Profile {
  _id?: string;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  email?: string;
  role?: "USER" | "ADMIN" | "FACULTY" | "STUDENT";
}

export default function Profile() {
  const [profile, setProfile] = useState<Profile>({});
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  const fetchProfile = (): void => {
    if (!currentUser) return redirect("/Account/Signin");
    setProfile(currentUser);
  };

  const signout = (): void => {
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
            placeholder="Username"
            defaultValue={profile.username}
            className="mb-2"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setProfile({ ...profile, username: e.target.value })
            }
          /><br />

          <FormControl
            id="wd-password"
            placeholder="Password"
            type="password"
            defaultValue={profile.password}
            className="mb-2"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setProfile({ ...profile, password: e.target.value })
            }
          /><br />

          <FormControl
            id="wd-firstname"
            placeholder="First Name"
            defaultValue={profile.firstName}
            className="mb-2"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setProfile({ ...profile, firstName: e.target.value })
            }
          /><br />

          <FormControl
            id="wd-lastname"
            placeholder="Last Name"
            defaultValue={profile.lastName}
            className="mb-2"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setProfile({ ...profile, lastName: e.target.value })
            }
          /><br />

          <FormControl
            id="wd-dob"
            type="date"
            defaultValue={profile.dob}
            className="mb-2"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setProfile({ ...profile, dob: e.target.value })
            }
          /><br />

          <FormControl
            id="wd-email"
            type="email"
            placeholder="Email"
            defaultValue={profile.email}
            className="mb-2"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setProfile({ ...profile, email: e.target.value })
            }
          /><br />

          <select
            id="wd-role"
            className="form-control mb-2"
            defaultValue={profile.role}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setProfile({ ...profile, role: e.target.value as Profile["role"] })
            }
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