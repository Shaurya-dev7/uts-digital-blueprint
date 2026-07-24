"use client";
import { motion } from "framer-motion";
import { useState } from "react";

interface Logo {
  name: string;
  src: string;
}

export function LogoMarquee({ logos }: { logos: Logo[] }) {
  return (
    <div className="overflow-hidden whitespace-nowrap flex group w-full py-6 bg-transparent border-none">
      <motion.div
        className="flex gap-20 px-8 items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 40, repeat: Infinity }}
      >
        {/* Render multiple times for a seamless loop */}
        {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
          <LogoItem key={index} logo={logo} />
        ))}
      </motion.div>
    </div>
  );
}

function LogoItem({ logo }: { logo: Logo }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex-shrink-0 relative h-20 w-52 bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.15)] hover:-translate-y-1 flex items-center justify-center transition-all duration-300 border border-gray-100 overflow-hidden">
      {!imgError ? (
        <img 
          src={logo.src} 
          alt={logo.name}
          className="object-cover w-full h-full opacity-90 hover:opacity-100 transition-opacity"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="text-lg md:text-xl font-bold text-gray-800 uppercase tracking-wider transition-all cursor-default text-center px-4">
          {logo.name}
        </span>
      )}
    </div>
  );
}
