import React from "react";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { MultiStepQuoteForm } from "@/components/forms/quote/MultiStepQuoteForm";
import { ShieldCheck, Clock, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Request a Quote - Universal Techno Services",
  description: "Request a detailed quotation for industrial components, pumps, valves, and electrical solutions. Fast and reliable service.",
  alternates: {
    canonical: `${siteConfig.url}/request-quote`,
  }
};

export default function RequestQuotePage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Premium Hero */}
      <section className="bg-[#0F172A] pt-32 pb-32 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
            Request an <span className="text-[#F97316]">Enterprise Quotation</span>
          </h1>
          <p className="text-lg text-slate-400 font-light max-w-2xl mx-auto mb-10">
            Provide us with your project details and requirements. Our engineering sales team will prepare a comprehensive proposal within 24-48 hours.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-slate-300 text-sm font-medium">
            <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700">
              <Clock className="w-4 h-4 text-[#F97316]" />
              Fast Turnaround
            </div>
            <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700">
              <ShieldCheck className="w-4 h-4 text-[#F97316]" />
              Secure Process
            </div>
            <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700">
              <CheckCircle2 className="w-4 h-4 text-[#F97316]" />
              Accurate Pricing
            </div>
          </div>
        </div>
      </section>

      {/* Form Container (Pulled up over hero) */}
      <section className="container mx-auto px-4 md:px-6 -mt-16 relative z-20">
        <MultiStepQuoteForm />
      </section>
    </div>
  );
}
