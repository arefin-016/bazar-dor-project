import Image from 'next/image';
import React from 'react';

const Navbar = () => {
	return (

<div className="container mx-auto flex items-center justify-between px-4 py-3">
  {/* Logo + Title */}
  <div className="flex items-center gap-2">
    <Image
      className="rounded-xl bg-[#05893e] p-2 sm:p-3"
      src="/logo-icon.png"
      height={50}
      width={50}
      alt="Logo"
    />

    <h1 className="text-lg font-bold text-black sm:text-2xl">
      বাজার দর
    </h1>
  </div>

  {/* Buttons */}
  <div className="flex gap-2 sm:gap-3">
    <button className="text-sm sm:text-base">
      সাইন ইন
    </button>

    <button className="btn bg-green-400 px-2 text-sm text-white sm:px-3 sm:text-base">
      সাইন আপ
    </button>
  </div>
</div>
	);
};

export default Navbar;