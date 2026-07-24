import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQSection() {
  const faqs = [
    { question: "What industries do you supply equipment to?", answer: "We supply to a wide range of industries including Steel Plants, Construction, Agriculture, and Chemical Processing." },
    { question: "Do you provide after-sales support and maintenance?", answer: "Yes, we offer comprehensive 24/7 technical support and maintenance services for all equipment we supply." },
    { question: "Are your products certified?", answer: "Absolutely. We exclusively partner with globally recognized brands that adhere to stringent international quality and safety certifications." },
    { question: "Can you provide custom industrial solutions?", answer: "Yes, our team of experienced engineers can assess your operational needs and provide tailored procurement solutions." }
  ];

  return (
    <Section className="bg-gray-50 border-t border-gray-100">
      <Container className="max-w-4xl">
        <div className="text-center mb-16">
          <span className="text-red font-bold tracking-wider uppercase text-sm mb-2 block">Support</span>
          <AnimatedHeading as="h2" className="text-3xl md:text-5xl font-extrabold text-navy">
            Frequently Asked Questions
          </AnimatedHeading>
        </div>

        <Accordion className="w-full bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          {faqs.map((faq, i) => (
            <AccordionItem value={`item-${i}`} key={i} className="border-b-gray-100 last:border-0">
              <AccordionTrigger className="text-left text-lg font-bold text-navy hover:text-red hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 text-base leading-relaxed pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </Section>
  );
}
