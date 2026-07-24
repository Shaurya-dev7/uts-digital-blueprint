import React from 'react';
import { ProductStatus } from '@/types/catalog';
import { Badge } from '@/components/ui/badge';
import { Star, ShieldAlert, TrendingUp, Zap, MapPin, Globe, Clock, PackageSearch, XCircle, AlertCircle, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductBadgesProps {
  statuses?: ProductStatus[];
  className?: string;
}

const getStatusConfig = (status: ProductStatus) => {
  switch (status) {
    case 'New':
      return { icon: Zap, class: 'bg-blue-500 text-white hover:bg-blue-600', label: 'New' };
    case 'Featured':
      return { icon: Star, class: 'bg-amber-500 text-white hover:bg-amber-600', label: 'Featured' };
    case 'Popular':
      return { icon: TrendingUp, class: 'bg-purple-500 text-white hover:bg-purple-600', label: 'Popular' };
    case 'Best Seller':
      return { icon: ShieldAlert, class: 'bg-[#F97316] text-white hover:bg-[#ea580c]', label: 'Best Seller' };
    case 'Made in India':
      return { icon: MapPin, class: 'bg-emerald-600 text-white hover:bg-emerald-700', label: 'Made in India' };
    case 'Imported':
      return { icon: Globe, class: 'bg-indigo-600 text-white hover:bg-indigo-700', label: 'Imported' };
    case 'In Stock':
      return { icon: PackageSearch, class: 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-200', label: 'In Stock' };
    case 'On Request':
      return { icon: Clock, class: 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200', label: 'On Request' };
    case 'Discontinued':
      return { icon: XCircle, class: 'bg-red text-white hover:bg-red/90', label: 'Discontinued' };
    case 'Coming Soon':
      return { icon: AlertCircle, class: 'bg-cyan-500 text-white hover:bg-cyan-600', label: 'Coming Soon' };
    case 'OEM':
      return { icon: Wrench, class: 'bg-slate-800 text-white hover:bg-slate-900', label: 'OEM' };
    default:
      return { icon: Star, class: 'bg-slate-100 text-slate-800', label: status };
  }
};

export function ProductBadges({ statuses, className }: ProductBadgesProps) {
  if (!statuses || statuses.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {statuses.map((status) => {
        const config = getStatusConfig(status);
        const Icon = config.icon;
        return (
          <Badge 
            key={status} 
            variant="outline" 
            className={cn("font-semibold flex items-center gap-1 px-2.5 py-0.5 shadow-sm border-0", config.class)}
          >
            <Icon className="w-3 h-3" />
            <span>{config.label}</span>
          </Badge>
        );
      })}
    </div>
  );
}
