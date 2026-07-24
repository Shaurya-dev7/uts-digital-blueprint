import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { CustomerShowcase } from "@/components/sections/customers/CustomerShowcase";
import { TrustMetrics } from "@/components/sections/trust/TrustMetrics";
import { DownloadCenter } from "@/components/sections/trust/DownloadCenter";
import { LogoMarquee } from "@/components/ui/LogoMarquee";
import { mockCustomers } from "@/lib/data/mockCustomers";

export const metadata: Metadata = {
  title: "Trusted By Industry Leaders",
  description: "UTS partners with India's largest industrial, manufacturing, and infrastructure companies.",
  alternates: {
    canonical: `${siteConfig.url}/customers`,
  }
};

export default function CustomersPage() {
  const marqueeLogos = mockCustomers.map(c => ({ name: c.name, src: c.logoUrl }));

  return (
    <div className="bg-slate-50 min-h-screen">
      <CustomerShowcase />
      <div className="py-16 bg-white border-y border-slate-200">
        <div className="container mx-auto px-4 md:px-6 mb-8 text-center">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Our Valued Partners</h3>
        </div>
        <div className="opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
          <LogoMarquee logos={marqueeLogos} />
        </div>
      </div>
      <TrustMetrics />
      <DownloadCenter />
    </div>
  );
}
