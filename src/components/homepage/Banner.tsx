"use client"
import React from "react";
import bannerImg from "@/assets/banner.png";
import Image from "next/image";
import Link from "next/link";

const Banner = () => {

  const handleScrollToLibrary = () => {
    document.getElementById("library")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mt-5 bg-base-100 rounded-2xl p-6 md:p-14 min-h-[280px] md:min-h-[380px] gap-8 container mx-auto max-w-7xl">
      <div className="flex flex-col gap-3 text-center md:text-left">
        <h3 className="text-lime-400 text-sm font-semibold uppercase tracking-wide">
          Workout Library
        </h3>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
          TRAIN WITH INTENT. LOG EVERY SET.
        </h2>
        <p className="text-sm md:text-base text-gray-400 max-w-md mx-auto md:mx-0">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into
          today&apos;s plan, and watch the week&apos;s work add up.
        </p>       
        <button 
        onClick={handleScrollToLibrary}
        className="mt-2 mx-auto md:mx-0 w-fit bg-lime-400 text-black font-semibold px-6 py-2 md:px-8 md:py-3 rounded-full hover:cursor-pointer"
        
        >
          Browse workouts
        </button>
      </div>
      <div className="shrink-0">
        <Image
          src={bannerImg}
          alt=""
          priority
          className="w-56 h-56 md:w-96 md:h-96 object-contain"
        />
      </div>
      
    </div>
  );
};

export default Banner;
