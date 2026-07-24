import React from "react";
import Link from "next/link";
import { ArrowRight, Tag } from "lucide-react";
import { Brand } from "@/types/catalog";
import { Badge } from "@/components/ui/badge";

import { TiltCard } from "@/components/animations/TiltCard";

interface BrandCardProps {
  brand: Brand;
}

export function BrandCard({ brand }: BrandCardProps) {
  return (
    <TiltCard className="h-full">
      <Link 
        href={`/brands/${brand.slug}`}
        className="h-full relative group rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
      >
      {/* Image Header Area */}
      <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
        {(brand.heroImageUrl || brand.logoUrl) && (
          <div 
            className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 opacity-20 mix-blend-multiply" 
            style={{ backgroundImage: `url(${brand.heroImageUrl || brand.logoUrl})` }}
          />
        )}
        <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-slate-900/10 transition-colors duration-300" />
        
        {/* Floating Logo Overlay */}
        <div className="absolute bottom-4 left-6 bg-white p-3 rounded-xl shadow-md flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={brand.logoUrl} 
            alt={`${brand.name} Logo`}
            className="h-8 w-auto max-w-[120px] object-contain mix-blend-multiply"
          />
        </div>

        {brand.featured && (
          <div className="absolute top-4 right-4 bg-[#F97316] text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-sm">
            Featured
          </div>
        )}
      </div>
      
      {/* Details */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-navy transition-colors">{brand.name}</h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
          {brand.shortDescription}
        </p>
        
        <div className="space-y-4 mt-auto">
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" /> Industries
            </h4>
            <div className="flex flex-wrap gap-2">
              {brand.industries.slice(0, 2).map(ind => (
                <span key={ind} className="text-xs font-medium bg-slate-50 border border-slate-200 text-slate-600 px-2.5 py-1 rounded-md">
                  {ind}
                </span>
              ))}
              {brand.industries.length > 2 && (
                <span className="text-xs font-medium bg-slate-50 border border-slate-200 text-slate-500 px-2 py-1 rounded-md">
                  +{brand.industries.length - 2}
                </span>
              )}
            </div>
          </div>
          
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-slate-800 font-bold text-sm group-hover:text-[#F97316] transition-colors">
            <span>Explore Brand</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
      </Link>
    </TiltCard>
  );
}
