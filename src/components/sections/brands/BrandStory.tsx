import React from "react";
import { Brand } from "@/types/catalog";
import { CheckCircle2 } from "lucide-react";

interface BrandStoryProps {
  brand: Brand;
}

export function BrandStory({ brand }: BrandStoryProps) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Main Story Content */}
          <div className="flex-1 lg:w-2/3">
            <h2 className="text-3xl font-bold text-navy mb-6">About {brand.name}</h2>
            <div className="prose prose-lg prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed text-lg mb-8">
                {brand.fullDescription}
              </p>
              
              <h3 className="text-2xl font-bold text-navy mt-12 mb-6">Partnership Value</h3>
              <p className="text-gray-600 leading-relaxed text-lg mb-8">
                As an authorized partner of {brand.name}, Universal Techno Services ensures that you receive genuine products, comprehensive technical support, and reliable warranty services. Our technical teams are trained directly by {brand.name} to help you select the exact specifications required for your critical applications.
              </p>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="lg:w-1/3">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 sticky top-32">
              <h3 className="text-xl font-bold text-navy mb-6 pb-4 border-b border-gray-200">
                Key Highlights
              </h3>
              
              <div className="space-y-8">
                <div>
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Core Products</h4>
                  <ul className="space-y-3">
                    {brand.categories.map(category => (
                      <li key={category} className="flex items-start gap-3 text-navy font-medium">
                        <CheckCircle2 className="w-5 h-5 text-red flex-shrink-0 mt-0.5" />
                        <span className="capitalize">{category.replace(/-/g, ' ')}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Target Industries</h4>
                  <div className="flex flex-wrap gap-2">
                    {brand.industries.map(ind => (
                      <span key={ind} className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-md text-sm font-medium shadow-sm">
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
