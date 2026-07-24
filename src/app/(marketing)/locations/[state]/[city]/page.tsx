import { notFound } from "next/navigation";
import { mockLocations } from "@/data/mockContent";
import { ContentLayout } from "@/components/layout/ContentLayout";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import Link from "next/link";
import { MapPin, Building2, Phone, Mail, Clock } from "lucide-react";

interface CityPageProps {
  params: Promise<{
    state: string;
    city: string;
  }>;
}

export default async function CityLocationPage({ params }: CityPageProps) {
  const resolvedParams = await params;
  
  // Find the state first
  const stateLocation = mockLocations.find(l => l.slug === resolvedParams.state && l.type === 'state');
  
  // Find the specific city
  const cityLocation = mockLocations.find(l => 
    l.slug === resolvedParams.city && 
    l.type === 'city' && 
    l.stateSlug === resolvedParams.state
  );

  if (!stateLocation || !cityLocation) {
    notFound();
  }

  return (
    <>
      <SchemaMarkup
        type="LocalBusiness"
        data={{
          name: cityLocation.name,
          description: cityLocation.aboutText,
          image: cityLocation.heroImage.url,
          address: {
            "@type": "PostalAddress",
            "streetAddress": cityLocation.address,
            "addressLocality": cityLocation.name,
            "addressRegion": stateLocation.name,
            "addressCountry": "IN"
          },
          telephone: cityLocation.phone,
          email: cityLocation.email,
        }}
      />
      <ContentLayout
        title={`UTS ${cityLocation.name}`}
        subtitle={cityLocation.aboutText}
        breadcrumbs={[
          { label: "Locations", href: "/locations" },
          { label: stateLocation.name, href: `/locations/${stateLocation.slug}` },
          { label: cityLocation.name, href: `/locations/${stateLocation.slug}/${cityLocation.slug}` }
        ]}
      >
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 prose prose-slate max-w-none">
            <img src={cityLocation.heroImage.url} alt={cityLocation.heroImage.alt} className="w-full h-[300px] object-cover rounded-2xl mb-8" />
            
            <h2 className="text-3xl font-bold text-navy mb-4">About Our {cityLocation.name} Operations</h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-8">{cityLocation.aboutText}</p>

            <h3 className="text-2xl font-bold text-navy mb-4">Industries Served</h3>
            <ul className="grid grid-cols-2 gap-4 list-none pl-0">
              {cityLocation.industriesServed.map((industry, idx) => (
                <li key={idx} className="flex items-center gap-2 text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div className="w-2 h-2 rounded-full bg-[#F97316]" />
                  {industry}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="bg-navy text-white p-8 rounded-2xl sticky top-24">
              <h3 className="text-xl font-bold mb-6 border-b border-white/20 pb-4">Contact Details</h3>
              
              <div className="space-y-6">
                {cityLocation.address && (
                  <div className="flex gap-4">
                    <MapPin className="w-6 h-6 text-[#F97316] shrink-0" />
                    <div>
                      <p className="font-semibold mb-1">Address</p>
                      <p className="text-slate-300">{cityLocation.address}</p>
                    </div>
                  </div>
                )}
                
                {cityLocation.phone && (
                  <div className="flex gap-4">
                    <Phone className="w-6 h-6 text-[#F97316] shrink-0" />
                    <div>
                      <p className="font-semibold mb-1">Phone</p>
                      <a href={`tel:${cityLocation.phone}`} className="text-slate-300 hover:text-white transition-colors">{cityLocation.phone}</a>
                    </div>
                  </div>
                )}
                
                {cityLocation.email && (
                  <div className="flex gap-4">
                    <Mail className="w-6 h-6 text-[#F97316] shrink-0" />
                    <div>
                      <p className="font-semibold mb-1">Email</p>
                      <a href={`mailto:${cityLocation.email}`} className="text-slate-300 hover:text-white transition-colors">{cityLocation.email}</a>
                    </div>
                  </div>
                )}
                
                {cityLocation.businessHours && (
                  <div className="flex gap-4">
                    <Clock className="w-6 h-6 text-[#F97316] shrink-0" />
                    <div>
                      <p className="font-semibold mb-1">Business Hours</p>
                      <p className="text-slate-300">{cityLocation.businessHours}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/20">
                <Link href="/contact" className="block w-full bg-[#F97316] text-white text-center py-3 rounded-lg font-bold hover:bg-[#EA580C] transition-colors">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </ContentLayout>
    </>
  );
}
