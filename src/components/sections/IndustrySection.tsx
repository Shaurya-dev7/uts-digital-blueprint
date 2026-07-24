import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { IndustryCard } from "@/components/cards/IndustryCard";

export function IndustrySection() {
  const industries = [
    { 
      title: "Steel Plants", 
      description: "Comprehensive solutions for blast furnaces and continuous casting.",
      img: "/images/sectors/steel-plants.jpg",
      href: "/industries/steel-plants"
    },
    { 
      title: "Chemical & Process", 
      description: "Corrosion-resistant systems for demanding chemical processing.",
      img: "/images/sectors/chemical-process.jpg",
      href: "/industries/chemical-process"
    },
    { 
      title: "Cement & Heavy Mfg", 
      description: "Durable equipment handling high-abrasion manufacturing.",
      img: "/images/sectors/cement-heavy-manufacturing.jpg",
      href: "/industries/cement-heavy-manufacturing"
    },
    { 
      title: "Construction Chemicals", 
      description: "Premium waterproofing and structural concrete repair solutions.",
      img: "/images/sectors/construction-chemicals.jpg",
      href: "/industries/construction-chemicals"
    },
    { 
      title: "Agriculture Equipment", 
      description: "Advanced machinery and rotary tillers for modern farming.",
      img: "/images/sectors/agriculture-equipment.jpg",
      href: "/industries/agriculture-equipment"
    }
  ];

  return (
    <Section className="bg-charcoal text-white">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-3xl">
            <span className="text-red font-bold tracking-wider uppercase text-sm mb-2 block">Sectors We Serve</span>
            <AnimatedHeading as="h2" className="text-3xl md:text-5xl font-extrabold text-white">
              Powering Core Industries
            </AnimatedHeading>
          </div>
          <p className="text-gray-400 max-w-md text-lg md:text-right">
            Delivering specialized equipment and tailored solutions engineered for the unique demands of heavy industries.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((industry, i) => (
            <IndustryCard
              key={i}
              title={industry.title}
              description={industry.description}
              imagePlaceholder={industry.img}
              href={industry.href}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
