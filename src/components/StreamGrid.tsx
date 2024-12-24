"use client";
import React, { useEffect, useState } from "react";
import StreamCard from "./StreamCard";
import { supabase } from "@/utils/supabase/server";

const StreamGrid = () => {
  interface Stream {
    id: string;
    title: string;
    country: string;
    link: string;
  }

  const [streams, setStreams] = useState<Stream[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener los datos
  const fetchStreams = async () => {
    const {
      data: live,
      error,
      status,
      count,
    } = await supabase.from("live").select("*", { count: "exact" });

    console.log("Status:", status);
    console.log("Count:", count);
    console.log("Live Data:", live);
    console.log("Error:", error);

    if (error) {
      setError(error.message);
    } else {
      setStreams(live || []);
    }
  };

  // Llamada inicial para obtener los datos
  useEffect(() => {
    fetchStreams();
  }, []); // Solo al cargar el componente

  // Establecer intervalo para obtener los datos cada 5 minutos
  useEffect(() => {
    const interval = setInterval(() => {
      fetchStreams();
    }, 10000); // 300000 ms = 5 minutos

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  }, []); // Este useEffect se ejecuta una sola vez cuando el componente se monta

  if (error) {
    return <p className="text-name-500">Error: {error}</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Live Streams</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {streams.length > 0 ? (
          streams.map((stream) => (
            <StreamCard
              key={stream.id}
              title={stream.title}
              country={stream.country}
              link={stream.link}
            />
          ))
        ) : (
          <p className="text-name-500">Loading streams...</p>
        )}
      </div>
    </div>
  );
};

export default StreamGrid;
