"use client";
import { fetchSVGPaths } from "@/utils/supabase/client";
import React, { useEffect, useState, useRef } from "react";

const SvgMap = () => {
  const [paths, setPaths] = useState<{ svg_path: string; active: boolean }[]>(
    []
  );
  const [prevPaths, setPrevPaths] = useState<
    { svg_path: string; active: boolean }[]
  >([]);
  const svgContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadSvg = async () => {
      try {
        const response = await fetch("/world.svg");
        const svgText = await response.text();

        if (svgContainerRef.current) {
          svgContainerRef.current.innerHTML = svgText;
        }
      } catch (error) {
        console.error("Error loading SVG:", error);
      }
    };

    loadSvg();
  }, []);

  useEffect(() => {
    const updatePaths = async () => {
      try {
        const data = await fetchSVGPaths();
        setPaths(data);
      } catch (error) {
        console.error("Error fetching SVG paths:", error);
      }
    };

    updatePaths();
    const interval = setInterval(updatePaths, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (JSON.stringify(paths) !== JSON.stringify(prevPaths)) {
      setPrevPaths(paths);
      paths.forEach((path) => {
        const svgElement = document.getElementById(path.svg_path);
        if (svgElement) {
          svgElement.style.fill = path.active ? "red" : "none";
        }
      });
    }
  }, [paths, prevPaths]);

  return (
    <div>
      <div ref={svgContainerRef} aria-label="SVG Map" />
    </div>
  );
};

export default SvgMap;
