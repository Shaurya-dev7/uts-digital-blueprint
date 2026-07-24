import { notFound } from "next/navigation";
import { mockLocations } from "@/data/mockContent";
import { ContentLayout } from "@/components/layout/ContentLayout";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

interface StatePageProps {
  params: Promise<{
    state: string;
  }>;
}

export default async function StateLocationPage({ params }: StatePageProps) {
  const resolvedParams = await params;
  
  // Find the state
  const stateLocation = mockLocations.find(l => l.slug === resolvedParams.state && l.type === 'state');
  
  // Find cities in this state
  const cities = mockLocations.filter(l => l.type === 'city' && l.stateSlug === resolvedParams.state);

  if (!stateLocation) {
    notFound();
  }

  return (
    <>
      <SchemaMarkup
        type="CollectionPage"
        data={{
          name: `UTS Service Locations in ${stateLocation.name}`,
          description: stateLocation.aboutText,
        }}
      />
      <ContentLayout
        title={`Industrial Solutions in ${stateLocation.name}`}
        subtitle={stateLocation.aboutText}
        breadcrumbs={[
          { label: "Locations", href: "/locations" },
          { label: stateLocation.name, href: `/locations/${stateLocation.slug}` }
        ]}
        showSidebar={false}
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cities.map((city) => (
            <div key={city.id} className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-50 rounded-lg text-[#F97316]">
                  <MapPin className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-navy">
                  <Link href={`/locations/${stateLocation.slug}/${city.slug}`} className="hover:text-[#F97316] transition-colors">
                    {city.name}
                  </Link>
                </h2>
              </div>
              <p className="text-slate-600 mb-6">{city.aboutText}</p>
              
              <Link 
                href={`/locations/${stateLocation.slug}/${city.slug}`}
                className="inline-flex items-center gap-2 text-[#F97316] font-bold hover:text-[#EA580C] transition-colors"
              >
                View Branch Details
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
          {cities.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-500">
              More city locations opening soon in {stateLocation.name}.
            </div>
          )}
        </div>
      </ContentLayout>
    </>
  );
}
