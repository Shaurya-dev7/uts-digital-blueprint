import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { CheckCircle2 } from "lucide-react";

const commitments = [
  "Rigorous multi-point quality inspection prior to dispatch.",
  "Sourcing exclusively from certified global OEMs (FESTO, SMC, Danfoss).",
  "100% authentic products with manufacturer warranties.",
  "Full traceability and certification documentation provided.",
  "Dedicated post-sales technical and engineering support."
];

export function QualityCommitment() {
  return (
    <Section className="bg-white py-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-gray-200 shadow-xl border border-gray-100 relative">
              <div 
                className="absolute inset-0 bg-cover bg-center" 
                style={{ backgroundImage: 'url(/images/placeholder-quality.jpg)' }} 
              />
            </div>
            {/* Overlay badge */}
            <div className="absolute -bottom-8 -right-8 bg-navy text-white p-8 rounded-2xl shadow-2xl border-4 border-white hidden md:block">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-red flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-xl font-bold">100%</div>
                  <div className="text-gray-300 text-sm uppercase tracking-wider">Quality Assured</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <span className="text-red font-bold tracking-wider uppercase text-sm mb-2 block">Our Promise</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-navy mb-6 leading-tight">
              Uncompromising Quality Commitment
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              In heavy industry, equipment failure is not an option. That's why quality assurance isn't just a department at UTS—it is the foundation of our entire business model. We guarantee the authenticity and performance of every valve, pump, and component we supply.
            </p>

            <ul className="space-y-4">
              {commitments.map((text, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium text-lg">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
