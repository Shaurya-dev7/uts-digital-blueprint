import React from "react";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { ContentLayout } from "@/components/layout/ContentLayout";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { notFound } from "next/navigation";
import Image from "next/image";
import { mockKnowledgeArticles } from "@/data/mockContent";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const article = mockKnowledgeArticles.find(a => a.slug === resolvedParams.slug);
  
  if (!article) return { title: "Not Found" };

  return {
    title: `${article.title} | UTS Knowledge Center`,
    description: article.excerpt,
    alternates: {
      canonical: `${siteConfig.url}/knowledge-center/${resolvedParams.slug}`,
    }
  };
}

export default async function KnowledgeCenterArticlePage({ params }: PageProps) {
  const resolvedParams = await params;
  const article = mockKnowledgeArticles.find(a => a.slug === resolvedParams.slug);
  
  if (!article) notFound();

  return (
    <>
      <SchemaMarkup 
        type="Article" 
        data={{
          headline: article.title,
          description: article.excerpt,
          author: {
            "@type": "Person",
            name: article.author
          },
          dateModified: article.updatedAt,
        }} 
      />
      <ContentLayout
        title={article.title}
        subtitle={article.excerpt}
        author={article.author}
        updatedAt={article.updatedAt}
        readingTime={article.readingTime}
        breadcrumbs={[
          { label: "Knowledge Center", href: "/knowledge-center" },
          { label: article.title, href: `/knowledge-center/${resolvedParams.slug}` }
        ]}
      >
        <div className="prose prose-slate max-w-none">
          <div className="relative w-full h-[400px] rounded-2xl mb-8 overflow-hidden">
            <Image 
              src={article.heroImage.url} 
              alt={article.heroImage.alt} 
              fill
              className="object-cover m-0"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
            />
          </div>
          
          {/* Note: This parses markdown into HTML in a real scenario, here we're rendering it simply.
              For a robust app, we should use a library like 'marked' or 'react-markdown'.
              Since our mock data uses simple markdown, we will leave it as plain text or pre tags for now,
              but standardizing on a parser is recommended. */}
          <div className="whitespace-pre-wrap font-serif text-lg leading-relaxed text-slate-800">
            {article.content}
          </div>
          
        </div>
      </ContentLayout>
    </>
  );
}
