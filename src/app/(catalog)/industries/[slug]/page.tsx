import { notFound } from "next/navigation";
import Image from "next/image";
import { mockIndustries } from "@/data/mockContent";
import { ContentLayout } from "@/components/layout/ContentLayout";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

interface IndustryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: IndustryPageProps) {
  const resolvedParams = await params;
  const industry = mockIndustries.find(i => i.slug === resolvedParams.slug);
  
  if (!industry) return { title: "Industry Not Found" };

  return {
    title: `${industry.name} Solutions | UTS`,
    description: industry.shortDescription,
    openGraph: {
      title: `${industry.name} Solutions | UTS`,
      description: industry.shortDescription,
      images: [{ url: industry.heroImage.url, alt: industry.heroImage.alt }],
    }
  };
}

export default async function IndustryDetailPage({ params }: IndustryPageProps) {
  const resolvedParams = await params;
  const industry = mockIndustries.find(i => i.slug === resolvedParams.slug);

  if (!industry) {
    notFound();
  }

  return (
    <>
      <SchemaMarkup
        type="Article"
        data={{
          headline: industry.name,
          description: industry.shortDescription,
          image: industry.heroImage.url,
        }}
      />
      <ContentLayout
        title={industry.name}
        subtitle={industry.shortDescription}
        breadcrumbs={[
          { label: "Industries", href: "/industries" },
          { label: industry.name, href: `/industries/${industry.slug}` }
        ]}
      >
        <div className="prose prose-slate max-w-none">
          <div className="relative w-full h-[400px] rounded-2xl mb-8 overflow-hidden">
            <Image 
              src={industry.heroImage.url} 
              alt={industry.heroImage.alt} 
              fill
              className="object-cover m-0"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
            />
          </div>
          
          <h2 className="text-3xl font-bold text-navy mb-4">Overview</h2>
          <p className="text-lg text-slate-700 leading-relaxed mb-8">{industry.longDescription}</p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
              <h3 className="text-xl font-bold text-navy mb-4">Key Challenges</h3>
              <ul className="space-y-4">
                {industry.challenges.map((challenge, idx) => (
                  <li key={idx}>
                    <strong className="text-navy">{challenge.title}:</strong> <span className="text-slate-600">{challenge.description}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
              <h3 className="text-xl font-bold text-navy mb-4">Our Applications</h3>
              <ul className="space-y-4">
                {industry.applications.map((application, idx) => (
                  <li key={idx}>
                    <strong className="text-navy">{application.title}:</strong> <span className="text-slate-600">{application.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-navy mb-4">Benefits of Partnering with UTS</h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-8">
            {industry.benefits.map((benefit, idx) => (
              <li key={idx}>
                <strong>{benefit.title}:</strong> {benefit.description}
              </li>
            ))}
          </ul>
          
          {industry.faqs && industry.faqs.length > 0 && (
            <>
              <h2 className="text-3xl font-bold text-navy mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4 mb-8">
                {industry.faqs.map((faq, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-lg p-4">
                    <h4 className="font-bold text-navy mb-2">{faq.question}</h4>
                    <p className="text-slate-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </ContentLayout>
    </>
  );
}
