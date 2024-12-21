import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

export async function fetchSVGPaths() {
  const { data, error } = await createClient().from("timezones").select("svg_path, gmt_offset, active, country_code");
  
  if(error) {
    throw error;
  }
  return data;
}
