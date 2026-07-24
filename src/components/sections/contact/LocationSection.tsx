"use client";

import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { CompanyInformation } from "./CompanyInformation";

// Dynamically import the map to avoid SSR hydration issues
const LocationMap = dynamic(() => import("./LocationMap").then(mod => mod.LocationMap), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-100 rounded-2xl border border-slate-200 animate-pulse flex items-center justify-center">
      <div className="text-slate-400 font-medium">Loading Map...</div>
    </div>
  )
});

export function LocationSection() {
  return (
    <div className="container mx-auto px-4 md:px-6 mb-24">
      <div className="mb-10 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
          Global Reach, Local Presence
        </h2>
        <p className="text-lg text-slate-600 leading-relaxed">
          Visit our headquarters in Jamshedpur to discuss your industrial engineering needs. Our enterprise support team is available during business hours.
        </p>
      </div>

      <div className="relative w-full overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <div className="flex flex-col lg:flex-row items-stretch">
        {/* Map Container (70%) */}
        <motion.div 
          className="w-full lg:w-[70%] min-h-[400px] lg:min-h-[650px] relative"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <LocationMap className="!rounded-none !border-0 lg:!border-r" />
        </motion.div>

        {/* Business Information Card (30%) */}
        <motion.div 
          className="w-full lg:w-[30%] bg-white relative z-10"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <div className="h-full">
            <CompanyInformation />
          </div>
        </motion.div>
      </div>
    </div>
    </div>
  );
}
