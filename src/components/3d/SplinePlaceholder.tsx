"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Loader2 } from "lucide-react";

interface SplinePlaceholderProps {
  title?: string;
  className?: string;
  futureUrl?: string; // Placeholder for when Spline is actually integrated
}

export function SplinePlaceholder({ title = "3D Asset Placeholder", className = "" }: SplinePlaceholderProps) {
  // In the future, this would track the loading state of the actual Spline scene
  const [isReady, setIsReady] = useState(false);

  // Simulate loading for the placeholder effect
  React.useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative w-full h-full min-h-[400px] bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 ${className}`}>
      {/* Industrial Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
      
      <AnimatePresence>
        {!isReady && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-sm"
          >
            <Loader2 className="w-8 h-8 text-[#F97316] animate-spin mb-4" />
            <span className="text-slate-400 text-sm tracking-widest uppercase font-mono">Initializing WebGL Canvas</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wireframe Placeholder Graphic */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <motion.div
          animate={{ 
            rotateY: [0, 360],
            rotateX: [10, 30, 10]
          }}
          transition={{ 
            rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
            rotateX: { duration: 10, repeat: Infinity, ease: "easeInOut" }
          }}
          className="text-slate-700/50 mb-6"
          style={{ transformStyle: "preserve-3d" }}
        >
          <Box className="w-48 h-48" strokeWidth={1} />
        </motion.div>
        <div className="bg-slate-800/80 px-4 py-2 rounded-lg border border-slate-700 backdrop-blur-md">
          <p className="text-slate-300 font-mono text-sm tracking-wider">{title}</p>
        </div>
      </div>
    </div>
  );
}
