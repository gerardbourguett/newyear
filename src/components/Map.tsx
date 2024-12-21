"use client";
import Image from "next/image";
import React, { FC, useEffect } from "react";
import WorldSVG from "@/assets/world.svg";

interface Timezone {
  offset: number;
  label: string;
  top: string;
  left: string;
}

const timezones: Timezone[] = [
  { offset: -12, label: "GMT-12", top: "10%", left: "5%" },
  { offset: -11, label: "GMT-11", top: "15%", left: "10%" },
  { offset: 0, label: "GMT", top: "50%", left: "50%" },
  { offset: 12, label: "GMT+12", top: "85%", left: "90%" },
];

const Map: FC = () => {
  const [currentOffset, setCurrentOffset] = React.useState<number | null>(null);

  useEffect(() => {
    const updateTimezone = () => {
      const currentUTC = Math.floor(new Date().getTime() / 1000);
      const currentHour = new Date(currentUTC * 1000).getUTCHours();

      setCurrentOffset(currentHour - 12);
    };

    updateTimezone();
    const interval = setInterval(updateTimezone, 1000);
    return () => clearInterval(interval);
  });

  return (
    <div className="relative w-full h-auto">
      <Image
        src="/world.svg"
        width={800}
        height={600}
        layout="responsive"
        alt={""}
      />

      {timezones.map((zone, index) => (
        <div
          key={index}
          className={`absolute ${
            currentOffset === zone.offset ? "bg-red-500" : "bg-transparent"
          } opacity-80 rounded-full w-8 h-8 flex items-center justify-center`}
          style={{
            top: zone.top,
            left: zone.left,
            transform: "translate(-50%, -50%)",
          }}
        >
          {currentOffset === zone.offset && (
            <span className="text-white text-xs font-bold">{zone.label}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Map;
