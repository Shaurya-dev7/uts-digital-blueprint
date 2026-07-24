import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ContentLayout } from "@/components/layout/ContentLayout";
import { mockIndustries } from "@/data/mockContent";
import Link from "next/link";
import { ArrowRight, Factory } from "lucide-react";

export default function IndustriesPage() {
  return (
    <ContentLayout
      title="Industries We Serve"
      subtitle="Universal Techno Services provides specialized engineering solutions, heavy-duty valves, and robust equipment for India's core industrial sectors."
      breadcrumbs={[{ label: "Industries", href: "/industries" }]}
      showSidebar={false}
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockIndustries.map((industry) => (
          <div key={industry.id} className="group flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="aspect-[4/3] overflow-hidden relative">
              {/* Fallback color if image fails or before it loads */}
              <div className="absolute inset-0 bg-slate-100" />
              <img 
                src={industry.heroImage.url} 
                alt={industry.heroImage.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 relative z-10"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-20" />
              <div className="absolute bottom-4 left-4 z-30 flex items-center gap-2 text-white">
                <Factory className="w-5 h-5 text-[#F97316]" />
                <h2 className="font-bold text-xl">{industry.name}</h2>
              </div>
            </div>
            
            <div className="p-6 flex flex-col flex-grow">
              <p className="text-slate-600 mb-6 flex-grow">{industry.shortDescription}</p>
              
              <Link 
                href={`/industries/${industry.slug}`}
                className="inline-flex items-center gap-2 text-navy font-bold hover:text-[#F97316] transition-colors mt-auto"
              >
                Explore Solutions
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </ContentLayout>
  );
}
