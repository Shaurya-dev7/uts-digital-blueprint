"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How quickly do you respond to quote requests?",
      answer: "For standard industrial products, we typically respond within 24 hours. For complex projects requiring engineering design or custom sourcing, our team will provide an initial response within 24 hours and a complete proposal within 48-72 hours."
    },
    {
      question: "Do you supply products outside of Jharkhand?",
      answer: "Yes, we supply industrial products to clients across India. Our logistics network ensures safe and timely delivery to your project site, regardless of location."
    },
    {
      question: "What is your return or warranty policy?",
      answer: "All our products come with the standard manufacturer's warranty, which typically ranges from 12 to 18 months depending on the brand and product type. We provide full support in claiming warranties."
    },
    {
      question: "Can I get technical support for product selection?",
      answer: "Absolutely. Our team of experienced engineers is available to help you select the exact specifications of valves, pumps, or electrical equipment required for your specific industrial application."
    },
    {
      question: "How can I become an authorized dealer?",
      answer: "We are always looking to expand our network. Please contact us at partners@utsjamshedpur.com with your company profile, current portfolio, and the region you cover."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-500 text-lg">Find quick answers to common questions about our ordering process and support.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className={`border rounded-xl overflow-hidden transition-colors ${openIndex === idx ? 'border-[#F97316]/50 bg-orange-50/30' : 'border-slate-200 bg-white hover:border-slate-300'}`}
            >
              <button
                className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span className={`font-semibold ${openIndex === idx ? 'text-[#F97316]' : 'text-slate-800'}`}>
                  {faq.question}
                </span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openIndex === idx ? 'rotate-180 text-[#F97316]' : 'text-slate-400'}`} />
              </button>
              
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-48 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
