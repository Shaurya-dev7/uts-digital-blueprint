import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { mockProducts } from "@/data/mockProducts";
import { ProductCatalogClient } from "../../ProductCatalogClient";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { catalogCategories, catalogSubcategories } from "@/data/catalogEntities";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = catalogCategories.find(c => c.slug === slug);
  if (!category) return {};
  
  return {
    title: `${category.name} | UTS Product Catalog`,
    description: category.description,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const category = catalogCategories.find(c => c.slug === slug);
  
  if (!category) {
    notFound();
  }

  // Find subcategories that belong to this category
  const subcategories = catalogSubcategories.filter(s => s.parentCategorySlug === category.slug);
  const categorySlug = slug;
  const categoryName = categorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  // Filter products by this base category slug
  const baseCategoryProducts = mockProducts.filter(p => p.categorySlugs.includes(categorySlug));

  if (baseCategoryProducts.length === 0) {
    notFound();
  }

  // Parse searchParams for additional filtering
  const brandParam = resolvedSearchParams.brand;
  const sortParam = resolvedSearchParams.sort || "newest";

  const brands = Array.isArray(brandParam) ? brandParam : brandParam ? [brandParam] : [];

  // Apply filters
  let filteredProducts = [...baseCategoryProducts];

  if (brands.length > 0) {
    filteredProducts = filteredProducts.filter((p) => brands.includes(p.brandSlug));
  }

  // Sort products
  if (sortParam === "a-z") {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortParam === "z-a") {
    filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
  }

  // Extract unique categories (will just be 1 for this route) and brands
  const allCategories = [categorySlug];
  const allBrands = Array.from(new Set(baseCategoryProducts.map((p) => p.brandSlug)));

  return (
    <div className="bg-gray-50 min-h-screen pt-32 pb-24">
      <Section className="bg-navy text-white py-16 -mt-32 mb-12" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '32px 32px' }}>
        <Container>
          <div className="max-w-3xl pt-24">
            <span className="text-red font-bold tracking-wider uppercase text-sm mb-2 block">Category</span>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">{categoryName}</h1>
            <p className="text-lg text-gray-300">
              High-performance {categoryName.toLowerCase()} engineered for maximum efficiency, reliability, and safety in industrial applications.
            </p>
          </div>
        </Container>
      </Section>

      <Container>
        <ProductCatalogClient 
          initialProducts={filteredProducts} 
          allCategories={allCategories}
          allBrands={allBrands}
          activeCategories={[categorySlug]} 
          activeBrands={brands}
          currentSort={sortParam as string}
        />
      </Container>
    </div>
  );
}
