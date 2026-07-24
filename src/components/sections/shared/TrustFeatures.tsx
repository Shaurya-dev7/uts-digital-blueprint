import React from "react";
import { Clock, ShieldCheck, Cog, HeadphonesIcon, TrendingUp, Handshake } from "lucide-react";

export function TrustFeatures() {
  const features = [
    {
      title: "Fast Response",
      description: "Our enterprise sales team responds to all inquiries within 24 hours.",
      icon: <Clock className="w-6 h-6" />,
    },
    {
      title: "Reliable Supply",
      description: "100% genuine products sourced directly from global manufacturers.",
      icon: <ShieldCheck className="w-6 h-6" />,
    },
    {
      title: "Technical Knowledge",
      description: "Expert engineers available for product selection and troubleshooting.",
      icon: <Cog className="w-6 h-6" />,
    },
    {
      title: "After Sales Support",
      description: "Dedicated support team for installation and maintenance queries.",
      icon: <HeadphonesIcon className="w-6 h-6" />,
    },
    {
      title: "Competitive Pricing",
      description: "Optimized supply chain ensuring the best value for enterprise scale.",
      icon: <TrendingUp className="w-6 h-6" />,
    },
    {
      title: "Long-Term Partnership",
      description: "We build relationships based on trust, reliability, and mutual growth.",
      icon: <Handshake className="w-6 h-6" />,
    }
  ];

  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Why Enterprises Choose UTS</h2>
          <p className="text-slate-500 text-lg">We don't just supply products; we partner with you to ensure your industrial operations never stop.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#F97316]/30 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center text-slate-700 group-hover:text-[#F97316] group-hover:border-[#F97316]/30 transition-colors mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
