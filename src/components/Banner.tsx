
import Image from 'next/image';
import React from 'react';

const Banner = () => {
  return (
    <div className="container mx-auto my-5 px-4">
      <div className="bg-base-100 shadow-sm p-5 sm:p-8 md:p-10 rounded-2xl">

        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Left Section */}
          <div className="w-full md:w-3/5 text-center md:text-left">

            <p className="text-sm sm:text-base text-gray-500 mb-3">
              আজকের বাজারদর
            </p>

            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="text-gray-500 text-sm sm:text-base mt-4 leading-7">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
              বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
              দামের পরিবর্তন এক জায়গায়।
            </p>

            <button className="btn btn-primary mt-5 px-6">
              বিস্তারিত দেখুন
            </button>

          </div>

          {/* Right Section */}
          <div className="w-full md:w-2/5 flex justify-center">

            <Image
              src="/bazar-hero.png"
              alt="বাজারদরের ছবি"
              width={400}
              height={400}
              priority
              className="w-full max-w-[220px] sm:max-w-[280px] md:max-w-[350px] h-auto object-contain"
            />

          </div>

        </div>
      </div>
    </div>
  );
};

export default Banner;
