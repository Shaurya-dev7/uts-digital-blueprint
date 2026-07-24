import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Industrial Projects & Case Studies",
  description: "Explore the complex industrial challenges UTS has solved for our enterprise clients.",
  alternates: {
    canonical: `${siteConfig.url}/projects`,
  }
};

export default function ProjectsPage() {
  return (
    <section className="py-32 bg-gray-50 min-h-[70vh] flex flex-col">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="bg-red/10 text-red border-red/20 mb-6 px-4 py-1.5 text-sm uppercase tracking-widest font-bold">
            Project Architecture
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold text-navy tracking-tight mb-6">
            Industrial Case <span className="text-red">Studies</span>.
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed font-light">
            We are currently compiling our most impactful industrial projects. This space will soon feature deep-dives into challenges, solutions, and outcomes for our enterprise clients.
          </p>
        </div>

        {/* Future Grid Placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-50 grayscale pointer-events-none">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="aspect-video bg-gray-200" />
              <div className="p-6">
                <div className="h-4 w-24 bg-gray-200 rounded mb-4" />
                <div className="h-6 w-full bg-gray-200 rounded mb-2" />
                <div className="h-6 w-2/3 bg-gray-200 rounded mb-6" />
                <div className="flex items-center gap-2 text-gray-400 text-sm font-bold">
                  View Project <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
