import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ContentLayout } from "@/components/layout/ContentLayout";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { mockBlogs } from "@/data/mockContent";
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";

export default function BlogPage() {
  return (
    <>
      <SchemaMarkup 
        type="CollectionPage" 
        data={{
          name: "UTS Engineering Blog",
          description: "Insights, updates, and deep dives into industrial engineering solutions.",
        }} 
      />
      <ContentLayout
        title="Engineering Blog"
        subtitle="Insights, updates, and deep dives into industrial engineering solutions from our experts."
        breadcrumbs={[{ label: "Blog", href: "/blog" }]}
        showSidebar={true} // In the future, this sidebar could hold categories or tags
      >
        <div className="space-y-12">
          {mockBlogs.map((blog) => (
            <article key={blog.id} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="grid md:grid-cols-5 gap-0">
                <div className="md:col-span-2 aspect-video md:aspect-auto overflow-hidden relative">
                  <div className="absolute inset-0 bg-slate-100" />
                  <img 
                    src={blog.heroImage.url} 
                    alt={blog.heroImage.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 relative z-10"
                  />
                  <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-[#F97316]">
                    {blog.category}
                  </div>
                </div>
                
                <div className="md:col-span-3 p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-4">
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {new Date(blog.publishedAt).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> {blog.author}</span>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-navy mb-3 group-hover:text-[#F97316] transition-colors">
                    <Link href={`/blog/${blog.slug}`}>
                      {blog.title}
                    </Link>
                  </h2>
                  
                  <p className="text-slate-600 mb-6 line-clamp-2">{blog.excerpt}</p>
                  
                  <Link 
                    href={`/blog/${blog.slug}`}
                    className="inline-flex items-center gap-2 text-navy font-bold hover:text-[#F97316] transition-colors mt-auto"
                  >
                    Read Full Article
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </ContentLayout>
    </>
  );
}
