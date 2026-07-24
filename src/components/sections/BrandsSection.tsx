"use client";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";

export function BrandsSection() {
  const brands = [
    { name: "FESTO", src: "https://placehold.co/400x200/f8fafc/0f172a.png?text=FESTO" },
    { name: "SMC", src: "https://placehold.co/400x200/f8fafc/0f172a.png?text=SMC" },
    { name: "Forbes Marshall", src: "https://placehold.co/400x200/f8fafc/0f172a.png?text=Forbes+Marshall" },
    { name: "L&T", src: "https://placehold.co/400x200/f8fafc/0f172a.png?text=L%26T" },
    { name: "Bosch", src: "https://placehold.co/400x200/f8fafc/0f172a.png?text=Bosch" },
    { name: "Danfoss", src: "https://placehold.co/400x200/f8fafc/0f172a.png?text=Danfoss" },
    { name: "WIKA", src: "https://placehold.co/400x200/f8fafc/0f172a.png?text=WIKA" },
    { name: "Kirloskar", src: "https://placehold.co/400x200/f8fafc/0f172a.png?text=Kirloskar" }
  ];

  return (
    <Section className="bg-white border-y border-gray-100">
      <Container>
        <div className="text-center mb-16">
          <span className="text-red font-bold tracking-wider uppercase text-sm mb-2 block">Our Partners</span>
          <AnimatedHeading as="h2" className="text-3xl md:text-4xl font-extrabold text-navy">
            Featured Brands
          </AnimatedHeading>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {brands.map((brand, i) => (
            <div key={i} className="aspect-[3/2] rounded-xl border border-gray-100 bg-white flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 hover:shadow-md cursor-pointer hover:border-red/20 p-8">
              {/* Using native img here as we are loading external URLs and preserving their natural aspect ratios */}
              <img src={brand.src} alt={brand.name} className="w-full h-full object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = `<span class="text-xl font-bold text-gray-400 hover:text-navy transition-colors">${brand.name}</span>` }} />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
