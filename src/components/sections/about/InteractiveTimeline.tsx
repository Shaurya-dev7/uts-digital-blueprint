"use client";

import { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { motion, useScroll, useTransform } from "framer-motion";

const milestones = [
  { year: "2013", title: "Company Started", description: "UTS established its headquarters in Jamshedpur to serve local steel plants." },
  { year: "2014-2016", title: "Industrial Expansion", description: "Expanded operations across Jharkhand, supplying heavy machinery and valves." },
  { year: "2017-2020", title: "Agriculture Equipment", description: "Diversified into high-efficiency agriculture equipment and tractors." },
  { year: "2021-2023", title: "Construction Chemicals", description: "Partnered with global brands to supply advanced construction chemicals." },
  { year: "2024-Present", title: "Multi-industry Solutions", description: "Recognized as a premier supplier with over 500+ trusted industrial clients across India." }
];

export function InteractiveTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map vertical scroll progress to horizontal translation
  // We translate from 0% to -60% of the wide container
  const xTransform = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  return (
    <>
      {/* ===== DESKTOP: Horizontal scroll driven by vertical scrolling ===== */}
      {/* 
        The outer div is h-[300vh] — this creates the vertical scroll runway.
        The sticky div pins itself to the viewport while the user scrolls.
        scrollYProgress maps the scroll through h-[300vh] → horizontal translation.
      */}
      <div className="hidden lg:block relative h-[300vh] bg-gray-50" ref={containerRef} id="timeline">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          {/* Heading — inside sticky so it stays visible */}
          <Container>
            <div className="text-center mb-12">
              <span className="text-red font-bold tracking-wider uppercase text-sm mb-2 block">Our Journey</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-navy">
                A Decade of Evolution
              </h2>
            </div>
          </Container>

          {/* Horizontal scrolling track */}
          <div className="relative flex-1 flex items-center overflow-hidden">
            <motion.div
              style={{ x: xTransform }}
              className="flex absolute left-0 top-0 bottom-0 items-center"
              // Total width = milestones * card spacing + padding
              // Using a fixed width ensures predictable scroll
            >
              {/* Horizontal center line */}
              <div className="absolute top-1/2 left-0 -translate-y-1/2 h-[3px] bg-gray-200 z-0" style={{ width: `${milestones.length * 450 + 200}px` }} />

              {/* Animated red progress line */}
              <motion.div
                className="absolute top-1/2 left-0 -translate-y-1/2 h-[3px] bg-red z-[1]"
                style={{
                  width: `${milestones.length * 450 + 200}px`,
                  scaleX: scrollYProgress,
                  transformOrigin: "left"
                }}
              />

              {/* Milestone nodes */}
              {milestones.map((m, i) => (
                <div
                  key={i}
                  className="relative flex flex-col items-center group"
                  style={{ width: "450px", flexShrink: 0 }}
                >
                  {/* Dot on the line */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="w-5 h-5 rounded-full bg-white border-4 border-red shadow-lg group-hover:scale-150 transition-transform duration-300" />
                  </div>

                  {/* Year label — sits on the line */}
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 font-extrabold text-7xl text-gray-100/60 pointer-events-none select-none whitespace-nowrap z-0 ${i % 2 === 0 ? "-translate-y-[calc(100%+28px)]" : "translate-y-[28px]"}`}>
                    {m.year}
                  </div>

                  {/* Content card */}
                  <motion.div
                    initial={{ opacity: 0, y: i % 2 === 0 ? 20 : -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`absolute left-1/2 -translate-x-1/2 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 text-center w-[340px] z-10 cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-shadow duration-300 ${
                      i % 2 === 0
                        ? "bottom-[calc(50%+24px)]"
                        : "top-[calc(50%+24px)]"
                    }`}
                  >
                    <div className="text-xs font-bold text-red uppercase tracking-widest mb-2">{m.year}</div>
                    <h3 className="text-xl font-bold text-navy mb-2">{m.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{m.description}</p>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Scroll hint */}
          <div className="text-center pb-6">
            <motion.p
              className="text-sm text-gray-400 font-medium"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              Scroll to explore our journey ↓
            </motion.p>
          </div>
        </div>
      </div>

      {/* ===== MOBILE: Vertical Timeline ===== */}
      <section className="lg:hidden py-16 md:py-24 bg-gray-50" id="timeline-mobile">
        <Container>
          <div className="text-center mb-12">
            <span className="text-red font-bold tracking-wider uppercase text-sm mb-2 block">Our Journey</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy">
              A Decade of Evolution
            </h2>
          </div>

          <div className="relative border-l-4 border-gray-200 ml-4 space-y-12 pb-8">
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                className="relative pl-8"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="absolute -left-[14px] top-1 w-6 h-6 rounded-full bg-white border-4 border-red shadow-sm" />
                <div className="text-red font-bold text-xl mb-1">{m.year}</div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-navy mb-2">{m.title}</h3>
                  <p className="text-gray-500 text-sm">{m.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
