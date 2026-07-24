"use client";
import React, { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

export function TestimonialSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [Autoplay({ delay: 5000 })])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const testimonials = [
    { quote: "UTS has been our primary supplier for high-pressure safety valves. Their commitment to quality and rapid delivery times have saved our operations multiple times.", author: "Rajesh Sharma", company: "Tata Steel" },
    { quote: "The technical expertise provided by the UTS team helped us select the perfect industrial pumps for our new facility. Highly recommended.", author: "Amit Kumar", company: "Jindal Steel & Power" },
    { quote: "Excellent after-sales support. Their team is always available to assist with maintenance and spare parts. A truly reliable partner.", author: "Sunita Reddy", company: "Larsen & Toubro" },
    { quote: "We source all our construction chemicals and epoxies from UTS. The product quality is unmatched in the region.", author: "Vikram Singh", company: "Rungta Mines" },
    { quote: "Their pneumatic valves have significantly improved our operational efficiency. The quality provided by UTS is outstanding.", author: "Anil Desai", company: "Jamna Auto Industries" }
  ];

  return (
    <Section className="bg-white overflow-hidden">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="text-red font-bold tracking-wider uppercase text-sm mb-2 block">Client Feedback</span>
            <AnimatedHeading as="h2" className="text-3xl md:text-5xl font-extrabold text-navy">
              Trusted by the Best
            </AnimatedHeading>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" size="icon" onClick={scrollPrev} className="rounded-full w-12 h-12 border-gray-200 text-navy hover:bg-red hover:text-white hover:border-red transition-colors" aria-label="Previous testimonial">
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button variant="outline" size="icon" onClick={scrollNext} className="rounded-full w-12 h-12 border-gray-200 text-navy hover:bg-red hover:text-white hover:border-red transition-colors" aria-label="Next testimonial">
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Embla Carousel Viewport */}
        <div className="overflow-hidden -ml-6" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {testimonials.map((t, i) => (
              <div className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-6" key={i}>
                <TestimonialCard quote={t.quote} author={t.author} company={t.company} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
