import { notFound } from "next/navigation";
import Image from "next/image";
import { mockBlogs } from "@/data/mockContent";
import { ContentLayout } from "@/components/layout/ContentLayout";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const blog = mockBlogs.find(b => b.slug === resolvedParams.slug);

  if (!blog) {
    notFound();
  }

  return (
    <>
      <SchemaMarkup
        type="Article"
        data={{
          headline: blog.title,
          description: blog.excerpt,
          image: blog.heroImage.url,
          author: {
            "@type": "Person",
            name: blog.author
          },
          datePublished: blog.publishedAt,
          dateModified: blog.updatedAt,
        }}
      />
      <ContentLayout
        title={blog.title}
        subtitle={blog.excerpt}
        author={blog.author}
        publishedAt={blog.publishedAt}
        readingTime={blog.readingTime}
        breadcrumbs={[
          { label: "Blog", href: "/blog" },
          { label: blog.title, href: `/blog/${blog.slug}` }
        ]}
      >
        <div className="prose prose-slate max-w-none prose-lg">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl mb-12 overflow-hidden">
            <Image 
              src={blog.heroImage.url} 
              alt={blog.heroImage.alt} 
              fill
              className="object-cover m-0"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
            />
          </div>
          
          <div className="whitespace-pre-wrap text-slate-800 leading-relaxed font-serif">
            {blog.content}
          </div>
        </div>
      </ContentLayout>
    </>
  );
}
