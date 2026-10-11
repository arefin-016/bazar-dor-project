"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const Profile = () => {
  const { data: session, isPending } = authClient.useSession();

  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  // Update user name
  const handleUpdateName = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      toast.error("নাম খালি রাখা যাবে না!");
      return;
    }

    if (trimmedName === session?.user.name) {
      toast.info("আপনি কোনো পরিবর্তন করেননি।");
      setIsEditing(false);
      return;
    }

    try {
      setIsSaving(true);

      const { error } = await authClient.updateUser({
        name: trimmedName,
      });

      if (error) {
        toast.error(error.message || "নাম পরিবর্তন করা যায়নি!");
        return;
      }

      toast.success("নাম সফলভাবে পরিবর্তন হয়েছে!");

      setIsEditing(false);
      setName(trimmedName);
    } catch (error) {
      console.error("Update name error:", error);
      toast.error("নাম পরিবর্তন করার সময় সমস্যা হয়েছে!");
    } finally {
      setIsSaving(false);
    }
  };

  // Sign out
  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);

      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "সাইন আউট করা যায়নি!");
        return;
      }

      setIsOpen(false);
      setIsEditing(false);

      toast.success("সফলভাবে সাইন আউট হয়েছে!");
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("সাইন আউট করার সময় সমস্যা হয়েছে!");
    } finally {
      setIsSigningOut(false);
    }
  };

  // Loading state
  if (isPending) {
    return (
      <span className="loading loading-spinner loading-sm" />
    );
  }

  return (
    <div className="relative">
      {session?.user ? (
        <>
          {/* Profile Button */}
          <button
            type="button"
            onClick={() => {
              setIsOpen((prev) => !prev);
              setIsEditing(false);
            }}
            aria-expanded={isOpen}
            aria-label="Open profile menu"
            className="btn btn-ghost flex items-center gap-2"
          >
            {/* Avatar */}
            <div className="avatar placeholder">
              <div className="flex w-8 items-center justify-center rounded-full bg-green-500 text-white">
                <span>
                  {session.user.name?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
            </div>

            {/* User Name */}
            <span>{session.user.name}</span>

            {/* Arrow */}
            <span>{isOpen ? "▲" : "▼"}</span>
          </button>

          {/* Profile Dropdown */}
          {isOpen && (
            <div className="absolute right-0 z-50 mt-3 w-72 rounded-xl border border-base-300 bg-base-100 p-4 shadow-lg">
              {/* Profile Details */}
              <h3 className="mb-3 font-semibold">
                My Profile
              </h3>

              <div className="flex flex-col gap-1">
                <span className="font-medium">
                  {session.user.name}
                </span>

                <span className="break-all text-sm opacity-70">
                  {session.user.email}
                </span>
              </div>

              <div className="divider my-2" />

              {/* Edit Name Section */}
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => {
                    setName(session.user.name || "");
                    setIsEditing(true);
                  }}
                  className="btn btn-ghost btn-sm w-full justify-start"
                >
                  ✏️ Edit Name
                </button>
              ) : (
                <form
                  onSubmit={handleUpdateName}
                  className="flex flex-col gap-3"
                >
                  <label
                    htmlFor="profile-name"
                    className="text-sm font-medium"
                  >
                    Edit Your Name
                  </label>

                  <input
                    id="profile-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="input input-bordered w-full"
                    maxLength={100}
                    autoFocus
                    required
                  />

                  {/* Save Button */}
                  <button
                    type="submit"
                    disabled={isSaving || !name.trim()}
                    className="btn w-full border-none bg-green-500 text-white hover:bg-green-600"
                  >
                    {isSaving ? (
                      <>
                        <span className="loading loading-spinner loading-sm" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </button>

                  {/* Cancel Button */}
                  <button
                    type="button"
                    disabled={isSaving}
                    onClick={() => {
                      setIsEditing(false);
                      setName(session.user.name || "");
                    }}
                    className="btn btn-ghost btn-sm w-full"
                  >
                    Cancel
                  </button>
                </form>
              )}

              <div className="divider my-2" />

              {/* Sign Out Button */}
              <button
                type="button"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="btn btn-ghost btn-sm w-full justify-start text-red-500"
              >
                {isSigningOut ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    Signing out...
                  </>
                ) : (
                  "🚪 Sign Out"
                )}
              </button>
            </div>
          )}
        </>
      ) : (
        /* Sign In / Sign Up */
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/SignIn"
            className="text-sm sm:text-base"
          >
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