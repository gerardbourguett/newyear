"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Timezone = {
  country_name: string;
  country_code: string;
  timezone_name: string;
  gmt_offset: number;
  timestamp: string;
};

export const columns: ColumnDef<Timezone>[] = [
  {
    accessorKey: "country_name",
    header: "País",
  },
  {
    accessorKey: "country_code",
    header: "Código",
  },
  {
    accessorKey: "zone_name",
    header: "Huso Horario",
  },
  {
    accessorKey: "gmt_offset",
    header: "GMT Offset",
  },
  {
    accessorKey: "timestamp",
    header: "Hora local",
    cell: ({ row }) => {
      //capturar la hora utc sin milisegundos
      const utc = Math.floor(new Date().getTime() / 1000);
      const localDate = utc + row.original.gmt_offset;
      const date = new Date(localDate * 1000);
      return date.toUTCString().split(" ").slice(-2).join(" ");
    },
  },
];
