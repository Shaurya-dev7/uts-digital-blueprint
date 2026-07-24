import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Leaf, Users, ShieldAlert } from "lucide-react";

const principles = [
  {
    icon: ShieldAlert,
    title: "Occupational Safety",
    description: "We mandate strict safety protocols for our workforce and supply equipment that enhances the operational safety of our clients' facilities."
  },
  {
    icon: Leaf,
    title: "Environmental Responsibility",
    description: "Promoting energy-efficient pumps, zero-leakage valves, and eco-friendly construction chemicals to reduce industrial carbon footprints."
  },
  {
    icon: Users,
    title: "Community Impact",
    description: "Investing in the local communities of Jharkhand through employment, skill development, and ethical business practices."
  }
];

export function CorporateResponsibility() {
  return (
    <Section className="bg-white py-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5">
            <span className="text-red font-bold tracking-wider uppercase text-sm mb-2 block">Beyond Business</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-navy leading-tight mb-6">
              Corporate Responsibility
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              We believe that true engineering excellence must be sustainable. As an integral part of India's industrial supply chain, we acknowledge our profound responsibility towards safety, the environment, and the communities we operate within.
            </p>
            <div className="w-20 h-1.5 bg-red rounded-full"></div>
          </div>
          
          <div className="lg:col-span-7">
            <div className="space-y-8">
              {principles.map((p, i) => {
                const Icon = p.icon;
                return (
                  <div key={i} className="flex gap-6 bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-navy" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-navy mb-2">{p.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{p.description}</p>
                    </div>
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
