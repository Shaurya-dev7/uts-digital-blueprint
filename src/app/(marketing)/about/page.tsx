import { Metadata } from "next";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { CompanyStory } from "@/components/sections/about/CompanyStory";
import { InteractiveTimeline } from "@/components/sections/about/InteractiveTimeline";
import { FounderSection } from "@/components/sections/about/FounderSection";
import { MissionVision } from "@/components/sections/about/MissionVision";
import { CoreValues } from "@/components/sections/about/CoreValues";
import { WhyChooseUs } from "@/components/sections/about/WhyChooseUs";
import { IndustrySection } from "@/components/sections/IndustrySection";
import { InfrastructureSection } from "@/components/sections/about/InfrastructureSection";
import { AnimatedStats } from "@/components/sections/about/AnimatedStats";
import { QualityCommitment } from "@/components/sections/about/QualityCommitment";
import { CertificationsSection } from "@/components/sections/about/CertificationsSection";
import { CorporateResponsibility } from "@/components/sections/about/CorporateResponsibility";
import { TrustedBySection } from "@/components/sections/TrustedBySection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ContactCTASection } from "@/components/sections/ContactCTASection";

export const metadata: Metadata = {
  title: "About Universal Techno Services | Engineering Excellence",
  description: "Since 2013, UTS has been a premier supplier of industrial-grade equipment in Jamshedpur, providing critical infrastructure and heavy industries with seamless end-to-end solutions.",
  openGraph: {
    title: "About Universal Techno Services",
    description: "Your Trusted Partner in Industrial Solutions since 2013.",
    url: "https://www.utsjamshedpur.com/about",
    images: ["/images/hero-bg.jpg"],
  }
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "Universal Techno Services",
      "foundingDate": "2013",
      "founder": {
        "@type": "Person",
        "name": "Rajesh Kumar Rai"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "P/14 Pragati Nagar, Baridih",
        "addressLocality": "Jamshedpur",
        "addressRegion": "Jharkhand",
        "postalCode": "831017",
        "addressCountry": "IN"
      },
      "description": "Premier supplier of industrial grade equipment, specializing in valves, pumps, and heavy machinery."
    }
  };

  return (
    <main className="bg-white">
      {/* JSON-LD Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <AboutHero />
      <CompanyStory />
      <InteractiveTimeline />
      <FounderSection />
      <MissionVision />
      <CoreValues />
      <WhyChooseUs />
      
      {/* Heavy usage of existing components mixed with new ones */}
      <IndustrySection />
      
      <InfrastructureSection />
      <AnimatedStats />
      <QualityCommitment />
      <CertificationsSection />
      <CorporateResponsibility />
      
      {/* Trust factors reused from homepage */}
      <TrustedBySection />
      <FAQSection />
      
      <ContactCTASection />
    </main>
  );
}
