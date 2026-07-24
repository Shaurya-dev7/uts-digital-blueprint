import React from "react";

export type SchemaType = 
  | "Article" 
  | "BlogPosting" 
  | "FAQPage" 
  | "LocalBusiness" 
  | "Organization" 
  | "Product" 
  | "BreadcrumbList" 
  | "HowTo"
  | "CollectionPage";

interface SchemaMarkupProps {
  type: SchemaType;
  data: Record<string, any>;
}

/**
 * A highly reusable JSON-LD schema injector for Next.js App Router.
 * Ensures the script is injected correctly and validates against standard schema types.
 */
export function SchemaMarkup({ type, data }: SchemaMarkupProps) {
  // Ensure the context is set for Schema.org
  const schemaData = {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
