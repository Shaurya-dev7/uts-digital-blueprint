import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { mockProducts } from "@/data/mockProducts";
import { DocumentCard } from "@/components/cards/DocumentCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download Center | Product Catalogs & Manuals",
  description: "Download product catalogs, technical manuals, brochures, and certificates for UTS industrial equipment.",
};

export default function DownloadsPage() {
  // Aggregate all documents from all products
  const allDocuments = mockProducts.flatMap((p) => 
    (p.downloads || []).map(doc => ({
      ...doc,
      productName: p.name,
      productSlug: p.slug,
      brandSlug: p.brandSlug
    }))
  );

  // Group by document type
  const brochures = allDocuments.filter(d => d.type === 'Brochure' || d.type === 'Catalog');
  const manuals = allDocuments.filter(d => d.type === 'Manual' || d.type === 'Datasheet');
  const certificates = allDocuments.filter(d => d.type === 'Certificate' || d.type === 'Warranty');

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-24">
      <Section className="bg-navy text-white py-16 -mt-32 mb-12" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '32px 32px' }}>
        <Container>
          <div className="max-w-3xl pt-24">
            <span className="text-[#F97316] font-bold tracking-wider uppercase text-sm mb-2 block">Resources</span>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">Download Center</h1>
            <p className="text-lg text-slate-300">
              Access technical documentation, product catalogs, and certification documents for our complete range of industrial equipment.
            </p>
          </div>
        </Container>
      </Section>

      <Container>
        <div className="space-y-16">
          
          {brochures.length > 0 && (
            <div>
              <h2 className="text-2xl font-extrabold text-navy mb-6 flex items-center gap-3">
                Product Catalogs & Brochures
                <span className="bg-slate-200 text-slate-600 text-sm py-1 px-3 rounded-full font-bold">{brochures.length}</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {brochures.map((doc, i) => (
                  <DocumentCard key={i} document={doc} />
                ))}
              </div>
            </div>
          )}

          {manuals.length > 0 && (
            <div>
              <h2 className="text-2xl font-extrabold text-navy mb-6 flex items-center gap-3">
                Technical Manuals & Datasheets
                <span className="bg-slate-200 text-slate-600 text-sm py-1 px-3 rounded-full font-bold">{manuals.length}</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {manuals.map((doc, i) => (
                  <DocumentCard key={i} document={doc} />
                ))}
              </div>
            </div>
          )}

          {certificates.length > 0 && (
            <div>
              <h2 className="text-2xl font-extrabold text-navy mb-6 flex items-center gap-3">
                Certificates & Warranties
                <span className="bg-slate-200 text-slate-600 text-sm py-1 px-3 rounded-full font-bold">{certificates.length}</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((doc, i) => (
                  <DocumentCard key={i} document={doc} />
                ))}
              </div>
            </div>
          )}

        </div>
      </Container>
    </div>
  );
}
