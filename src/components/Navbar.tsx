"use client";

import Image from "next/image";
import React from "react";
import Profile from "./Profile";

const Navbar = () => {
  const today = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="container mx-auto flex items-center justify-between px-4 py-3">
      {/* Logo + Title + Bangla Date */}
      <div className="flex items-center gap-2">
        <Image
          className="rounded-xl bg-[#05893e] p-2 sm:p-3"
          src="/logo-icon.png"
          height={50}
          width={50}
          alt="Logo"
        />

        <div className="flex flex-col">
          <h1 className="text-lg font-bold text-black sm:text-2xl">
            বাজার দর
          </h1>

          <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
            {today}
          </p>
        </div>
      </div>

      {/* Profile */}
      <Profile />
    </div>
  );
};

export default Navbar;
