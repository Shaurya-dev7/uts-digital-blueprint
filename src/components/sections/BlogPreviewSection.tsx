import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function BlogPreviewSection() {
  const articles = [
    { title: "Essential Guide to Industrial Safety Valves", date: "Oct 12, 2024", category: "Industrial Safety", img: "/images/product-valve.jpg" },
    { title: "Choosing the Right Construction Chemicals", date: "Sep 28, 2024", category: "Construction", img: "/images/product-epoxy.png" },
    { title: "Maintenance Tips for Rotary Tillers", date: "Sep 15, 2024", category: "Agriculture", img: "/images/product-tiller.png" }
  ];

  return (
    <Section className="bg-white">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="text-red font-bold tracking-wider uppercase text-sm mb-2 block">Insights</span>
            <AnimatedHeading as="h2" className="text-3xl md:text-5xl font-extrabold text-navy">
              Latest Articles
            </AnimatedHeading>
          </div>
          <Link href="/blog" className="text-red font-semibold hover:underline inline-flex items-center group">
            View All Articles <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <Card key={i} className="group cursor-pointer hover:shadow-lg transition-shadow border-gray-100 overflow-hidden">
              <div className="aspect-video bg-gray-100 overflow-hidden relative">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" 
                  style={{ backgroundImage: `url(${article.img})` }} 
                />
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold text-red uppercase tracking-wider">{article.category}</span>
                  <span className="text-xs font-medium text-gray-400">{article.date}</span>
                </div>
                <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-red transition-colors">{article.title}</h3>
                <p className="text-gray-500 text-sm">Learn about the best practices and latest innovations in our comprehensive technical guide.</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
