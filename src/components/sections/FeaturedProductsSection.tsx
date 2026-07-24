import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { ProductCard } from "@/components/cards/ProductCard";

export function FeaturedProductsSection() {
  const products = [
    { name: "Safety Relief Valve Model 400", category: "Valves", description: "High-capacity spring loaded safety valve for boiler applications.", img: "/images/product-valve.jpg" },
    { name: "Pressure Reducing Station", category: "Pressure Equipment", description: "Complete pre-assembled skid for precise steam pressure reduction.", img: "/images/product-prs.jpg" },
    { name: "Centrifugal Process Pump", category: "Pumps", description: "Heavy-duty pump for corrosive and high-temperature liquids.", img: "/images/product-pump.jpg" },
    { name: "Epoxy Grouting Chemical", category: "Chemicals", description: "High-strength epoxy resin for heavy machinery foundations.", img: "/images/product-epoxy.png" },
    { name: "Pneumatic Actuator", category: "Automation", description: "Rotary pneumatic actuator for quarter-turn industrial valves.", img: "/images/product-actuator.png" },
    { name: "Rotary Tiller", category: "Agriculture", description: "Tractor mounted rotary tiller for efficient seedbed preparation.", img: "/images/product-tiller.png" },
    { name: "Industrial Fasteners SS316", category: "Hardware", description: "Marine grade stainless steel hex bolts and nuts.", img: "/images/product-fasteners.png" },
    { name: "Digital Pressure Gauge", category: "Instrumentation", description: "High-accuracy digital gauge with data logging capabilities.", img: "/images/product-gauge.jpg" }
  ];

  return (
    <Section className="bg-gray-50 border-t border-gray-100">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="text-red font-bold tracking-wider uppercase text-sm mb-2 block">Our Catalog</span>
            <AnimatedHeading as="h2" className="text-3xl md:text-5xl font-extrabold text-navy">
              Featured Products
            </AnimatedHeading>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p, i) => (
            <ProductCard key={i} name={p.name} category={p.category} description={p.description} imagePlaceholder={p.img} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
