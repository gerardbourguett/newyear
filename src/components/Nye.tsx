"use server";
import { createClient } from "@/utils/supabase/server";
import { Card } from "./ui/card";

export default async function Nye() {
  const supabase = createClient();

  const { data: todos } = await (await supabase)
    .from("timezones")
    .select("city");

  return <div className="flex flex-col space-y-3">
    <Card>
      
    </Card>
  </div>;
}

/**
 * <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
 */