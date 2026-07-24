import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { Download, ArrowRight } from "lucide-react";
import Link from "next/link";

export function AboutHero() {
  return (
    <Section className="relative min-h-[80vh] flex items-center pt-32 pb-24 overflow-hidden border-b-8 border-red bg-navy">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-overlay"
        style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }}
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-80" />

      <Container className="relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red/10 border border-red/20 text-red-100 font-medium text-sm mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-red animate-pulse"></span>
            Established Since 2013
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
            Engineering Excellence.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red to-red-400">
              Unwavering Trust.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-10 max-w-2xl">
            Universal Techno Services (UTS) is a premier supplier of industrial grade equipment. We specialize in providing end-to-end solutions that keep critical infrastructure and heavy industries running seamlessly across India.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/request-quote" className="inline-block">
              <Button size="lg" className="w-full sm:w-auto bg-red hover:bg-red/90 text-white h-14 px-8 text-lg shadow-lg shadow-red/20 group">
                Request Official Quote
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-gray-400 text-white hover:bg-white hover:text-navy h-14 px-8 text-lg bg-white/5 backdrop-blur-sm">
              <Download className="w-5 h-5 mr-2" />
              Download Company Profile
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
