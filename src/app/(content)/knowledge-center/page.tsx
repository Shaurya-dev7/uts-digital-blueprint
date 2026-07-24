import React from "react";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { ContentLayout } from "@/components/layout/ContentLayout";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { mockKnowledgeArticles } from "@/data/mockContent";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Knowledge Center | Universal Techno Services",
  description: "Industrial engineering guides, maintenance tutorials, and technical resources.",
  alternates: {
    canonical: `${siteConfig.url}/knowledge-center`,
  }
};

export default function KnowledgeCenterPage() {
  return (
    <>
      <SchemaMarkup 
        type="CollectionPage" 
        data={{
          name: "UTS Knowledge Center",
          description: "Industrial engineering guides and resources.",
          url: `${siteConfig.url}/knowledge-center`
        }} 
      />
      <ContentLayout
        title="Knowledge Center"
        subtitle="Explore our library of engineering guides, maintenance tutorials, and technical resources."
        breadcrumbs={[{ label: "Knowledge Center", href: "/knowledge-center" }]}
        showSidebar={false}
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockKnowledgeArticles.map((article) => (
            <div key={article.id} className="group p-6 rounded-xl border border-slate-200 hover:shadow-lg transition-all duration-300 bg-white flex flex-col">
              <div className="flex items-center gap-2 text-sm text-[#F97316] font-semibold mb-3">
                <BookOpen className="w-4 h-4" />
                {article.category}
              </div>
              <h3 className="font-bold text-xl mb-3 text-navy group-hover:text-[#F97316] transition-colors">{article.title}</h3>
              <p className="text-slate-600 text-sm mb-6 flex-grow">{article.excerpt}</p>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                <span className="text-xs text-slate-400">{article.readingTime} read</span>
                <Link 
                  href={`/knowledge-center/${article.slug}`} 
                  className="inline-flex items-center gap-1 text-navy font-semibold hover:text-[#F97316] transition-colors text-sm"
                >
                  Read Article <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </ContentLayout>
    </>
  );
}
