import { Metadata } from "next";
import { BrandHero } from "@/components/sections/brands/BrandHero";
import { BrandDirectory } from "@/components/sections/brands/BrandDirectory";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Trusted Industrial Brands",
  description: "Universal Techno Services partners with the world's leading manufacturers to supply premium industrial components.",
  alternates: {
    canonical: `${siteConfig.url}/brands`,
  }
};

export default function BrandsPage() {
  return (
    <>
      <BrandHero />
      <BrandDirectory />
    </>
  );
}
