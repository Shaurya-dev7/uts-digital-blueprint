import { HeroSection } from "@/components/sections/HeroSection";
import { TrustedBySection } from "@/components/sections/TrustedBySection";
import { AboutSection } from "@/components/sections/AboutSection";
import { CategorySection } from "@/components/sections/CategorySection";
import { IndustrySection } from "@/components/sections/IndustrySection";
import { FeatureSection } from "@/components/sections/FeatureSection";
import { FeaturedProductsSection } from "@/components/sections/FeaturedProductsSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { StatisticsSection } from "@/components/sections/StatisticsSection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { BlogPreviewSection } from "@/components/sections/BlogPreviewSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ContactCTASection } from "@/components/sections/ContactCTASection";

import { Reveal } from "@/components/animations/Reveal";

export default function Home() {
  return (
    <>
      <HeroSection />
      
      <Reveal width="100%" overflow="visible">
        <TrustedBySection />
      </Reveal>
      
      <Reveal width="100%" overflow="visible">
        <AboutSection />
      </Reveal>

      <Reveal width="100%" overflow="visible" direction="left">
        <CategorySection />
      </Reveal>

      <Reveal width="100%" overflow="visible" direction="right">
        <IndustrySection />
      </Reveal>

      <Reveal width="100%" overflow="visible">
        <FeatureSection />
      </Reveal>



      <Reveal width="100%" overflow="visible">
        <FeaturedProductsSection />
      </Reveal>

      <Reveal width="100%" overflow="visible" direction="none">
        <TimelineSection />
      </Reveal>

      <Reveal width="100%" overflow="visible">
        <StatisticsSection />
      </Reveal>

      <Reveal width="100%" overflow="visible">
        <TestimonialSection />
      </Reveal>

      <Reveal width="100%" overflow="visible">
        <GallerySection />
      </Reveal>

      <Reveal width="100%" overflow="visible">
        <BlogPreviewSection />
      </Reveal>

      <Reveal width="100%" overflow="visible">
        <FAQSection />
      </Reveal>

      <Reveal width="100%" overflow="visible" direction="none">
        <ContactCTASection />
      </Reveal>
    </>
  );
}
