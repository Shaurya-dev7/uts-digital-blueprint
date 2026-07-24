"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // We are keeping it fast and fluid as per enterprise standards.
  const variants = {
    hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
    enter: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } 
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      filter: "blur(4px)",
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } 
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        className="flex-1 flex flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
