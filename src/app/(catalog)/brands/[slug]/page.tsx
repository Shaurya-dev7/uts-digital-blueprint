import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBrandBySlug, mockBrands } from "@/lib/data/mockBrands";
import { siteConfig } from "@/config/site";
import { IndividualBrandHero } from "@/components/sections/brands/IndividualBrandHero";
import { BrandStory } from "@/components/sections/brands/BrandStory";
import { mockProducts } from "@/data/mockProducts";
import { ProductCard } from "@/components/cards/ProductCard";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export async function generateStaticParams() {
  return mockBrands.map((brand) => ({
    slug: brand.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  
  if (!brand) return {};
  
  return {
    title: `${brand.name} Products & Equipment | UTS`,
    description: brand.fullDescription || brand.shortDescription,
    openGraph: {
      images: [brand.logoUrl],
    }
  };
}

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);

  if (!brand) {
    notFound();
  }

  // Get products for this brand
  const brandProducts = mockProducts.filter(p => p.brandSlug === brand.slug);

  // Schema generation for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Brand",
    "name": brand.name,
    "description": brand.shortDescription,
    "logo": brand.logoUrl,
    "url": `${siteConfig.url}/brands/${brand.slug}`
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero & Story Sections */}
      <IndividualBrandHero brand={brand} productCount={brandProducts.length} />
      <BrandStory brand={brand} />

      {/* Brand Products Section */}
      {brandProducts.length > 0 && (
        <Section className="bg-slate-50 border-t border-slate-200">
          <Container>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-4">
                  {brand.name} Equipment
                </h2>
                <p className="text-slate-600 text-lg">
                  Explore our complete range of certified {brand.name} products, engineered for industrial reliability.
                </p>
              </div>
              <Link 
                href={`/products?brand=${brand.slug}`}
                className="mt-6 md:mt-0 flex items-center text-[#F97316] font-bold hover:text-[#ea580c] transition-colors"
              >
                View full {brand.name} catalog <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {brandProducts.slice(0, 8).map(product => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  category={product.categorySlugs[0] || 'Equipment'}
                  description={product.shortDescription}
                  imagePlaceholder={product.images.find(img => img.isHero)?.url || product.images[0]?.url || "/images/hero-bg.jpg"}
                  slug={product.slug}
                  brand={product.brandSlug}
                  statuses={product.statuses}
                />
              ))}
            </div>
            
            {brandProducts.length > 8 && (
              <div className="mt-12 text-center">
                <Link 
                  href={`/products?brand=${brand.slug}`}
                  className="inline-flex items-center justify-center px-8 py-4 bg-white border border-slate-200 text-navy font-bold rounded-xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all"
                >
                  Load More {brand.name} Products
                </Link>
              </div>
            )}
          </Container>
        </Section>
      )}
    </div>
  );
}
