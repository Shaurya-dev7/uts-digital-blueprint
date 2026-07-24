import React from "react";
import { Product } from "@/types/product";
import { CheckCircle2, ShieldCheck, Truck, Clock } from "lucide-react";

interface QuickHighlightsProps {
  product: Product;
}

export function QuickHighlights({ product }: QuickHighlightsProps) {
  // Grab the first 3-4 features or specs if features aren't available
  const highlights = product.features && product.features.length > 0
    ? product.features.slice(0, 4)
    : product.specifications?.slice(0, 4).map(s => `${s.name}: ${s.value}`) || [];

  return (
    <div className="bg-slate-50 border-y border-slate-200 py-6">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {highlights.map((highlight, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span className="text-slate-700 font-medium text-sm md:text-base leading-snug">
                {highlight}
              </span>
            </div>
          ))}

          {/* Fallbacks if there are less than 4 highlights */}
          {highlights.length < 4 && (
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span className="text-slate-700 font-medium text-sm md:text-base leading-snug">
                Authorized Distribution & Official Support
              </span>
            </div>
          )}
          {highlights.length < 3 && (
            <div className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span className="text-slate-700 font-medium text-sm md:text-base leading-snug">
                Nationwide Shipping & Procurement
              </span>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}
