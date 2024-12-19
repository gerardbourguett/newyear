import React from "react";
import Nye from "../../components/Nye";
import Watch from "../../components/Watch";

const page = () => {
  return (
    <div>
      <div className="">
        <div className="">
          <h1 className="text-6xl md:text-7xl font-medium tracking-tight text-center">
            Coming to <span className="text-red-600">2025</span>
          </h1>
          {/* Reloj digital en formato digital */}
          <div className="flex justify-center mt-16">
            <Watch />
          </div>
          <div className="flex justify-center items-center mt-16">
            <Nye />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
