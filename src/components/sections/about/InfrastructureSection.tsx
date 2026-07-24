import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

const infrastructure = [
  {
    title: "Corporate Office",
    description: "Located at P/14 Pragati Nagar, Baridih, Jamshedpur, our headquarters houses our engineering, sales, and administrative teams.",
    image: "/images/placeholder-office.jpg"
  },
  {
    title: "Central Warehouse",
    description: "A fully equipped warehousing facility ensuring high stock availability for critical components like valves and pumps.",
    image: "/images/placeholder-warehouse.jpg"
  },
  {
    title: "Distribution Network",
    description: "Robust logistics infrastructure capable of delivering heavy machinery and industrial chemicals across Pan-India.",
    image: "/images/placeholder-distribution.jpg"
  },
  {
    title: "Future Service Center",
    description: "Upcoming state-of-the-art repair and maintenance facility to provide rapid turnaround for industrial equipment.",
    image: "/images/placeholder-service.jpg"
  }
];

export function InfrastructureSection() {
  return (
    <Section className="bg-gray-50 py-24">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-red font-bold tracking-wider uppercase text-sm mb-2 block">Our Capabilities</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-navy mb-6">
            Robust Infrastructure
          </h2>
          <p className="text-lg text-gray-600">
            Our facilities are strategically designed to support the complex supply chain requirements of India's heavy industries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {infrastructure.map((item, i) => (
            <div key={i} className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col md:flex-row h-full">
              <div className="md:w-2/5 relative h-64 md:h-auto overflow-hidden bg-gray-200">
                <div 
                  className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
                  style={{ backgroundImage: `url(${item.image})` }} 
                />
              </div>
              <div className="md:w-3/5 p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-navy mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
