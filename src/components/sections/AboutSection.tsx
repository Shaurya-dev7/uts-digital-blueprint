import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export function AboutSection() {
  return (
    <Section className="bg-gray-50">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200 shadow-xl border border-gray-100 relative">
              <div 
                className="absolute inset-0 bg-cover bg-center" 
                style={{ backgroundImage: 'url(/images/about-industrial.jpg)' }} 
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-red text-white p-8 rounded-2xl shadow-xl hidden md:block border border-red/20">
              <div className="text-5xl font-extrabold mb-2">12+</div>
              <div className="font-medium text-red-100 uppercase tracking-wider">Years of<br/>Excellence</div>
            </div>
          </div>
          
          <div className="space-y-8 lg:pl-8">
            <div>
              <span className="text-red font-bold tracking-wider uppercase text-sm mb-2 block">Who We Are</span>
              <AnimatedHeading as="h2" className="text-3xl md:text-5xl font-extrabold text-navy">
                Your Trusted Partner in Industrial Solutions
              </AnimatedHeading>
            </div>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              Founded in 2013, Universal Techno Services (UTS) has grown to become a premier supplier of industrial grade equipment in Jamshedpur. We specialize in providing end-to-end solutions that keep critical infrastructure and heavy industries running seamlessly.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Certified Products",
                "Pan-India Network",
                "Technical Expertise",
                "24/7 Support",
                "Custom Solutions",
                "Timely Delivery"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-red/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="text-red w-4 h-4" />
                  </div>
                  <span className="font-semibold text-navy">{item}</span>
                </div>
              ))}
            </div>

            <Button size="lg" className="bg-navy hover:bg-navy/90 text-white h-14 px-8 text-lg mt-4 shadow-lg shadow-navy/20">
              Read More About Us
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
