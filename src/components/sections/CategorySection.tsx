import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { ProductCard } from "@/components/cards/ProductCard";

export function CategorySection() {
  const categories = [
    {
      name: "High-Pressure Safety Valves",
      category: "Safety Relief Valves",
      description: "Critical pressure relief solutions for steam, gas, and liquid applications in heavy industries.",
      img: "/images/product-valve.jpg"
    },
    {
      name: "Industrial Butterfly Valves",
      category: "Industrial Valves",
      description: "Heavy-duty flow control valves designed for extreme environments and slurry applications.",
      img: "/images/product-actuator.png"
    },
    {
      name: "Heavy-Duty Pumps",
      category: "Industrial Pumps",
      description: "Centrifugal and positive displacement pumps engineered for continuous industrial operation.",
      img: "/images/product-pump.jpg"
    },
    {
      name: "Construction Epoxies",
      category: "Construction Chemicals",
      description: "Advanced bonding and waterproofing chemicals for large scale infrastructure projects.",
      img: "/images/product-epoxy.png"
    }
  ];

  return (
    <Section className="bg-white">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-red font-bold tracking-wider uppercase text-sm mb-2 block">Our Products</span>
          <AnimatedHeading as="h2" className="text-3xl md:text-5xl font-extrabold text-navy mb-6">
            Premium Equipment Categories
          </AnimatedHeading>
          <p className="text-lg text-gray-600">
            Explore our comprehensive range of certified industrial equipment engineered for maximum reliability and safety.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, i) => (
            <ProductCard
              key={i}
              name={cat.name}
              category={cat.category}
              description={cat.description}
              imagePlaceholder={cat.img}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
