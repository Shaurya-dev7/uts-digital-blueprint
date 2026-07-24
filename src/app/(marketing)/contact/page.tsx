import React from "react";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { ContactHero } from "@/components/sections/contact/ContactHero";
import { InteractiveContactCards } from "@/components/sections/contact/InteractiveContactCards";
import { LocationSection } from "@/components/sections/contact/LocationSection";
import { QuickContactForm } from "@/components/forms/QuickContactForm";
import { TrustFeatures } from "@/components/sections/shared/TrustFeatures";
import { SupportDirectory } from "@/components/sections/shared/SupportDirectory";
import { ContactFAQ } from "@/components/sections/shared/ContactFAQ";

export const metadata: Metadata = {
  title: "Contact Us - Universal Techno Services",
  description: "Get in touch with Universal Techno Services for quotations, technical support, and product inquiries. Our enterprise support team is ready to assist you.",
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  }
};

export default function ContactPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-0">
      <ContactHero />
      
      <div className="container mx-auto px-4 md:px-6 mt-16 mb-24">
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Left Column - Information */}
          <div className="lg:col-span-5 space-y-8">
            <InteractiveContactCards />
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-7">
            <div className="sticky top-24">
              <QuickContactForm />
            </div>
          </div>

        </div>
      </div>

      <LocationSection />
      <TrustFeatures />
      <SupportDirectory />
      <ContactFAQ />
    </div>
  );
}
