import React from "react";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { ContentLayout } from "@/components/layout/ContentLayout";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import Link from "next/link";
import { FileText, BookOpen, Download, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Resource Center | Universal Techno Services",
  description: "Access engineering guides, product catalogues, and technical resources.",
  alternates: {
    canonical: `${siteConfig.url}/resources`,
  }
};

export default function ResourcesHubPage() {
  const resourceCategories = [
    {
      title: "Knowledge Center",
      description: "Engineering guides, maintenance tutorials, and troubleshooting.",
      icon: <BookOpen className="w-8 h-8" />,
      href: "/knowledge-center",
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Engineering Blog",
      description: "Industry insights, latest updates, and expert opinions.",
      icon: <FileText className="w-8 h-8" />,
      href: "/blog",
      color: "bg-green-50 text-green-600"
    },
    {
      title: "Download Center",
      description: "Datasheets, brochures, manuals, and certificates.",
      icon: <Download className="w-8 h-8" />,
      href: "/downloads",
      color: "bg-orange-50 text-orange-600"
    },
    {
      title: "FAQs",
      description: "Answers to common questions about our products and services.",
      icon: <HelpCircle className="w-8 h-8" />,
      href: "/faq",
      color: "bg-purple-50 text-purple-600"
    }
  ];

  return (
    <>
      <SchemaMarkup 
        type="CollectionPage" 
        data={{
          name: "UTS Resource Center",
          description: "Hub for industrial engineering resources and downloads.",
        }} 
      />
      <ContentLayout
        title="Resource Center"
        subtitle="Your central hub for engineering knowledge, product documentation, and industry insights."
        breadcrumbs={[{ label: "Resources", href: "/resources" }]}
        showSidebar={false}
      >
        <div className="grid md:grid-cols-2 gap-8">
          {resourceCategories.map((category) => (
            <Link key={category.title} href={category.href} className="group block bg-white rounded-2xl border border-slate-200 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className={`p-4 rounded-xl inline-block mb-6 ${category.color}`}>
                {category.icon}
              </div>
              <h2 className="text-2xl font-bold text-navy mb-3 group-hover:text-[#F97316] transition-colors">{category.title}</h2>
              <p className="text-slate-600 mb-6">{category.description}</p>
              <div className="text-navy font-bold flex items-center gap-2 group-hover:text-[#F97316] transition-colors">
                Explore {category.title} &rarr;
              </div>
            </Link>
          ))}
        </div>
      </ContentLayout>
    </>
  );
}
