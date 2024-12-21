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
  const [data, setData] = useState<TimezoneData[]>([]);
  const [newData, setNewData] = useState<TimezoneData[]>([]);
  const [loading, setLoading] = useState(true);
  const [localTime, setLocalTime] = useState<string>("");

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

      const dataWithDifference = fetchedData.map((row) => {
        const localTimestamp = currentUTC + row.gmt_offset;
        const localDate = new Date(localTimestamp * 1000);

        const secondsToMidnight =
          24 * 3600 -
          (localDate.getUTCHours() * 3600 +
            localDate.getUTCMinutes() * 60 +
            localDate.getUTCSeconds());

        return { ...row, secondsToMidnight };
      });

      const minDifference = Math.min(
        ...dataWithDifference.map((row) => row.secondsToMidnight)
      );

      const nearestToMidnight = dataWithDifference.filter(
        (row) => row.secondsToMidnight === minDifference
      );

      setNewData(nearestToMidnight);
      setLoading(false);
    };

    fetchAndFilterData();
    const interval = setInterval(fetchAndFilterData, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!loading && newData.length > 0) {
      setData(newData);

      // Calcular la hora local del primer elemento
      const currentUTC = Math.floor(new Date().getTime() / 1000);
      const firstItem = newData[0];
      const localTimestamp = currentUTC + firstItem.gmt_offset;
      const localDate = new Date(localTimestamp * 1000);

      // Formatear la hora local y añadir el GMT dinámico
      const hours = localDate.getUTCHours().toString().padStart(2, "0");
      const minutes = localDate.getUTCMinutes().toString().padStart(2, "0");
      const seconds = localDate.getUTCSeconds().toString().padStart(2, "0");
      const gmtOffsetHours = firstItem.gmt_offset / 3600;
      const gmtSign = gmtOffsetHours >= 0 ? "+" : "-";

      const formattedTime = `${hours}:${minutes}:${seconds} GMT${gmtSign}${Math.abs(
        gmtOffsetHours
      )}`;

      setLocalTime(formattedTime);
    }
  }, [newData, loading]);

  return (
    <div>
      {/* Reloj global */}
      <div className="flex justify-center items-center my-8">
        <div className="w-full max-w-sm">
          <Card className="bg-zinc-800 text-white shadow-lg border border-red-500">
            <CardContent className="text-center py-4">
              <p className="text-xl uppercase text-gray-400">Timezone Time</p>
              <p className="text-4xl font-bold text-red-500">{localTime}</p>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="text-center my-6">
        <h2 className="text-3xl font-extrabold uppercase text-red-500 tracking-wide">
          Next timezones that will celebrate New Year&apos;s Eve
        </h2>
        <p className="text-sm text-gray-400 mt-2">
          Stay tuned for the next celebrations around the world
        </p>
      </div>

      {/* Tarjetas */}
      <div className="p-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto">
        {data.map((item, index) => (
          <Card
            key={index}
            className="w-[350px] bg-zinc-700 text-white rounded-lg border-red-600 transition-opacity duration-500"
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
              <p>{item.zone_name}</p>
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
        ))}
      </div>
    </div>
  );
};

export default Nye;
