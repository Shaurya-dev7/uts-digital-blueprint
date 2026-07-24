import React from "react";
import Link from "next/link";
import { ChevronRight, Calendar, Clock, Share2, Printer, Download } from "lucide-react";

export interface ContentLayoutProps {
  title: string;
  subtitle?: string;
  author?: string;
  publishedAt?: string;
  updatedAt?: string;
  readingTime?: string;
  breadcrumbs: { label: string; href: string }[];
  children: React.ReactNode;
  showSidebar?: boolean;
}

export function ContentLayout({
  title,
  subtitle,
  author,
  publishedAt,
  updatedAt,
  readingTime,
  breadcrumbs,
  children,
  showSidebar = true
}: ContentLayoutProps) {
  return (
    <article className="min-h-screen bg-slate-50 pt-24 pb-20">
      {/* Header / Breadcrumbs */}
      <div className="bg-navy text-white pt-12 pb-20 px-4 md:px-6">
        <div className="container mx-auto max-w-7xl">
          <nav className="flex items-center text-sm text-slate-300 mb-8 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
                <Link href={crumb.href} className="hover:text-white transition-colors">
                  {crumb.label}
                </Link>
              </React.Fragment>
            ))}
          </nav>
          
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                {subtitle}
              </p>
            )}
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
              {author && (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold">
                    {author.charAt(0)}
                  </div>
                  <span>{author}</span>
                </div>
              )}
              {publishedAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{publishedAt}</span>
                </div>
              )}
              {readingTime && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{readingTime}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto max-w-7xl px-4 md:px-6 -mt-10 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Article Body */}
          <div className={`bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10 ${showSidebar ? 'lg:col-span-8' : 'lg:col-span-12'}`}>
            
            {/* Utility Bar */}
            <div className="flex flex-wrap items-center justify-between pb-6 mb-8 border-b border-slate-100 gap-4">
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-navy transition-colors">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-navy transition-colors">
                  <Printer className="w-4 h-4" />
                  Print
                </button>
                <button className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-navy transition-colors">
                  <Download className="w-4 h-4" />
                  PDF Export
                </button>
              </div>
              {updatedAt && (
                <div className="text-sm text-slate-500 italic">
                  Last updated: {updatedAt}
                </div>
              )}
            </div>

            {/* CMS Content Injection */}
            <div className="prose prose-slate prose-lg max-w-none 
              prose-headings:font-bold prose-headings:text-navy 
              prose-a:text-[#F97316] hover:prose-a:text-[#EA580C]
              prose-img:rounded-xl prose-img:shadow-sm"
            >
              {children}
            </div>
          </div>

          {/* Sticky Sidebar */}
          {showSidebar && (
            <aside className="lg:col-span-4 space-y-6">
              <div className="sticky top-24 space-y-6">
                
                {/* Table of Contents Placeholder */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                  <h3 className="font-bold text-navy mb-4">Table of Contents</h3>
                  <div className="space-y-3 text-sm text-slate-600">
                    <div className="hover:text-[#F97316] cursor-pointer transition-colors">Overview</div>
                    <div className="hover:text-[#F97316] cursor-pointer transition-colors">Key Features</div>
                    <div className="hover:text-[#F97316] cursor-pointer transition-colors">Applications</div>
                    <div className="hover:text-[#F97316] cursor-pointer transition-colors">Downloads</div>
                  </div>
                </div>

                {/* Lead Gen CTA */}
                <div className="bg-gradient-to-br from-navy to-slate-900 rounded-2xl shadow-sm border border-slate-800 p-6 text-white">
                  <h3 className="font-bold text-xl mb-2">Need Expert Advice?</h3>
                  <p className="text-slate-300 text-sm mb-6">Connect with our enterprise support team for technical consultation.</p>
                  <Link href="/contact" className="block w-full text-center bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold py-3 rounded-lg transition-colors">
                    Request Consultation
                  </Link>
                </div>
                
              </div>
            </aside>
          )}

        </div>
      </div>
    </article>
  );
}
