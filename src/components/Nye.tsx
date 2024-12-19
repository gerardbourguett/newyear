import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import React from "react";
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

const Nye = async () => {
  const cookieStore = cookies();
  const supabase = await createClient(cookieStore);

  const { data } = await supabase.from("timezones").select("*");

  // Filtra las filas cuyo `timestamp` esté entre 23:00:00 y 00:00:00
  const filteredData = (data || []).filter((row) => {
    const utc = Math.floor(new Date().getTime() / 1000);
    const localTimestamp = utc + row.gmt_offset;
    const localDate = new Date(localTimestamp * 1000);
    const localTime = localDate.toISOString().split("T")[1].slice(0, 8); // hh:mm:ss
    return localTime >= "23:00:00" && localTime <= "23:59:59";
  });

  return (
    <div>
      <p className="text-center text-xl font-bold uppercase">
        Next countries that will celebrate New Year&apos;s Eve
      </p>
      <div className="p-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto">
        {filteredData.map((item, index) => {
          // Calcula la hora local
          const utc = Math.floor(new Date().getTime() / 1000);
          const localTimestamp = utc + item.gmt_offset;
          const localDate = new Date(localTimestamp * 1000);
          const localTime = localDate
            .toUTCString()
            .split(" ")
            .slice(-2)
            .join(" ");

          return (
            <Card
              key={index}
              className="w-[350px] bg-zinc-700 text-white rounded-lg border-red-600"
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
