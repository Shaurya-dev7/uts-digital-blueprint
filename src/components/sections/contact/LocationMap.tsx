"use client";

import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Navigation } from "lucide-react";

interface LocationMapProps {
  className?: string;
}

export function LocationMap({ className = "" }: LocationMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // UTS Headquarters Coordinates
  const lng = 86.22329865;
  const lat = 22.78456685;
  const zoom = 14;

  useEffect(() => {
    if (map.current || !mapContainer.current) return; // Initialize map only once

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://tiles.openfreemap.org/styles/liberty",
      center: [lng, lat],
      zoom: zoom,
      attributionControl: false, // We'll add a custom attribution control to keep it clean
      maxZoom: 19,
      minZoom: 3,
    });

    // Add navigation controls (zoom, compass)
    map.current.addControl(new maplibregl.NavigationControl({ showCompass: false }), "bottom-right");

    // Add custom attribution
    map.current.addControl(
      new maplibregl.AttributionControl({
        compact: true,
        customAttribution: '<a href="https://openfreemap.org" target="_blank">OpenFreeMap</a>',
      }),
      "bottom-left"
    );

    // Fallback timeout in case 'load' event doesn't fire due to network blockers
    const fallbackTimeout = setTimeout(() => {
      setIsMapLoaded(true);
    }, 2500);

    map.current.on("load", () => {
      clearTimeout(fallbackTimeout);
      setIsMapLoaded(true);

      if (!map.current) return;

      // Create a custom HTML marker
      const el = document.createElement("div");
      el.className = "custom-marker";
      el.innerHTML = `
        <div class="relative flex items-center justify-center w-12 h-12">
          <div class="absolute inset-0 bg-[#F97316] rounded-full animate-ping opacity-20"></div>
          <div class="relative bg-white p-2.5 rounded-full shadow-lg border-2 border-[#F97316] z-10 flex items-center justify-center transition-transform hover:scale-110">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F97316" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
        </div>
      `;

      // Add marker to map
      new maplibregl.Marker({ element: el })
        .setLngLat([lng, lat])
        .setPopup(
          new maplibregl.Popup({ offset: 25, className: "uts-popup" }).setHTML(
            `<div class="p-4 min-w-[200px]">
              <h4 class="font-bold text-slate-900 text-base mb-1">Universal Techno Services</h4>
              <p class="text-sm text-slate-600 mb-3 border-b border-slate-100 pb-2">Industrial Engineering Solutions</p>
              <p class="text-xs text-slate-500 mb-1">P/14 Pragati Nagar, Baridih</p>
              <p class="text-xs text-slate-500 mb-3">Jamshedpur, Jharkhand 831017</p>
              <a href="https://maps.google.com/?q=Universal+Techno+Services,Jamshedpur" target="_blank" class="inline-block w-full text-center bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-semibold py-2 px-3 rounded transition-colors">
                Get Directions
              </a>
            </div>`
          )
        )
        .addTo(map.current);
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <div className={`relative w-full h-full bg-slate-100 rounded-2xl overflow-hidden shadow-sm border border-slate-200 group ${className}`}>
      {/* Loading Skeleton */}
      {!isMapLoaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-50 animate-pulse">
          <div className="flex flex-col items-center text-slate-400">
            <Navigation className="w-8 h-8 mb-4 animate-bounce text-slate-300" />
            <div className="w-32 h-4 bg-slate-200 rounded-full mb-2"></div>
            <div className="w-24 h-3 bg-slate-200 rounded-full"></div>
          </div>
        </div>
      )}
      
      {/* Map Container */}
      <div ref={mapContainer} className="absolute inset-0 w-full h-full transition-opacity duration-700" style={{ opacity: isMapLoaded ? 1 : 0 }} />

      {/* Global overrides for popup styles */}
      <style dangerouslySetInnerHTML={{__html: `
        .uts-popup .maplibregl-popup-content {
          padding: 0;
          border-radius: 12px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
          border: 1px solid #f1f5f9;
        }
        .uts-popup .maplibregl-popup-close-button {
          top: 10px;
          right: 10px;
          color: #94a3b8;
          font-size: 16px;
        }
        .uts-popup .maplibregl-popup-close-button:hover {
          background: transparent;
          color: #0f172a;
        }
      `}} />
    </div>
  );
}
