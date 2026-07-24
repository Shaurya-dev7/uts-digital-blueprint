import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MessageSquare } from "lucide-react";

export function ContactCTASection() {
  return (
    <Section className="relative bg-navy overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-t from-navy to-navy/80 z-10" />
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 opacity-[0.03] z-0" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      
      <Container className="relative z-20">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedHeading as="h2" className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            Need Industrial Solutions?
          </AnimatedHeading>
          <p className="text-xl text-gray-400 mb-10">
            Our technical experts are ready to assist you with customized procurement and operational support.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-red hover:bg-red/90 text-white h-14 px-8 text-lg">
              <Phone className="mr-2 h-5 w-5" />
              Call Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-navy h-14 px-8 text-lg">
              <Mail className="mr-2 h-5 w-5" />
              Request Quote
            </Button>
            <Button size="lg" className="bg-[#25D366] hover:bg-[#20bd5a] text-white h-14 px-8 text-lg border-0">
              <MessageSquare className="mr-2 h-5 w-5" />
              WhatsApp
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
