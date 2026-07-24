"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Shield, Award, HardHat, HeartHandshake, Zap, Settings } from "lucide-react";
import { motion } from "framer-motion";

const values = [
  {
    icon: Shield,
    title: "Integrity",
    description: "We conduct our business with the highest ethical standards, ensuring complete transparency with our partners."
  },
  {
    icon: Award,
    title: "Quality",
    description: "We exclusively source from certified OEMs, guaranteeing uncompromised performance for critical applications."
  },
  {
    icon: HardHat,
    title: "Safety",
    description: "Safety is non-negotiable. Every product we supply is designed to protect both the workforce and the environment."
  },
  {
    icon: HeartHandshake,
    title: "Customer Satisfaction",
    description: "We measure our success by the success and operational uptime of our clients' industrial facilities."
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "We continuously adapt to new industrial technologies to provide the most efficient modern solutions."
  },
  {
    icon: Settings,
    title: "Technical Excellence",
    description: "Our team's engineering expertise ensures you get the exact specifications required for your complex projects."
  }
];

export function CoreValues() {
  return (
    <Section className="bg-white py-24">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-red font-bold tracking-wider uppercase text-sm mb-2 block">What Drives Us</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-navy mb-6">
            Our Core Values
          </h2>
          <p className="text-lg text-gray-600">
            These fundamental principles guide every decision we make, every product we source, and every relationship we build.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, i) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-red/30 hover:shadow-xl transition-all duration-300 group cursor-default"
              >
                <div className="w-14 h-14 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-red transition-all duration-300">
                  <Icon className="w-6 h-6 text-navy group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-red transition-colors duration-300">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
