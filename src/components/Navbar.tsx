import Image from 'next/image';
import React from 'react';
import Profile from './Profile';

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

	<Profile></Profile>
  </div>

	);
};

export default Navbar;