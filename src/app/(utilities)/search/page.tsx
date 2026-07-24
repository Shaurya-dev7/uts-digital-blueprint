import { ContentLayout } from "@/components/layout/ContentLayout";
import { SearchBar } from "@/components/ui/SearchBar";
import { mockIndustries, mockKnowledgeArticles, mockBlogs, mockDownloads } from "@/data/mockContent";
import Link from "next/link";
import { FileText, Factory, BookOpen, Download } from "lucide-react";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q?.toLowerCase() || '';

  // Basic search across our mock data
  const industryResults = mockIndustries.filter(i => 
    i.name.toLowerCase().includes(query) || i.shortDescription.toLowerCase().includes(query)
  );

  const knowledgeResults = mockKnowledgeArticles.filter(k => 
    k.title.toLowerCase().includes(query) || k.excerpt.toLowerCase().includes(query)
  );

  const blogResults = mockBlogs.filter(b => 
    b.title.toLowerCase().includes(query) || b.excerpt.toLowerCase().includes(query)
  );
  
  const downloadResults = mockDownloads.filter(d => 
    d.title.toLowerCase().includes(query) || d.description.toLowerCase().includes(query)
  );

  const totalResults = industryResults.length + knowledgeResults.length + blogResults.length + downloadResults.length;

  return (
    <ContentLayout
      title="Search Results"
      subtitle={query ? `Found ${totalResults} results for "${resolvedParams.q}"` : "Search our knowledge base, products, and resources."}
      breadcrumbs={[{ label: "Search", href: "/search" }]}
      showSidebar={false}
    >
      <div className="mb-12">
        <SearchBar />
      </div>

      {query && totalResults === 0 && (
        <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200">
          <p className="text-xl text-slate-500 mb-4">No results found for "{resolvedParams.q}"</p>
          <p className="text-slate-400">Try adjusting your search terms or exploring our main categories.</p>
        </div>
      )}

      {query && totalResults > 0 && (
        <div className="space-y-12">
          {industryResults.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-navy mb-6 flex items-center gap-2">
                <Factory className="text-[#F97316]" /> Industries
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {industryResults.map(res => (
                  <Link key={res.id} href={`/industries/${res.slug}`} className="block p-4 rounded-xl border border-slate-200 hover:border-[#F97316] transition-colors bg-white">
                    <h3 className="font-bold text-navy mb-2">{res.name}</h3>
                    <p className="text-sm text-slate-600 line-clamp-2">{res.shortDescription}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {knowledgeResults.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-navy mb-6 flex items-center gap-2">
                <BookOpen className="text-[#F97316]" /> Knowledge Center
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {knowledgeResults.map(res => (
                  <Link key={res.id} href={`/knowledge-center/${res.slug}`} className="block p-4 rounded-xl border border-slate-200 hover:border-[#F97316] transition-colors bg-white">
                    <h3 className="font-bold text-navy mb-2">{res.title}</h3>
                    <p className="text-sm text-slate-600 line-clamp-2">{res.excerpt}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
          
          {blogResults.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-navy mb-6 flex items-center gap-2">
                <FileText className="text-[#F97316]" /> Blog Posts
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {blogResults.map(res => (
                  <Link key={res.id} href={`/blog/${res.slug}`} className="block p-4 rounded-xl border border-slate-200 hover:border-[#F97316] transition-colors bg-white">
                    <h3 className="font-bold text-navy mb-2">{res.title}</h3>
                    <p className="text-sm text-slate-600 line-clamp-2">{res.excerpt}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
          
          {downloadResults.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-navy mb-6 flex items-center gap-2">
                <Download className="text-[#F97316]" /> Downloads
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {downloadResults.map(res => (
                  <a key={res.id} href={res.url} target="_blank" rel="noopener noreferrer" className="block p-4 rounded-xl border border-slate-200 hover:border-[#F97316] transition-colors bg-white">
                    <h3 className="font-bold text-navy mb-2">{res.title}</h3>
                    <p className="text-sm text-slate-600 line-clamp-2">{res.description}</p>
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </ContentLayout>
  );
}
