
"use client";

import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { RootState } from "../../store";
import { Button, FormControl } from "react-bootstrap";
import * as client from "../client";

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

  const fetchProfile = () => {
    if (!currentUser) return redirect("/Account/Signin");
    setProfile(currentUser);
  };

  const updateProfile = async () => {
    if (!profile._id) return;
    const updatedProfile = await client.updateUser(profile);
    dispatch(setCurrentUser(updatedProfile));
    alert("Profile updated successfully!");
  };

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    redirect("/Account/Signin");
  };

  useEffect(() => {
    fetchProfile();
  }, [currentUser]);

  return (
    <div id="wd-profile-screen" className="p-3">
      <h1>Profile</h1>

      {profile && (
        <>
          <FormControl
            id="wd-username"
            placeholder="Username"
            value={profile.username || ""}
            className="mb-2"
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })
            }
          />

          <FormControl
            id="wd-password"
            placeholder="Password"
            type="password"
            value={profile.password || ""}
            className="mb-2"
            onChange={(e) =>
              setProfile({ ...profile, password: e.target.value })
            }
          />

          <FormControl
            id="wd-firstname"
            placeholder="First Name"
            value={profile.firstName || ""}
            className="mb-2"
            onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })
            }
          />

          <FormControl
            id="wd-lastname"
            placeholder="Last Name"
            value={profile.lastName || ""}
            className="mb-2"
            onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })
            }
          />

          <FormControl
            id="wd-dob"
            type="date"
            value={profile.dob || ""}
            className="mb-2"
            onChange={(e) =>
              setProfile({ ...profile, dob: e.target.value })
            }
          />

          <FormControl
            id="wd-email"
            type="email"
            placeholder="Email"
            value={profile.email || ""}
            className="mb-2"
            onChange={(e) =>
              setProfile({ ...profile, email: e.target.value })
            }
          />

          <select
            id="wd-role"
            className="form-control mb-2"
            value={profile.role || "STUDENT"}
            onChange={(e) =>
              setProfile({ ...profile, role: e.target.value as Profile["role"] })
            }
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>

          <Button
            id="wd-update-btn"
            variant="primary"
            className="w-100 mt-2"
            onClick={updateProfile}
          >
            Update
          </Button>

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
