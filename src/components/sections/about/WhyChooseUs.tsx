import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { CheckCircle2, Clock, Globe2, Wrench, PackageCheck, Headset } from "lucide-react";

const reasons = [
  {
    icon: Clock,
    title: "12+ Years Experience",
    description: "Deep understanding of industrial supply chain dynamics and requirements."
  },
  {
    icon: Globe2,
    title: "Trusted Global Brands",
    description: "Direct partnerships with FESTO, SMC, Danfoss, and other premium manufacturers."
  },
  {
    icon: Headset,
    title: "Fast Technical Support",
    description: "Rapid response times from our dedicated engineering support team."
  },
  {
    icon: PackageCheck,
    title: "Reliable Delivery",
    description: "Robust logistics network ensuring on-time delivery for critical operations."
  },
  {
    icon: Wrench,
    title: "After-Sales Service",
    description: "Comprehensive maintenance, repair, and replacement support."
  },
  {
    icon: CheckCircle2,
    title: "Competitive Pricing",
    description: "Optimized procurement processes delivering the best value without compromising quality."
  }
];

export function WhyChooseUs() {
  return (
    <Section className="bg-navy py-24 text-white">
      <Container>
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3">
            <div className="sticky top-32">
              <span className="text-red-400 font-bold tracking-wider uppercase text-sm mb-2 block">Our Advantage</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                Why Choose<br/>Universal Techno Services?
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                We don't just supply equipment; we supply reliability. Discover why India's leading heavy industries partner with us.
              </p>
              <div className="w-24 h-1.5 bg-red rounded-full"></div>
            </div>
          </div>
          
          <div className="lg:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {reasons.map((reason, i) => {
                const Icon = reason.icon;
                return (
                  <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors duration-300">
                    <Icon className="w-10 h-10 text-red mb-6" />
                    <h3 className="text-xl font-bold text-white mb-3">{reason.title}</h3>
                    <p className="text-gray-400 leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
