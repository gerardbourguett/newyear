"use client";
import React, { useEffect, useState } from "react";

const Watch = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const hours = currentTime.getHours().toString().padStart(2, "0");
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
  const seconds = currentTime.getSeconds().toString().padStart(2, "0");

  return (
    <div className="">
      {/* <h1 className="text-6xl md:text-7xl font-medium tracking-tight text-center mb-4">
        Your local<span className="text-red-600">time</span>
      </h1> */}
      <div className="grid grid-cols-3 gap-4 items-center">
        <div className="flex flex-col items-center space-y-2">
          <div className="bg-gray-800 rounded-lg p-4 shadow-lg transition-transform transform hover:scale-105">
            <span className="text-5xl md:text-6xl font-bold text-red-400">
              {hours}
            </span>
          </div>
          <span className="text-sm md:text-lg uppercase font-medium text-gray-400">
            {/* Hours */}
          </span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="bg-gray-800 rounded-lg p-4 shadow-lg transition-transform transform hover:scale-105">
            <span className="text-5xl md:text-6xl font-bold text-red-400">
              {minutes}
            </span>
          </div>
          <span className="text-sm md:text-lg uppercase font-medium text-gray-400">
            {/* Minutes */}
          </span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="bg-gray-800 rounded-lg p-4 shadow-lg transition-transform transform hover:scale-105">
            <span className="text-5xl md:text-6xl font-bold text-red-400">
              {seconds}
            </span>
          </div>
          <span className="text-sm md:text-lg uppercase font-medium text-gray-400">
            {/* Seconds */}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Watch;
