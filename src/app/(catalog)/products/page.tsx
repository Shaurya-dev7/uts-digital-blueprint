import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { mockProducts } from "@/data/mockProducts";
import { ProductModelWrapper } from "@/components/3d/ProductModelWrapper";
import { Metadata } from "next";
import { ProductCatalogClient } from "./ProductCatalogClient";
import { Suspense } from "react";
import { catalogCategories, catalogIndustries, catalogApplications } from "@/data/catalogEntities";

export const metadata: Metadata = {
  title: "Industrial Equipment & Products Catalog",
  description: "Browse our extensive catalog of premium industrial valves, pumps, chemicals, and agriculture equipment.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  // Parse searchParams for filtering
  const categoryParam = resolvedSearchParams.category;
  const brandParam = resolvedSearchParams.brand;
  const industryParam = resolvedSearchParams.industry;
  const applicationParam = resolvedSearchParams.application;
  const statusParam = resolvedSearchParams.status;
  const availabilityParam = resolvedSearchParams.availability;
  const downloadsParam = resolvedSearchParams.downloads;
  const sortParam = resolvedSearchParams.sort || "newest";

  const categories = Array.isArray(categoryParam) ? categoryParam : categoryParam ? [categoryParam] : [];
  const brands = Array.isArray(brandParam) ? brandParam : brandParam ? [brandParam] : [];
  const industries = Array.isArray(industryParam) ? industryParam : industryParam ? [industryParam] : [];
  const applications = Array.isArray(applicationParam) ? applicationParam : applicationParam ? [applicationParam] : [];
  const statuses = Array.isArray(statusParam) ? statusParam : statusParam ? [statusParam] : [];
  const availability = Array.isArray(availabilityParam) ? availabilityParam : availabilityParam ? [availabilityParam] : [];
  const hasDownloads = downloadsParam === "true";

  // Filter products
  let filteredProducts = [...mockProducts];

  if (categories.length > 0) {
    filteredProducts = filteredProducts.filter((p) => p.categorySlugs.some(c => categories.includes(c)));
  }

  if (brands.length > 0) {
    filteredProducts = filteredProducts.filter((p) => brands.includes(p.brandSlug));
  }

  if (industries.length > 0) {
    filteredProducts = filteredProducts.filter((p) => p.industrySlugs.some(i => industries.includes(i)));
  }

  if (applications.length > 0) {
    filteredProducts = filteredProducts.filter((p) => p.applicationSlugs.some(a => applications.includes(a)));
  }

  if (statuses.length > 0) {
    // Check if the product has ANY of the selected statuses (New, Featured, etc.)
    filteredProducts = filteredProducts.filter((p) => 
      p.statuses?.some(s => statuses.includes(s))
    );
  }

  if (availability.length > 0) {
    // Check if the product has ANY of the selected availability statuses (In Stock, On Request, etc.)
    // Note: in our mock data, they are just bundled in `statuses`
    filteredProducts = filteredProducts.filter((p) => 
      p.statuses?.some(s => availability.includes(s))
    );
  }

  if (hasDownloads) {
    filteredProducts = filteredProducts.filter((p) => p.downloads && p.downloads.length > 0);
  }

  // Sort products
  if (sortParam === "a-z") {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortParam === "z-a") {
    filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
  }

  // Extract unique brands for the sidebar filters (using actual slugs from mock data)
  const allBrandSlugs = Array.from(new Set(mockProducts.map((p) => p.brandSlug)));
  const allCategorySlugs = catalogCategories.map(c => c.slug);
  const allIndustrySlugs = catalogIndustries.map(i => i.slug);
  const allApplicationSlugs = catalogApplications.map(a => a.slug);

  return (
    <div className="bg-gray-50 min-h-screen pt-32 pb-24">
      <Section className="bg-navy text-white pt-32 pb-8 -mt-32 mb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-navy to-navy pointer-events-none" />
        
        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center pt-8 pb-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">Product Catalog</h1>
              <p className="text-lg text-gray-300">
                Explore our comprehensive range of certified industrial equipment engineered for maximum reliability and safety.
              </p>
            </div>
            
            <div className="w-full h-[280px] lg:h-[320px] relative cursor-grab active:cursor-grabbing opacity-90 hover:opacity-100 transition-opacity duration-700 fade-in hidden lg:block">
              <ProductModelWrapper />
            </div>
          </div>
        </Container>
      </Section>

      <Container>
        <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading catalog...</div>}>
          <ProductCatalogClient 
            initialProducts={filteredProducts} 
            allCategories={allCategorySlugs}
            allBrands={allBrandSlugs}
            allIndustries={allIndustrySlugs}
            allApplications={allApplicationSlugs}
            activeCategories={categories}
            activeBrands={brands}
            activeIndustries={industries}
            activeApplications={applications}
            activeStatuses={statuses}
            activeAvailability={availability}
            hasDownloads={hasDownloads}
            currentSort={sortParam as string}
          />
        </Suspense>
      </Container>
    </div>
  );
}
