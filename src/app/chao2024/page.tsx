"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    days: 0,
  });
    

  const countDown = () => {
    const countDate = new Date("Dec 31, 2024 07:00:00").getTime();
    const now = new Date().getTime();
    const gap = countDate - now;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    setTimeLeft({
      days: Math.floor(gap / day),
      hours: Math.floor((gap / hour) % 24),
      minutes: Math.floor((gap / minute) % 60),
      seconds: Math.floor((gap / second) % 60),
    });
  };

  useEffect(() => {
    const interval = setInterval(countDown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-white dark:text-slate-950 bg-zinc-950 dark:bg-white grid items-center justify-items-center min-h-screen">
      <main className="h-screen flex flex-col gap-8 row-start-2 items-center justify-center sm:items-start">
        <div className="text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-medium tracking-tight">
            #Chao<span className="text-red-500">2024</span>
          </h1>

          <div className="grid grid-cols-4 gap-4 items-center">
            {(["days", "hours", "minutes", "seconds"] as (keyof typeof timeLeft)[]).map((unit, idx) => (
              <div key={idx} className="flex flex-col items-center space-y-2">
                <div className="bg-gray-800 rounded-lg p-4 shadow-lg transition-transform transform hover:scale-105">
                  <span className="text-5xl md:text-6xl font-bold text-red-400">
                    {timeLeft[unit].toString().padStart(2, "0")}
                  </span>
                </div>
                <span className="text-sm md:text-lg uppercase font-medium text-gray-400">
                  {unit.charAt(0).toUpperCase() + unit.slice(1)}
                </span>
              </div>
            ))}
          </div>

          <Button className="text-center text-lg md:text-xl">
            <Link href={"/"}>#2025Live</Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Page;
