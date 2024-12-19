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

interface TimezoneData {
  gmt_offset: number;
  country_code: string;
  country_name: string;
  zone_name: string;
  secondsToMidnight: number;
}

const Nye = () => {
  const [data, setData] = useState<TimezoneData[]>([]);
  const [newData, setNewData] = useState<TimezoneData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndFilterData = async () => {
      const { data: fetchedData, error } = await supabase
        .from("timezones")
        .select("*");

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

    fetchAndFilterData(); // Llama inicialmente
    const interval = setInterval(fetchAndFilterData, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Cuando newData cambia, actualiza data
    if (!loading && newData.length > 0) {
      setData(newData);
    }
  }, [newData, loading]);

  return (
    <div>
      <p className="text-center text-xl font-bold uppercase">
        Next countries that will celebrate New Year&apos;s Eve
      </p>
      <div className="p-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto">
        {data.map((item, index) => {
          const currentUTC = Math.floor(new Date().getTime() / 1000);
          const localTimestamp = currentUTC + item.gmt_offset;
          const localDate = new Date(localTimestamp * 1000);
          const localTime = localDate
            .toUTCString()
            .split(" ")
            .slice(-2)
            .join(" ");

          return (
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
                  <Badge variant="destructive">{localTime}</Badge>
                </CardDescription>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Nye;
