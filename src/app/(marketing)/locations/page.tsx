import React from "react";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { ContentLayout } from "@/components/layout/ContentLayout";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { mockLocations } from "@/data/mockContent";
import Link from "next/link";
import { MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Service Locations | Universal Techno Services",
  description: "UTS serves industrial clients across Jharkhand, Odisha, West Bengal, and nationwide.",
  alternates: {
    canonical: `${siteConfig.url}/locations`,
  }
};

export default function LocationsHubPage() {
  const states = mockLocations.filter(l => l.type === 'state');

  return (
    <>
      <SchemaMarkup 
        type="CollectionPage" 
        data={{
          name: "UTS Service Locations",
          description: "Industrial equipment supplier locations in India.",
        }} 
      />
      <ContentLayout
        title="Our Service Locations"
        subtitle="Delivering premium industrial engineering solutions and equipment across major industrial hubs in India."
        breadcrumbs={[{ label: "Locations", href: "/locations" }]}
        showSidebar={false}
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {states.map((state) => {
            const stateCities = mockLocations.filter(l => l.type === 'city' && l.stateSlug === state.slug);
            return (
              <div key={state.slug} className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-orange-50 rounded-lg text-[#F97316]">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-navy">
                    <Link href={`/locations/${state.slug}`} className="hover:text-[#F97316] transition-colors">
                      {state.name}
                    </Link>
                  </h2>
                </div>
                <ul className="space-y-3 mt-6">
                  {stateCities.map(city => (
                    <li key={city.id}>
                      <Link 
                        href={`/locations/${state.slug}/${city.slug}`}
                        className="text-slate-600 hover:text-[#F97316] font-medium flex items-center gap-2 transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                        {city.name}
                      </Link>
                    </li>
                  ))}
                  {stateCities.length === 0 && (
                    <li className="text-slate-400 text-sm italic">New locations coming soon</li>
                  )}
                </ul>
              </div>
            );
          })}
        </div>
      </ContentLayout>
    </>
  );
}
