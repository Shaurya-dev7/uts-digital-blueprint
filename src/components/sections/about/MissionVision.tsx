"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { motion } from "framer-motion";
import { Target, Lightbulb } from "lucide-react";

export function MissionVision() {
  return (
    <Section className="bg-gray-50 py-24 border-t border-gray-100">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          
          {/* Mission Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="group relative bg-white rounded-3xl p-8 lg:p-12 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
              <Target className="w-48 h-48 text-navy" />
            </div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-red/10 text-red rounded-2xl flex items-center justify-center mb-8 group-hover:bg-red group-hover:text-white transition-colors duration-500">
                <Target className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-extrabold text-navy mb-4">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                To empower India's core industries with reliable, high-performance engineering equipment. We strive to be the most technically proficient supplier, ensuring our clients experience zero downtime through rapid procurement, authentic parts, and unparalleled technical support.
              </p>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative bg-navy rounded-3xl p-8 lg:p-12 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
              <Lightbulb className="w-48 h-48 text-white" />
            </div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/10 text-white rounded-2xl flex items-center justify-center mb-8 group-hover:bg-white group-hover:text-navy transition-colors duration-500">
                <Lightbulb className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-extrabold text-white mb-4">Our Vision</h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                To be universally recognized as the definitive benchmark for industrial supply chain excellence in Asia. We envision a future where UTS is synonymous with uncompromised quality, driving sustainable industrial growth and infrastructural development across the nation.
              </p>
            </div>
          </motion.div>

        </div>
      </Container>
    </Section>
  );
}
