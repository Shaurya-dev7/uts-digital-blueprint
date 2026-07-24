import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function GallerySection() {
  return (
    <Section className="bg-gray-50 border-t border-gray-100">
      <Container>
        <div className="text-center mb-16">
          <span className="text-red font-bold tracking-wider uppercase text-sm mb-2 block">Facility & Operations</span>
          <AnimatedHeading as="h2" className="text-3xl md:text-5xl font-extrabold text-navy mb-6">
            Gallery Preview
          </AnimatedHeading>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { id: 1, src: '/images/company logos/bg tata steel.jpg', title: 'Tata Steel Facility' },
            { id: 2, src: '/images/company logos/Jindal Steel office.jpg', title: 'Jindal Steel' },
            { id: 3, src: '/images/company logos/larsen office.jpg', title: 'Larsen & Toubro' },
            { id: 4, src: '/images/company logos/Tata Steel Tinplate office.jpg', title: 'Tinplate Office' },
            { id: 5, src: '/images/company logos/tata BlueScope Steel office.jpg', title: 'Tata BlueScope' }
          ].map((item) => (
            <div key={item.id} className={`relative bg-gray-200 overflow-hidden rounded-xl group ${item.id === 1 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-square'}`}>
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                style={{ backgroundImage: `url('${item.src}')` }} 
              />
              <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-bold tracking-wider uppercase text-center px-4">{item.title}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link href="/gallery">
            <Button variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white px-8 h-12">
              View Full Gallery
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
