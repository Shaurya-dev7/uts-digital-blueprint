"use client";
import React, { useEffect, useState, useRef } from "react";

const metrics = [
  { label: "Years of Excellence", value: 40, suffix: "+" },
  { label: "Leading Brands", value: 50, suffix: "+" },
  { label: "Enterprise Customers", value: 200, suffix: "+" },
  { label: "Products Delivered", value: 10, suffix: "k+" }
];

export function TrustMetrics() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 bg-[#0B1120] relative border-y border-slate-800" ref={ref}>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-800/50 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          {metrics.map((metric, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center p-8 bg-[#0F172A] hover:bg-slate-800/80 transition-colors duration-300">
              <div className="text-4xl md:text-5xl font-extrabold flex items-baseline text-[#F97316] mb-3">
                {isVisible ? (
                  <Counter end={metric.value} duration={2000} />
                ) : (
                  <span>0</span>
                )}
                <span>{metric.suffix}</span>
              </div>
              <p className="text-sm md:text-sm text-slate-400 font-medium tracking-wide">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Simple counter component
function Counter({ end, duration }: { end: number, duration: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutQuart
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeProgress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <span>{count}</span>;
}
