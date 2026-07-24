import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export default function Page() {
  return (
    <Section className="py-32 bg-gray-50 min-h-[60vh] flex flex-col items-center justify-center">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-red font-bold tracking-wider uppercase text-sm mb-2 block">Phase 3 Route Setup</span>
          <h1 className="text-4xl font-extrabold text-navy mb-4">SHIPPING POLICY</h1>
          <p className="text-gray-500 text-lg">This page architecture has been scaffolded and awaits Phase 4 implementation.</p>
        </div>
      </Container>
    </Section>
  );
}
