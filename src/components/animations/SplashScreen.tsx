"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide splash screen after 2.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(4px)" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] bg-[#0B1120] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Industrial Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center"
          >
            <div className="flex items-center gap-4">
              {/* Premium Logo Animation */}
              <div className="relative w-16 h-16 flex items-center justify-center bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-2xl">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-tr from-[#F97316]/20 to-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <span className="text-3xl font-extrabold text-white tracking-tighter relative z-10">UTS</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-xl tracking-wide uppercase leading-tight">Universal</span>
                <span className="text-[#F97316] font-bold text-xl tracking-wide uppercase leading-tight">Techno Services</span>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="mt-12 w-48 h-1 bg-slate-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-[#F97316]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
