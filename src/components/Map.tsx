"use client";
import { fetchSVGPaths } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";

const SvgMap = () => {
  const [paths, setPaths] = useState([]);
  const [svgContent, setSvgContent] = useState(null);

  useEffect(() => {
    const loadSvg = async () => {
      try {
        const response = await fetch("/world.svg"); // Ruta relativa en `public`
        const svgText = await response.text();
        setSvgContent(svgText);
      } catch (error) {
        console.error("Error loading SVG:", error);
      }
    };

    loadSvg();
  }, []);

  useEffect(() => {
    const loadPaths = async () => {
      try {
        const data = await fetchSVGPaths();
        setPaths(data);
      } catch (error) {
        console.error("Error fetching SVG paths:", error);
      }
    };

    loadPaths();
  }, []);

  useEffect(() => {
    // Colorea los paths según las condiciones
    if (svgContent) {
      paths.forEach((path) => {
        const svgElement = document.getElementById(path.svg_path);
        if (svgElement) {
          svgElement.style.fill = path.active ? "green" : "red";
        }
      });
    }
  }, [paths, svgContent]);

  return (
    <div>
      <h1>Interactive SVG Map</h1>
      {/* Inserta el contenido SVG dinámicamente */}
      <div
        dangerouslySetInnerHTML={{ __html: svgContent }}
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
};

export default SvgMap;
