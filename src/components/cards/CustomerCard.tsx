import React from "react";
import { Customer } from "@/lib/data/mockCustomers";
import { MapPin, Briefcase } from "lucide-react";

import { TiltCard } from "@/components/animations/TiltCard";

interface CustomerCardProps {
  customer: Customer;
}

export function CustomerCard({ customer }: CustomerCardProps) {
  return (
    <TiltCard className="h-full">
      <div className="h-full relative group rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col overflow-hidden cursor-pointer">
      
      {/* Image Header Area */}
      <div className="relative h-48 w-full bg-white flex items-center justify-center p-6 border-b border-slate-100 overflow-hidden">
        {/* Full picture logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={customer.logoUrl} 
          alt={`${customer.name} Logo`}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
        />
        
        {/* Relationship Badge */}
        <div className="absolute top-4 right-4 bg-[#F97316] text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-sm z-10">
          {customer.relationshipLength}
        </div>
      </div>

      {/* Details */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-navy transition-colors">{customer.name}</h3>
        
        <div className="space-y-3 flex-1">
          <div className="flex items-start gap-2 text-slate-600 text-sm">
            <Briefcase className="w-4 h-4 mt-0.5 text-slate-400" />
            <span className="font-medium">{customer.industry}</span>
          </div>
          <div className="flex items-start gap-2 text-slate-600 text-sm">
            <MapPin className="w-4 h-4 mt-0.5 text-slate-400" />
            <span>{customer.location}</span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Key Supplies</h4>
          <div className="flex flex-wrap gap-2">
            {customer.productsSupplied.slice(0, 2).map(prod => (
              <span key={prod} className="text-xs font-medium bg-slate-50 border border-slate-200 text-slate-600 px-2.5 py-1 rounded-md">
                {prod}
              </span>
            ))}
            {customer.productsSupplied.length > 2 && (
              <span className="text-xs font-medium bg-slate-50 border border-slate-200 text-slate-500 px-2 py-1 rounded-md">
                +{customer.productsSupplied.length - 2} More
              </span>
            )}
          </div>
        </div>
      </div>

      </div>
    </TiltCard>
  );
}
