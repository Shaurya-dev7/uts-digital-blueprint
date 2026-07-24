import React from "react";
import Image from "next/image";
import { Brand } from "@/types/catalog";
import { Badge } from "@/components/ui/badge";

interface IndividualBrandHeroProps {
  brand: Brand;
  productCount: number;
}

export function IndividualBrandHero({ brand, productCount }: IndividualBrandHeroProps) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 bg-gray-50 border-b border-gray-200">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
          
          {/* Logo Card */}
          <div className="w-full md:w-1/3 max-w-sm flex-shrink-0">
            <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 flex items-center justify-center aspect-square relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={brand.logoUrl} 
                alt={`${brand.name} Logo`} 
                className="w-full h-auto max-h-32 object-contain relative z-10 mix-blend-multiply group-hover:scale-110 transition-transform duration-700" 
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 text-center md:text-left pt-4">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6">
              <Badge className="bg-navy text-white hover:bg-navy/90 text-sm px-3 py-1">
                Authorized Partner
              </Badge>
              {brand.country && (
                <Badge variant="outline" className="border-gray-300 text-gray-600 text-sm px-3 py-1 bg-white">
                  Origin: {brand.country}
                </Badge>
              )}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold text-navy tracking-tight mb-6">
              {brand.name}
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mb-8">
              {brand.shortDescription}
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-gray-200">
              <div>
                <span className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Categories</span>
                <span className="text-navy font-semibold">{brand.categories.length} Core Areas</span>
              </div>
              <div>
                <span className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Industries</span>
                <span className="text-navy font-semibold">{brand.industries.length}+ Served</span>
              </div>
              <div>
                <span className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Products</span>
                <span className="text-navy font-semibold">{productCount} Main Lines</span>
              </div>
              <div>
                <span className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Availability</span>
                <span className="text-green-600 font-semibold flex items-center justify-center md:justify-start gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> In Stock
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
