import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface IndustryCardProps {
  title: string;
  description: string;
  imagePlaceholder: string;
  href: string;
}

export function IndustryCard({ title, description, imagePlaceholder, href }: IndustryCardProps) {
  return (
    <Link href={href} className="block group">
      <Card className="relative overflow-hidden rounded-2xl border-0 shadow-md hover:shadow-2xl transition-all duration-500 ease-out bg-navy h-full">
        <div className="relative aspect-[4/3] overflow-hidden">
          {/* Parallax and zoom effect on image */}
          <div className="absolute inset-0 transition-transform duration-1000 ease-out group-hover:scale-110">
            <Image
              src={imagePlaceholder}
              alt={`${title} industry`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover"
              loading="lazy"
            />
          </div>
          
          {/* Default dark overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500" />
          
          {/* Glass hover effect overlay */}
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 backdrop-blur-[0px] group-hover:backdrop-blur-[2px] transition-all duration-500" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end h-full">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 flex items-center justify-between group-hover:-translate-y-1 transition-transform duration-500">
              {title}
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            </h3>
            
            <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-out">
              <p className="text-gray-200 text-sm overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">
                {description}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
