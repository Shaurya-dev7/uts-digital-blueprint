import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export function CompanyStory() {
  return (
    <Section className="bg-white py-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <span className="text-red font-bold tracking-wider uppercase text-sm mb-2 block">Our Story</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-navy leading-tight mb-6">
                Built on Integrity.<br/>
                Driven by Engineering.
              </h2>
              <div className="w-20 h-1.5 bg-red rounded-full mb-8"></div>
            </div>
          </div>
          
          <div className="lg:col-span-7">
            <div className="prose prose-lg prose-navy max-w-none text-gray-600 space-y-6 leading-relaxed">
              <p className="text-xl font-medium text-navy">
                Universal Techno Services (UTS) was established in 2013 with a singular vision: to bridge the gap between world-class engineering manufacturers and India's rapidly growing heavy industries.
              </p>
              
              <p>
                Operating out of Jamshedpur, the steel capital of India, our initial operations were deeply rooted in servicing local steel plants and manufacturing units. We understood early on that industrial operations cannot afford downtime. By focusing on rapid procurement, authentic products, and technical support, we quickly earned the trust of local conglomerates.
              </p>

              <div className="my-10 p-8 bg-gray-50 border-l-4 border-red rounded-r-xl">
                <p className="text-xl font-serif italic text-navy m-0">
                  "Our philosophy is simple: we do not just supply equipment; we supply reliability. When a plant manager trusts UTS, they are trusting us with their operational uptime and safety."
                </p>
              </div>

              <p>
                Over the past decade, UTS has expanded far beyond its regional origins. Today, we manage a diverse portfolio encompassing Industrial Valves, Centrifugal Pumps, Safety Relief Valves, Construction Chemicals, and heavy-duty Agriculture Equipment. Our footprint has expanded across Jharkhand, supplying critical infrastructure projects, railways, and power generation sectors.
              </p>

              <p>
                What sets us apart is our engineering-first approach. We don't just process orders; our technical team works closely with plant engineers to recommend optimal specifications, source authentic OEM parts, and ensure compliance with the strictest safety standards.
              </p>

              <p>
                As we look to the future, UTS continues to invest in advanced logistics, broader industry partnerships, and a highly skilled technical workforce. We remain committed to building long-term relationships through unwavering integrity and excellence in service.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
