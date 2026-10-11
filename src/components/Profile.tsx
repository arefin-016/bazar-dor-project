"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { toast } from "react-toastify";

const Profile = () => {
  const { data: session, isPending } = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut();
	toast.success("সফলভাবে সাইন আউট হয়েছে!")
  };

  // Loading state
  if (isPending) {
    return (
      <span className="loading loading-spinner loading-sm"></span>
    );
  }

  return (
    <div>
      {session?.user ? (
        // User Dropdown
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost flex items-center gap-2"
          >
            <div className="avatar placeholder">
              <div className="w-8 rounded-full flex items-center bg-green-500 justify-center text-white">
                <span>{session.user.name?.charAt(0).toUpperCase()}</span>
              </div>
            </div>

            <span>{session.user.name}</span>

            <span>▼</span>

          </div>

          {/* Dropdown Content */}
          <ul
            tabIndex={0}
            className="menu dropdown-content z-50 mt-3 w-64 rounded-box bg-base-100 p-4 shadow-lg"
          >
            {/* Profile Details */}
            <li className="menu-title">
              <span>My Profile</span>
            </li>

            <li>
              <div className="pointer-events-none flex flex-col items-start gap-1">
                <span className="font-semibold">
                  {session.user.name}
                </span>

                <span className="text-sm opacity-70">
                  {session.user.email}
                </span>
              </div>
            </li>

            <div className="divider my-1"></div>

            {/* Profile Link */}


            {/* Sign Out */}
            <li>
              <button
                onClick={handleSignOut}
                className="text-red-500"
              >
                🚪 Sign Out
              </button>
            </li>
          </ul>
        </div>
      ) : (
        // Sign In / Sign Up
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/SignIn" className="text-sm sm:text-base">
            সাইন ইন
          </Link>

          <Link
            href="/SIgnUp"
            className="btn bg-green-500 px-2 text-sm text-white sm:px-3 sm:text-base"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default Profile;
