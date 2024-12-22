"use client";
import SvgMap from "@/components/SvgMap";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    progress: 0,
  });

  const year = new Date().getFullYear();

  const countDownto2025 = () => {
    const startDate = new Date(Date.UTC(year, 0, 1, 0, 0, 0)).getTime(); // Usar UTC para evitar problemas de zona horaria
    const endDate = new Date(Date.UTC(year + 1, 0, 1, 0, 0, 0)).getTime();

    const now = new Date().getTime();

    const totalDuration = endDate - startDate;
    const elapsed = now - startDate;
    const progress = (elapsed / totalDuration) * 100;

    setTimeLeft({
      progress: Math.min(100, Math.max(0, progress)),
    });
  };

  useEffect(() => {
    const interval = setInterval(countDownto2025, 1000);
    return () => clearInterval(interval);
  });
  return (
    <div className="">
      <div className="flex justify-center items-center h-screen">
        <SvgMap />
      </div>
      <main className="flex flex-col gap-8 items-center justify-center">
        {" "}
        <div>
          <h1 className="text-5xl md:text-7xl font-medium tracking-tight">
            #{year + 1}
            <span className="text-red-500">Live</span>
          </h1>
        </div>
        {/* Barra de progreso */}
        <div className="w-full max-w-md mx-auto">
          <div className="relative h-4 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="absolute h-full bg-red-500 transition-all duration-500"
              style={{ width: `${timeLeft.progress}%` }}
            />
          </div>
          <p className="text-gray-400 mt-2 text-center">
            {year} Progress: {timeLeft.progress.toFixed(5)}%
          </p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-4">
          <Button className="text-center text-lg md:text-xl mt-4 mb-4">
            <Link href="/live">#RoadTo{year + 1}</Link>
          </Button>
          <Button
            className="text-center text-lg md:text-xl mt-4 mb-4"
            variant={"destructive"}
            disabled
          >
            <Loader2 className="animate-spin" />{" "}
            <Link href="/chao2024">Dec 31, {year} 10:00 UTC</Link>
          </Button>
        </div>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://timezonedb.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            TimezoneDB
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://www.twitch.tv/vanderfondi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/twitch.svg"
              alt="Twitch icon"
              width={16}
              height={16}
            />
            Twitch
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="/chao2024"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/calendar.svg"
              alt="Calendar icon"
              width={16}
              height={16}
            />
            #Chao2024
          </a>
        </footer>
      </main>
    </div>
  );
}
