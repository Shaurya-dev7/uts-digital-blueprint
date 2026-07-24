import { mockKnowledgeArticles, mockDownloads, mockBlogs, mockIndustries } from "@/data/mockContent";
import { Product } from "@/types/product";

/**
 * Recommends related content based on tags or categories.
 */
export function getRelatedContent(tags: string[], currentSlug: string) {
  const relatedArticles = mockKnowledgeArticles.filter(
    a => a.slug !== currentSlug && a.tags.some(tag => tags.includes(tag))
  ).slice(0, 3);

  const relatedBlogs = mockBlogs.filter(
    b => b.slug !== currentSlug && b.tags.some(tag => tags.includes(tag))
  ).slice(0, 3);

  const relatedDownloads = mockDownloads.filter(
    d => d.tags.some(tag => tags.includes(tag))
  ).slice(0, 3);

  const relatedIndustries = mockIndustries.filter(
    i => i.slug !== currentSlug && (
      i.name.split(' ').some(word => tags.includes(word)) ||
      i.applications.some(app => tags.includes(app.title))
    )
  ).slice(0, 3);

  return {
    articles: relatedArticles,
    blogs: relatedBlogs,
    downloads: relatedDownloads,
    industries: relatedIndustries
  };
}

/**
 * Recommends products based on tags or category (if we had a mockProducts list imported)
 */
export function getRelatedProductsForContent(tags: string[], mockProductsList: Product[]) {
  return mockProductsList.filter(
    p => p.categorySlugs.some(cat => tags.includes(cat)) || 
         p.industrySlugs.some(ind => tags.includes(ind))
  ).slice(0, 4);
}
