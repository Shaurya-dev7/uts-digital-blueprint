import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { TimelineCard } from "@/components/cards/TimelineCard";

export function TimelineSection() {
  const milestones = [
    { year: "2013", title: "Company Founded", description: "UTS established its headquarters in Jamshedpur to serve local steel plants." },
    { year: "2016", title: "Network Expansion", description: "Expanded operations across Jharkhand, supplying heavy machinery and valves." },
    { year: "2020", title: "New Verticals", description: "Added Construction Chemicals and Agriculture Equipment to the portfolio." },
    { year: "2024", title: "Enterprise Excellence", description: "Recognized as a premier supplier with over 500+ trusted industrial clients." }
  ];

  return (
    <Section className="bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-red font-bold tracking-wider uppercase text-sm mb-2 block">Our Journey</span>
            <AnimatedHeading as="h2" className="text-3xl md:text-5xl font-extrabold text-navy mb-6">
              A Decade of Growth
            </AnimatedHeading>
            <p className="text-lg text-gray-600 mb-8">
              From our humble beginnings to becoming a trusted partner for India&apos;s largest industrial corporations, our commitment to quality has remained unwavering.
            </p>
          </div>
          <div className="space-y-8 py-8 pl-4 border-l border-gray-100">
            {milestones.map((m, i) => (
              <TimelineCard key={i} year={m.year} title={m.title} description={m.description} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
