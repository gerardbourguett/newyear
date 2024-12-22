import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

export async function fetchSVGPaths() {
  const { data, error } = await createClient().from("timezones").select("*");

  if (error) {
    throw error;
  }

  // Fecha base: 22 de diciembre de 2024 a las 00:00 UTC
  const baseDate = new Date("2024-12-22T00:00:00Z");

  // Calcula si cada zona ya pasó la medianoche
  const now = new Date();
  const updatedData = data.map((entry) => {
    const localTime = new Date(now.getTime() + entry.gmt_offset * 3600 * 1000);
    const hasPassedMidnight = localTime >= baseDate;
    console.log(entry, localTime, baseDate, hasPassedMidnight);
    return {
      ...entry,
      active: hasPassedMidnight, // Marca como "activo" si ya pasó la medianoche
    };
  });

  return updatedData;
}
