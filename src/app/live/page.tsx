import React from "react";
import Nye from "../../components/Nye";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";

const page = () => {
  return (
    <div>
      <div className="">
        <ModeToggle />
        <div className="">
          <h1 className="text-6xl md:text-7xl font-medium tracking-tight text-center">
            #RoadTo<span className="text-red-600">2025</span>
          </h1>
          {/* Reloj digital en formato digital */}

          <div className="flex justify-center items-center mt-16">
            <Nye />
          </div>
          <Button className="text-center text-lg md:text-xl">
            <Link href={"/"}>#2025Live</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
