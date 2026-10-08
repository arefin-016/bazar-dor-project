import Image from 'next/image';
import React from 'react';

const Navbar = () => {
	return (

<div className='flex justify-between container mx-auto'>

	<div className='flex gap-2 '>
		<div>

		<Image className='bg-[#05893e] p-3 rounded-2xl' src={'/logo-icon.png'} height={50}width={50} alt="logImage"></Image>
		</div>
		<h1 className='text-black text-2xl font-bold'>বাজার দর


		</h1>
	</div>
	<div className='flex gap-3'>
	<button>সাইন ইন</button>
<button className='btn bg-green-400 text-white p-1'>সাইন আপ</button></div>
</div>

	);
};

export default Navbar;