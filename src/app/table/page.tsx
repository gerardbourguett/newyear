import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import React from 'react'

const page = async () => {
  const cookieStore = cookies();
  const supabase = await createClient(cookieStore);

  type Timezone = {
    country_code: string;
    country_name: string;
    zone_name: string;
    gmt_offset: number;
  };

  const { data } = await supabase.from("timezones").select("*");

  return (
    <div>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">País</th>
            <th className="border border-gray-300 px-4 py-2">Código</th>
            <th className="border border-gray-300 px-4 py-2">Zona Horaria</th>
            <th className="border border-gray-300 px-4 py-2">GMT Offset</th>
            <th className="border border-gray-300 px-4 py-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((timezone: Timezone) => (
            <tr key={timezone.zone_name} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{timezone.country_name}</td>
              <td className="border border-gray-300 px-4 py-2">{timezone.country_code}</td>
              <td className="border border-gray-300 px-4 py-2">{timezone.zone_name}</td>
              <td className="border border-gray-300 px-4 py-2">{timezone.gmt_offset}</td>
               <td className="border border-gray-300 px-4 py-2">
                {new Date((Math.floor(Date.now() / 1000) + timezone.gmt_offset) * 1000)
                  .toLocaleString('es-ES', {
                    timeZone: 'UTC',
                    dateStyle: 'medium',
                    timeStyle: 'medium'
                  })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default page
