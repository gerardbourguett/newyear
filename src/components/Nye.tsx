"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CountryFlag from "react-country-flag";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface TimezoneData {
  gmt_offset: number;
  country_code: string;
  country_name: string;
  zone_name: string;
  secondsToMidnight: number;
  city: string;
  stream: string;
}

const Nye = () => {
  const [localTime, setLocalTime] = useState<string>("");
  const [closest, setClosest] = useState<TimezoneData[]>([]);
  const [nextGroup, setNextGroup] = useState<TimezoneData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndFilterData = async () => {
      const { data: fetchedData, error } = await supabase
        .from("timezones")
        .select("*")
        .is("active", true);

      if (error) {
        console.error("Error fetching data:", error);
        return;
      }

      const currentUTC = Math.floor(new Date().getTime() / 1000);
      const targetDate = new Date("2025-01-01T00:00:00Z").getTime() / 1000;

      const dataWithDifference = fetchedData.map((row) => {
        const localTimestamp = currentUTC + row.gmt_offset;
        const secondsToTarget = targetDate - localTimestamp;
        return { ...row, secondsToTarget };
      });

      const sortedData = dataWithDifference
        .filter((row) => row.secondsToTarget > 0)
        .sort((a, b) => a.secondsToTarget - b.secondsToTarget);

      const closestGroup = sortedData.filter(
        (row) => row.secondsToTarget === sortedData[0].secondsToTarget
      );
      const nextGroup = sortedData.filter(
        (row) =>
          row.secondsToTarget > sortedData[0].secondsToTarget &&
          row.secondsToTarget <=
            Math.min(
              ...sortedData
                .filter(
                  (item) => item.secondsToTarget > sortedData[0].secondsToTarget
                )
                .map((item) => item.secondsToTarget)
            )
      );
      /* const subsequentGroup = sortedData.filter(
        (row) => !closestGroup.includes(row) && !nextGroup.includes(row)
      ); */

      setClosest(closestGroup);
      setNextGroup(nextGroup);
      setLoading(false);

      if (closestGroup.length > 0) {
        const firstItem = closestGroup[0];
        const localTimestamp = currentUTC + firstItem.gmt_offset;
        const localDate = new Date(localTimestamp * 1000);

        const year = localDate.getUTCFullYear();
        const month = (localDate.getUTCMonth() + 1).toString().padStart(2, "0");
        const day = localDate.getUTCDate().toString().padStart(2, "0");
        const hours = localDate.getUTCHours().toString().padStart(2, "0");
        const minutes = localDate.getUTCMinutes().toString().padStart(2, "0");
        const seconds = localDate.getUTCSeconds().toString().padStart(2, "0");

        const gmtOffsetHours = firstItem.gmt_offset / 3600;
        const gmtSign = gmtOffsetHours >= 0 ? "+" : "-";

        const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds} GMT${gmtSign}${Math.abs(
          gmtOffsetHours
        )}`;
        setLocalTime(formattedTime);
      }
    };

    fetchAndFilterData();
    const interval = setInterval(fetchAndFilterData, 1000);
    return () => clearInterval(interval);
  }, []);

  const renderCards = (data: TimezoneData[]) =>
    data.map((item, index) => (
      <Card
        key={index}
        className="bg-zinc-700 text-white rounded-lg border-red-600 transition-opacity duration-500"
      >
        <CardHeader className="flex items-center justify-center">
          <CardTitle>
            <CountryFlag
              countryCode={item.country_code}
              svg
              style={{ fontSize: 64 }}
              title={item.country_name}
              alt={item.country_name}
            />
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="font-bold uppercase">{item.country_name}</p>
          <p>{item.city}</p>
        </CardContent>
        <CardFooter>
          <CardDescription>
            {item.stream && (
              <Link
                href={item.stream}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Badge className="bg-red-600">LIVE</Badge>
              </Link>
            )}
          </CardDescription>
        </CardFooter>
      </Card>
    ));

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Reloj Global */}
      <div className="flex justify-center items-center my-8">
        <div className="w-full max-w-sm mx-auto">
          <Card className="bg-zinc-800 text-white shadow-lg border border-red-500">
            <CardContent className="text-center py-4">
              <p className="text-xl uppercase text-gray-400">Timezone Time</p>
              <p className="text-4xl font-bold text-red-500">{localTime}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Sección de husos horarios */}
      <div className="text-center my-6">
        <h2 className="text-3xl font-extrabold uppercase text-red-500 tracking-wide">
          Next timezones celebrating New Year&apos;s Eve
        </h2>
        <p className="text-sm text-gray-400 mt-2">
          Stay tuned for celebrations around the world
        </p>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-red-500 my-4">
          Closest to Midnight
        </h3>
        <div className="p-4 grid grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 mx-auto">
          {renderCards(closest)}
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-yellow-500 my-4">Next Up</h3>
        <div className="p-4 grid grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 mx-auto">
          {renderCards(nextGroup)}
        </div>
      </div>
    </div>
  );
};

export default Nye;
