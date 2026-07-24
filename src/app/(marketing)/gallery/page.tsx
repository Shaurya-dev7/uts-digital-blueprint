import { Section } from "@/components/layout/Section";
import dynamic from "next/dynamic";
import type { MediaItemType } from "@/components/ui/interactive-bento-gallery";

const InteractiveBentoGallery = dynamic(() => import("@/components/ui/interactive-bento-gallery"), {
  ssr: true, // We want it to SSR the static HTML, but defer the heavy hydration
});
const galleryItems: MediaItemType[] = [
  { 
    id: 1, 
    type: "image",
    title: "Jindal Steel", 
    desc: "Jindal Steel & Power Corporate Office", 
    url: "/images/company logos/Jindal Steel office.jpg",
    span: "md:col-span-2 md:row-span-2 col-span-1 row-span-1"
  },
  { 
    id: 2, 
    type: "image",
    title: "Tata BlueScope", 
    desc: "Tata BlueScope Steel Manufacturing Facility", 
    url: "/images/company logos/tata BlueScope Steel office.jpg",
    span: "md:col-span-1 md:row-span-1 col-span-1 row-span-1"
  },
  { 
    id: 3, 
    type: "image",
    title: "Tata Steel Wire Division", 
    desc: "Tata Steel Wire Division Processing Center", 
    url: "/images/company logos/Tata Steel Wire Division office.jpg",
    span: "md:col-span-1 md:row-span-2 col-span-1 row-span-1"
  },
  { 
    id: 4, 
    type: "image",
    title: "Tata Steel Tinplate", 
    desc: "Tata Steel Tinplate Manufacturing Unit", 
    url: "/images/company logos/Tata Steel Tinplate office.jpg",
    span: "md:col-span-2 md:row-span-1 col-span-1 row-span-1"
  },
  { 
    id: 5, 
    type: "image",
    title: "Tata Steel Downstream Products", 
    desc: "Downstream Products Facility", 
    url: "/images/company logos/Tata Steel Downstream Products office.jpg",
    span: "md:col-span-1 md:row-span-2 col-span-1 row-span-1"
  },
  { 
    id: 6, 
    type: "image",
    title: "Rungta Mines", 
    desc: "Rungta Mines Excavation Site", 
    url: "/images/company logos/Rungta Mines company.jpg",
    span: "md:col-span-1 md:row-span-1 col-span-1 row-span-1"
  },
  { 
    id: 7, 
    type: "image",
    title: "Nippon Industries", 
    desc: "Nippon Industries Plant", 
    url: "/images/company logos/Nippon Industries office.jpg",
    span: "md:col-span-2 md:row-span-2 col-span-1 row-span-1"
  },
  { 
    id: 8, 
    type: "image",
    title: "Larsen & Toubro", 
    desc: "L&T Engineering Operations", 
    url: "/images/company logos/larsen office.jpg",
    span: "md:col-span-1 md:row-span-2 col-span-1 row-span-1"
  },
  { 
    id: 9, 
    type: "image",
    title: "Tata Steel Plant", 
    desc: "Tata Steel Primary Facility", 
    url: "/images/company logos/bg tata steel.jpg",
    span: "md:col-span-2 md:row-span-1 col-span-1 row-span-1"
  },
  { 
    id: 10, 
    type: "image",
    title: "Corporate Operations", 
    desc: "Headquarters & Management", 
    url: "/images/company logos/company oic.jpg",
    span: "md:col-span-1 md:row-span-1 col-span-1 row-span-1"
  },
  { 
    id: 11, 
    type: "image",
    title: "Industrial Manufacturing", 
    desc: "Heavy Machinery Facility", 
    url: "/images/company logos/company pic.jpg",
    span: "md:col-span-1 md:row-span-2 col-span-1 row-span-1"
  },
  { 
    id: 12, 
    type: "image",
    title: "Mining Infrastructure", 
    desc: "Large Scale Mining Operations", 
    url: "/images/gallery-2.jpg",
    span: "md:col-span-2 md:row-span-2 col-span-1 row-span-1"
  },
  { 
    id: 13, 
    type: "image",
    title: "Railway Logistics", 
    desc: "Heavy Railway Transport", 
    url: "/images/gallery-3.jpg",
    span: "md:col-span-1 md:row-span-1 col-span-1 row-span-1"
  },
  { 
    id: 14, 
    type: "image",
    title: "Infrastructure", 
    desc: "Industrial Site Infrastructure", 
    url: "/images/gallery-4.jpg",
    span: "md:col-span-2 md:row-span-1 col-span-1 row-span-1"
  },
  { 
    id: 15, 
    type: "image",
    title: "Manufacturing Plant", 
    desc: "High Volume Manufacturing", 
    url: "/images/gallery-5.jpg",
    span: "md:col-span-1 md:row-span-1 col-span-1 row-span-1"
  },
  { 
    id: 16, 
    type: "image",
    title: "Valve Installation", 
    desc: "On-site High Pressure Valve", 
    url: "/images/company logos/valve fitted.jpg",
    span: "md:col-span-2 md:row-span-2 col-span-1 row-span-1"
  },
  { 
    id: 17, 
    type: "image",
    title: "Industrial Engineering", 
    desc: "Engineer fitting high-pressure metal valve", 
    url: "/images/generated/worker_fitting_valve.png",
    span: "md:col-span-2 md:row-span-2 col-span-1 row-span-1"
  },
  { 
    id: 18, 
    type: "image",
    title: "Chemical Handling", 
    desc: "Workers handling industrial chemicals", 
    url: "/images/generated/handling_chemicals.png",
    span: "md:col-span-1 md:row-span-2 col-span-1 row-span-1"
  },
  { 
    id: 19, 
    type: "image",
    title: "Heavy Infrastructure", 
    desc: "Building industrial steel infrastructure", 
    url: "/images/generated/building_infrastructure.png",
    span: "md:col-span-2 md:row-span-2 col-span-1 row-span-1"
  }
];

export default function GalleryPage() {
  return (
    <Section className="pt-24 pb-0 bg-slate-50 min-h-screen">
      <InteractiveBentoGallery 
        mediaItems={galleryItems}
        title="Facility Gallery"
        description="Explore our state-of-the-art facilities, partner offices, and on-site industrial installations across our network. Drag items to reorder them or click to view details."
      />
    </Section>
  );
}
