"use client";
import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  overflow?: "hidden" | "visible";
}

export function Reveal({ children, width = "fit-content", delay = 0, direction = "up", overflow = "hidden" }: RevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const prefersReducedMotion = useReducedMotion();

  // If user prefers reduced motion, disable transforms and just fade
  if (prefersReducedMotion) {
    return (
      <div ref={ref} style={{ width, overflow }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.5, delay }}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  const getInitialPosition = () => {
    switch (direction) {
      case "up": return { y: 40, opacity: 0 };
      case "down": return { y: -40, opacity: 0 };
      case "left": return { x: 40, opacity: 0 };
      case "right": return { x: -40, opacity: 0 };
      case "none": return { opacity: 0 };
      default: return { y: 40, opacity: 0 };
    }
  };

  return (
    <div ref={ref} style={{ width, position: "relative", overflow }}>
      <motion.div
        variants={{
          hidden: getInitialPosition(),
          visible: { opacity: 1, y: 0, x: 0 },
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }} // Custom industrial ease
      >
        {children}
      </motion.div>
    </div>
  );
}
