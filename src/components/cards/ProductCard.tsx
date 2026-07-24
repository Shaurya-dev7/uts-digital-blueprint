"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Eye, GitCompare } from "lucide-react";
import Link from "next/link";
import BorderGlow from "@/components/ui/BorderGlow";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface ProductCardProps {
  name: string;
  category: string;
  description: string;
  imagePlaceholder: string;
  slug?: string;
  brand?: string;
  statuses?: string[];
}

export function ProductCard({ name, category, description, imagePlaceholder, slug, brand, statuses }: ProductCardProps) {
  const displayBrand = brand?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const displayCategory = category?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  const getBadgeColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'NEW': return 'bg-blue-600 text-white border border-blue-700';
      case 'FEATURED': return 'bg-amber-500 text-white border border-amber-600';
      case 'OEM': return 'bg-purple-600 text-white border border-purple-700';
      case 'MADE IN INDIA': return 'bg-emerald-600 text-white border border-emerald-700';
      case 'IMPORTED': return 'bg-indigo-600 text-white border border-indigo-700';
      case 'BEST SELLER': return 'bg-red-500 text-white border border-red-600';
      case 'POPULAR': return 'bg-pink-500 text-white border border-pink-600';
      case 'IN STOCK': return 'bg-teal-500 text-white border border-teal-600';
      case 'ON REQUEST': return 'bg-slate-600 text-white border border-slate-700';
      default: return 'bg-slate-800 text-white border border-slate-900';
    }
  };

  const CardInner = (
    <Card className="group overflow-hidden rounded-2xl border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full bg-white relative">
      <div className="relative aspect-[4/3] bg-white overflow-hidden border-b border-slate-100 flex items-center justify-center p-2 group-hover:p-0 transition-all duration-300">
        {statuses && statuses.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-20 pointer-events-none">
            {statuses.map(status => (
              <span key={status} className={cn("text-[10px] font-extrabold px-2 py-0.5 rounded shadow-sm uppercase tracking-wider text-center", getBadgeColor(status))}>
                {status}
              </span>
            ))}
          </div>
        )}
        <img 
          src={imagePlaceholder} 
          alt={name}
          className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/10 transition-colors duration-300" />
        
        {/* Quick View Overlay (Only visible on hover) */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {slug && (
            <Link href={`/products/compare?id=${slug}`} className={cn(buttonVariants({ variant: "secondary" }), "bg-white/95 hover:bg-white text-navy font-bold shadow-xl backdrop-blur-md")} onClick={(e) => e.stopPropagation()}>
              <GitCompare className="w-4 h-4 mr-2" /> Compare
            </Link>
          )}
          <Dialog>
            <DialogTrigger 
              render={
                <Button variant="secondary" className="bg-white/95 hover:bg-white text-navy font-bold shadow-xl backdrop-blur-md" onClick={(e) => e.stopPropagation()} />
              }
            >
              <Eye className="w-4 h-4 mr-2" /> Quick View
            </DialogTrigger>
            <DialogContent className="max-w-3xl" onClick={(e) => e.stopPropagation()}>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-navy">{name}</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                <div className="aspect-square bg-white rounded-xl flex items-center justify-center border border-slate-100 overflow-hidden">
                  <img src={imagePlaceholder} alt={name} className="w-full h-full object-contain mix-blend-multiply" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#F97316] uppercase tracking-wider mb-2">{displayCategory}</div>
                  <p className="text-slate-600 mb-6 leading-relaxed">{description}</p>
                  {displayBrand && <div className="mb-6"><span className="font-bold text-navy">Brand:</span> {displayBrand}</div>}
                  <div className="flex gap-4">
                    {slug ? (
                      <Link href={`/products/${slug}`} className={cn(buttonVariants(), "flex-1 bg-navy hover:bg-navy/90 text-white font-bold")}>
                        Full Details
                      </Link>
                    ) : null}
                    <Button variant="outline" className="flex-1 border-slate-200 text-navy font-bold">Request Quote</Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-3 gap-2">
          <div className="text-xs font-bold text-[#F97316] uppercase tracking-wider line-clamp-1">{displayCategory}</div>
          {displayBrand && <div className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">{displayBrand}</div>}
        </div>
        <h3 className="text-lg font-bold text-navy mb-2 line-clamp-2 group-hover:text-[#F97316] transition-colors leading-tight">{name}</h3>
        <p className="text-slate-500 text-sm mb-6 line-clamp-2 flex-1">{description}</p>
        <div className="flex items-center gap-3 mt-auto">
          {slug ? (
            <Link href={`/products/${slug}`} className={cn(buttonVariants({ variant: "outline" }), "flex-1 border-slate-200 text-navy hover:bg-slate-50 transition-colors font-bold")}>
              Details
            </Link>
          ) : (
            <Button variant="outline" className="flex-1 border-slate-200 text-navy hover:bg-slate-50 transition-colors font-bold">
              Details
            </Button>
          )}
          <Button className="flex-1 bg-[#F97316] hover:bg-[#ea580c] text-white font-bold shadow-md shadow-orange-500/20">
            Quote
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <BorderGlow
      className="h-full rounded-2xl"
      backgroundColor="#ffffff"
      edgeSensitivity={30}
      glowColor="0 100% 50%" 
      borderRadius={16}
      glowRadius={30}
      glowIntensity={0.8}
      animated={false}
      colors={['#ea580c', '#1e293b', '#f97316']} 
    >
      {CardInner}
    </BorderGlow>
  );
}
