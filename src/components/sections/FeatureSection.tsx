import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { FeatureCard } from "@/components/cards/FeatureCard";
import { ShieldCheck, Truck, HeadphonesIcon, Award, Settings, Users } from "lucide-react";

export function FeatureSection() {
  const features = [
    { title: "Technical Expertise", description: "Our team consists of highly qualified engineers capable of providing customized industrial solutions.", icon: Settings },
    { title: "Trusted Brands", description: "We only supply certified equipment from globally recognized, top-tier manufacturers.", icon: Award },
    { title: "Quick Support", description: "Dedicated 24/7 technical support and rapid response times for critical operational issues.", icon: HeadphonesIcon },
    { title: "Competitive Pricing", description: "Direct manufacturer relationships allow us to offer highly competitive pricing structures.", icon: ShieldCheck },
    { title: "After Sales Service", description: "Comprehensive maintenance, repair, and operational support post-installation.", icon: Truck },
    { title: "Experienced Team", description: "Over a decade of specialized experience in heavy industrial procurement and safety.", icon: Users }
  ];

  return (
    <Section className="bg-gray-50">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-red font-bold tracking-wider uppercase text-sm mb-2 block">Why Choose UTS</span>
          <AnimatedHeading as="h2" className="text-3xl md:text-5xl font-extrabold text-navy mb-6">
            The UTS Advantage
          </AnimatedHeading>
          <p className="text-lg text-gray-600">
            We don&apos;t just supply products; we partner with you to ensure your industrial operations run smoothly, safely, and efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <FeatureCard
              key={i}
              title={feature.title}
              description={feature.description}
              Icon={feature.icon}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
