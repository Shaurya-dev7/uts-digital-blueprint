import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { mockProducts } from "@/data/mockProducts";
import { AdvancedGallery } from "@/components/products/AdvancedGallery";
import { ProductBadges } from "@/components/products/ProductBadges";
import { DocumentCard } from "@/components/cards/DocumentCard";
import { ProductCard } from "@/components/cards/ProductCard";
import { Button } from "@/components/ui/button";
import { Check, ChevronRight, Share2, Printer, Shield, Globe, MessageCircle, Phone, ArrowRight, HelpCircle, FileText, Factory, GitCompare, Layers } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getBrandBySlug } from "@/lib/data/mockBrands";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { StickyProductNav } from "@/components/products/StickyProductNav";
import { RecentlyViewed, RecentlyViewedTracker } from "@/components/products/RecentlyViewed";
import { buttonVariants } from "@/components/ui/button";
import { QuickHighlights } from "@/components/products/QuickHighlights";
import { cn } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = mockProducts.find(p => p.slug === slug);
  if (!product) return {};
  
  return {
    title: product.seoTitle || `${product.name} | UTS`,
    description: product.seoDescription || product.shortDescription,
    openGraph: {
      images: [product.images[0]?.url || ""],
    }
  };
}

export default async function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = mockProducts.find(p => p.slug === slug);
  
  if (!product) {
    return (
      <div className="bg-slate-50 min-h-screen pt-40 pb-24 flex items-center justify-center">
        <div className="bg-white p-12 rounded-3xl shadow-sm border border-slate-200 text-center max-w-lg">
          <HelpCircle className="w-16 h-16 text-slate-300 mx-auto mb-6" />
          <h1 className="text-3xl font-extrabold text-navy mb-4">No Details Available</h1>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Detailed information for this product is currently unavailable. Please contact our administrative team or support desk for technical sheets and pricing.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/products" className={cn(buttonVariants({ variant: "outline" }), "font-bold text-navy")}>
              Back to Catalog
            </Link>
            <Link href="/contact" className={cn(buttonVariants(), "font-bold bg-[#F97316] text-white hover:bg-[#ea580c]")}>
              Contact Admins
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const brand = getBrandBySlug(product.brandSlug);
  
  const relatedProducts = product.relatedProductSlugs 
    ? mockProducts.filter(p => product.relatedProductSlugs?.includes(p.slug))
    : mockProducts.filter(p => p.categorySlugs[0] === product.categorySlugs[0] && p.slug !== product.slug).slice(0, 4);

  const sameBrandProducts = mockProducts.filter(p => p.brandSlug === product.brandSlug && p.slug !== product.slug).slice(0, 4);

  // SEO JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.images.map(img => img.url),
    "description": product.longDescription || product.shortDescription,
    "sku": product.id,
    "brand": {
      "@type": "Brand",
      "name": brand?.name || product.brandSlug
    },
    "offers": {
      "@type": "Offer",
      "url": `https://www.utsjamshedpur.com/products/${product.slug}`,
      "priceCurrency": "INR",
      "price": "0", 
      "availability": product.statuses?.includes("In Stock") ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
      "seller": {
        "@type": "Organization",
        "name": "Universal Techno Services"
      }
    }
  };

  const navSections = [
    { id: 'overview', label: 'Overview' },
    ...(product.specifications && product.specifications.length > 0 ? [{ id: 'specs', label: 'Specifications' }] : []),
    ...(product.downloads && product.downloads.length > 0 ? [{ id: 'downloads', label: 'Downloads' }] : []),
    ...(product.faqs && product.faqs.length > 0 ? [{ id: 'faq', label: 'FAQ' }] : [])
  ];

  return (
    <div className="bg-white min-h-screen pt-32 pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <RecentlyViewedTracker productId={product.id} />
      
      <Container>
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-8 overflow-x-auto whitespace-nowrap hide-scrollbar">
          <ol className="flex items-center space-x-2 text-sm text-slate-500 font-medium">
            <li><Link href="/" className="hover:text-navy transition-colors">Home</Link></li>
            <li><ChevronRight className="w-4 h-4 text-slate-300" /></li>
            <li><Link href="/products" className="hover:text-navy transition-colors">Products</Link></li>
            <li><ChevronRight className="w-4 h-4 text-slate-300" /></li>
            {product.categorySlugs[0] && (
              <>
                <li><Link href={`/products?category=${product.categorySlugs[0]}`} className="hover:text-navy transition-colors capitalize">{product.categorySlugs[0].replace(/-/g, ' ')}</Link></li>
                <li><ChevronRight className="w-4 h-4 text-slate-300" /></li>
              </>
            )}
            <li className="text-navy font-bold" aria-current="page">{product.name}</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Gallery */}
            <div className="w-full bg-slate-50 rounded-3xl p-6 border border-slate-200">
              <AdvancedGallery images={product.images} />
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <Link href={`/brands/${product.brandSlug}`} className="inline-block px-3 py-1 bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-navy font-bold text-xs rounded-full uppercase tracking-wider mb-4 transition-colors">
                    {brand?.name || product.brandSlug}
                  </Link>
                  <h1 className="text-3xl md:text-5xl font-extrabold text-navy leading-tight mb-4">{product.name}</h1>
                  <ProductBadges statuses={product.statuses} className="mb-6" />
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-navy bg-slate-50 rounded-full"><Share2 className="w-5 h-5" /></Button>
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-navy bg-slate-50 rounded-full hidden sm:flex"><Printer className="w-5 h-5" /></Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600 mb-6 pb-6 border-b border-slate-100">
                <span className="flex items-center gap-1.5 font-medium"><Globe className="w-4 h-4 text-slate-400" /> SKU: <strong className="text-navy">{product.id}</strong></span>
                {brand?.country && <span className="flex items-center gap-1.5 font-medium"><Shield className="w-4 h-4 text-slate-400" /> Origin: <strong className="text-navy">{brand.country}</strong></span>}
              </div>

              <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed mb-8">
                {product.longDescription || product.shortDescription}
              </div>

              <div className="mt-auto pt-8">
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <Button size="lg" className="flex-1 bg-[#F97316] hover:bg-[#ea580c] text-white text-lg h-14 shadow-lg shadow-orange-500/20">
                    Request Quote
                  </Button>
                  <Button size="lg" variant="outline" className="flex-1 border-slate-200 text-navy hover:bg-slate-50 h-14 flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-green-500" /> WhatsApp Sales
                  </Button>
                </div>
                <Link href={`/products/compare?id=${product.id}`} className={cn(buttonVariants({ variant: "ghost" }), "w-full text-slate-500 hover:text-navy hover:bg-slate-50 font-bold")}>
                  <GitCompare className="w-4 h-4 mr-2" /> Add to Compare
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
      
      {/* Quick Highlights Horizontal Ribbon */}
      <QuickHighlights product={product} />

      {/* Sticky Navigation */}
      <StickyProductNav sections={navSections} />

      <Container>
        <div id="overview" className="scroll-mt-32 pt-16 pb-16 border-b border-slate-200">
          
          {/* Applications & Industries Linear Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-bold text-navy mb-6 flex items-center gap-3">
                <Layers className="text-[#F97316] w-6 h-6" /> Applications
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.applicationSlugs.map((app, i) => (
                  <Link key={i} href={`/products?application=${app}`} className="bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-colors shadow-sm">
                    {app.replace(/-/g, ' ')}
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-bold text-navy mb-6 flex items-center gap-3">
                <Factory className="text-[#F97316] w-6 h-6" /> Industries
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.industrySlugs.map((ind, i) => (
                  <Link key={i} href={`/products?industry=${ind}`} className="bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-colors shadow-sm">
                    {ind.replace(/-/g, ' ')}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Benefits Block */}
          {product.benefits && product.benefits.length > 0 && (
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200">
              <h3 className="text-3xl font-extrabold text-navy mb-8 text-center">Key Benefits</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="mt-1 bg-emerald-100 p-2 rounded-full flex-shrink-0"><Check className="w-5 h-5 text-emerald-600" strokeWidth={3} /></div>
                    <span className="text-slate-700 font-medium text-lg leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Specifications Section */}
        {product.specifications && product.specifications.length > 0 && (
          <div id="specs" className="scroll-mt-32 pt-16 pb-16 border-b border-slate-200">
            <h2 className="text-3xl font-extrabold text-navy mb-8">Technical Specifications</h2>
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <tbody>
                  {product.specifications.map((spec, i) => (
                    <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                      <th className="py-5 px-6 text-slate-500 font-medium w-1/3 bg-slate-50/50">{spec.name}</th>
                      <td className="py-5 px-6 text-navy font-semibold">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Downloads Section */}
        {product.downloads && product.downloads.length > 0 && (
          <div id="downloads" className="scroll-mt-32 pt-16 pb-16 border-b border-slate-200">
            <h2 className="text-3xl font-extrabold text-navy mb-8 flex items-center gap-3">
              Downloads <span className="bg-slate-200 text-slate-600 text-sm py-1 px-3 rounded-full">{product.downloads.length}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.downloads.map((doc, i) => (
                <DocumentCard key={i} document={doc} />
              ))}
            </div>
          </div>
        )}

        {/* FAQ Section */}
        {product.faqs && product.faqs.length > 0 && (
          <div id="faq" className="scroll-mt-32 pt-16 pb-16 border-b border-slate-200">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-extrabold text-navy mb-8 text-center">Frequently Asked Questions</h2>
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
                <Accordion className="w-full">
                  {product.faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`item-${i}`} className="border-slate-100">
                      <AccordionTrigger className="text-left font-bold text-navy hover:text-[#F97316] text-lg py-4">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-slate-600 leading-relaxed text-base pb-6">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        )}

        {/* Need Help CTA */}
        <div className="pt-16 pb-16">
          <div className="bg-gradient-to-br from-navy to-slate-900 rounded-3xl p-12 text-white shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-[#F97316]/20 transition-colors duration-500" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <HelpCircle className="w-12 h-12 text-[#F97316] mb-6" />
                <h2 className="text-3xl font-extrabold mb-4">Need help choosing the right equipment?</h2>
                <p className="text-slate-300 text-lg max-w-2xl leading-relaxed">
                  Our engineers are ready to help you select the exact specifications for your application. Contact us for custom quotes and technical support.
                </p>
              </div>
              <div className="flex-shrink-0 w-full md:w-auto">
                <Button size="lg" className="w-full md:w-auto bg-white text-navy hover:bg-slate-100 font-bold h-14 px-8 text-lg group-hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] transition-all">
                  <Phone className="w-5 h-5 mr-3" /> Talk to an Expert
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Products From Same Brand */}
        {sameBrandProducts.length > 0 && (
          <div className="pt-8 pb-16 border-t border-slate-200">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl font-extrabold text-navy">More from {brand?.name}</h2>
              </div>
              <Link href={`/brands/${product.brandSlug}`} className="hidden sm:flex items-center text-[#F97316] font-bold hover:text-[#ea580c] transition-colors">
                View all from {brand?.name} <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {sameBrandProducts.map(p => (
                <ProductCard
                  key={p.id}
                  name={p.name}
                  category={p.categorySlugs[0] || 'Equipment'}
                  description={p.shortDescription}
                  imagePlaceholder={p.images[0]?.url || "/images/hero-bg.jpg"}
                  slug={p.slug}
                  brand={p.brandSlug}
                />
              ))}
            </div>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="pb-24">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl font-extrabold text-navy">Related Products</h2>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCard
                  key={p.id}
                  name={p.name}
                  category={p.categorySlugs[0] || 'Equipment'}
                  description={p.shortDescription}
                  imagePlaceholder={p.images[0]?.url || "/images/hero-bg.jpg"}
                  slug={p.slug}
                  brand={p.brandSlug}
                />
              ))}
            </div>
          </div>
        )}

      </Container>
      
      {/* Recently Viewed */}
      <RecentlyViewed currentProductId={product.id} />
    </div>
  );
}
