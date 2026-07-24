"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { Magnetic } from "@/components/animations/Magnetic";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import dynamic from "next/dynamic";
import { TextReveal } from "@/components/animations/TextReveal";
import { Loader2 } from "lucide-react";



export function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    setMousePosition({ x: clientX, y: clientY });
  };

  return (
    <section 
      ref={ref} 
      onMouseMove={handleMouseMove}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
    >
      {/* Mouse Responsive Lighting */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(249,115,22,0.1), transparent 40%)`,
        }}
      />

      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0 bg-navy"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 to-navy/50 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }} 
        />
      </motion.div>

      <Container className="relative z-20 pt-32 pb-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center rounded-full border border-red/30 bg-red/10 px-4 py-1.5 text-sm font-semibold text-red uppercase tracking-wider mb-8 backdrop-blur-sm">
              Established 2013 • Jamshedpur
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight mb-6">
              <TextReveal text="Engineering Industrial" /> <br/>
              <span className="text-[#F97316]">
                <TextReveal text="Excellence" delay={0.2} />
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mb-10 font-medium">
              Industrial Valves • Agriculture Equipment • Construction Chemicals
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Magnetic strength={0.2}>
              <Button size="lg" className="bg-[#F97316] hover:bg-[#F97316]/90 text-white h-14 px-8 text-lg w-full sm:w-auto shadow-lg shadow-[#F97316]/20">
                Request Quote
              </Button>
            </Magnetic>
            <Magnetic strength={0.2}>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-navy h-14 px-8 text-lg w-full sm:w-auto">
                Explore Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Magnetic>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
        >
          {[
            { value: 12, suffix: "+", label: "Years Experience" },
            { value: 100, suffix: "+", label: "Products" },
            { value: 500, suffix: "+", label: "Satisfied Clients" },
            { value: 15, suffix: "+", label: "Industries Served" },
          ].map((stat, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl hover:bg-white/15 transition-colors cursor-default">
              <div className="text-3xl md:text-4xl font-extrabold text-white mb-1">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm font-medium text-gray-300 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>


      </Container>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <ChevronDown className="text-white/50 w-8 h-8" />
      </div>
    </section>
  );
}
