"use client";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { StatisticCard } from "@/components/cards/StatisticCard";

export function StatisticsSection() {
  const stats = [
    { value: "12", label: "Years Experience" },
    { value: "500", label: "Active Customers" },
    { value: "15", label: "Core Industries" },
    { value: "1000", label: "Projects Completed" }
  ];

  return (
    <Section className="bg-navy border-y-4 border-red py-16 md:py-20 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <StatisticCard key={i} value={`${stat.value}+`} label={stat.label} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
