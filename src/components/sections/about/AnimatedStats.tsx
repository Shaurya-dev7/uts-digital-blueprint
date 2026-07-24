"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";

const stats = [
  { value: 12, label: "Years in Business", suffix: "+" },
  { value: 500, label: "Active Customers", suffix: "+" },
  { value: 1000, label: "Premium Products", suffix: "+" },
  { value: 50, label: "Global Brands", suffix: "+" },
  { value: 15, label: "Core Industries", suffix: "+" },
  { value: 2500, label: "Projects Completed", suffix: "+" }
];

export function AnimatedStats() {
  return (
    <Section className="bg-red py-16 md:py-24 text-white">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="text-4xl md:text-5xl font-extrabold mb-2 font-mono flex items-baseline">
                <AnimatedCounter value={stat.value} duration={2} />
                <span>{stat.suffix}</span>
              </div>
              <div className="text-red-100 font-medium text-sm md:text-base uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
