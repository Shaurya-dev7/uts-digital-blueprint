import { Section } from "@/components/layout/Section";
import { LogoMarquee } from "@/components/ui/LogoMarquee";

export function TrustedBySection() {
  const logos = [
    { name: "Tata Steel", src: "https://placehold.co/400x200/f8fafc/0f172a.png?text=Tata+Steel" },
    { name: "Indian Railways", src: "https://placehold.co/400x200/f8fafc/0f172a.png?text=Indian+Railways" },
    { name: "Rungta Mines", src: "https://placehold.co/400x200/f8fafc/0f172a.png?text=Rungta+Mines" },
    { name: "Jamna Auto", src: "https://placehold.co/400x200/f8fafc/0f172a.png?text=Jamna+Auto" },
    { name: "Tata Bluescope", src: "https://placehold.co/400x200/f8fafc/0f172a.png?text=Tata+Bluescope" },
    { name: "Larsen & Toubro", src: "https://placehold.co/400x200/f8fafc/0f172a.png?text=Larsen+%26+Toubro" },
    { name: "Jindal Steel", src: "https://placehold.co/400x200/f8fafc/0f172a.png?text=Jindal+Steel" }
  ];

  return (
    <Section className="py-8 md:py-10 lg:py-12 bg-white overflow-hidden border-none relative z-10">
      <div className="text-center mb-8">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest drop-shadow-sm">
          Trusted by Industry Leaders
        </h3>
      </div>
      <LogoMarquee logos={logos} />
    </Section>
  );
}
