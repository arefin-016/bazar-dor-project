import Image from 'next/image';
import React from 'react';

const Banner = () => {
	return (<div className='container mx-auto bg-base-100 shadow-sm p-5 my-5 rounded-2xl'>
		<div className='flex justify-between'>

			{/* Left*/}
			<div>

				<p>date</p>
				<h1 className='font-bold text-4xl overflow-hidden'>আজকের বাজারের দাম এক নজরে</h1>
				<p className='text-gray-500 mt-3'>চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-<br></br>সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।</p>
				<button>Deatils</button>
			</div>



			{/* Right */}
			<div>

				<Image src={'/bazar-hero.png'} alt="HeroImage" width={300} height={300}></Image>
			</div>
		</div>
		</div>
	);
};

export default Banner;