import React from "react";
import { ShieldCheck, Phone, ArrowRight } from "lucide-react";
import Link from "next/link";

export function ContactHero() {
  return (
    <section className="bg-[#0F172A] pt-32 pb-24 border-b border-slate-800 relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 text-slate-300 text-sm font-medium mb-8">
            <ShieldCheck className="w-4 h-4 text-[#F97316]" />
            <span>Dedicated Enterprise Support</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-8 leading-tight">
            Let's Build Reliable <br/>
            <span className="text-[#F97316]">Industrial Solutions Together.</span>
          </h1>
          
          <p className="text-xl text-slate-400 leading-relaxed font-light max-w-2xl mx-auto mb-10">
            Whether you need a comprehensive quotation, technical support, or simply have a product inquiry, our industrial experts are ready to assist you.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="#contact-form" className="inline-flex items-center justify-center bg-[#F97316] text-white font-semibold py-3 px-8 rounded-lg hover:bg-[#ea580c] transition-colors shadow-[0_4px_14px_0_rgba(249,115,22,0.39)] hover:shadow-[0_6px_20px_rgba(249,115,22,0.23)]">
              Send an Inquiry
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link href="tel:+919031044769" className="inline-flex items-center justify-center bg-slate-800 border border-slate-700 text-white font-semibold py-3 px-8 rounded-lg hover:bg-slate-700 transition-colors">
              <Phone className="w-4 h-4 mr-2" />
              Call +91 90310 44769
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
