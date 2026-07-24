import React from "react";
import { ShieldCheck, Globe, Star } from "lucide-react";

export function BrandHero() {
  return (
    <section className="bg-slate-50">
      
      {/* Enterprise Gateway Hero */}
      <div className="bg-[#0F172A] pt-32 pb-24 border-b border-slate-800 relative overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 text-slate-300 text-sm font-medium mb-8">
              <ShieldCheck className="w-4 h-4 text-[#F97316]" />
              <span>Authorized Premier Distributor</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-8 leading-tight">
              Trusted Industrial <br/>
              <span className="text-[#F97316]">Global Brands.</span>
            </h1>
            
            <p className="text-xl text-slate-400 leading-relaxed font-light max-w-2xl mx-auto mb-12">
              Universal Techno Services partners with the world's leading manufacturers to supply premium industrial components, ensuring uncompromising quality and reliability for your operations.
            </p>

            <div className="flex flex-wrap justify-center gap-8 text-slate-300">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-slate-500" />
                <span className="font-medium">Global Network</span>
              </div>
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-slate-500" />
                <span className="font-medium">100% Genuine</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
