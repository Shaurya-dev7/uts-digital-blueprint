"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Section {
  id: string;
  label: string;
}

export function StickyProductNav({ sections }: { sections: Section[] }) {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if nav should be sticky (passed hero section approx)
      setIsSticky(window.scrollY > 400);

      // Determine active section
      const sectionElements = sections.map((s) => ({
        id: s.id,
        element: document.getElementById(s.id),
      }));

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          // If the top of the section is near the top of the viewport
          if (rect.top <= 150) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky nav + buffer
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className={cn(
      "w-full bg-white/90 backdrop-blur-md border-y border-slate-200 z-40 transition-all duration-300",
      isSticky ? "fixed top-0 left-0 right-0 shadow-md" : "relative"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex overflow-x-auto hide-scrollbar">
          <ul className="flex space-x-8">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    "whitespace-nowrap py-4 px-1 border-b-2 font-bold text-sm transition-colors",
                    activeSection === section.id
                      ? "border-[#F97316] text-navy"
                      : "border-transparent text-slate-500 hover:text-navy hover:border-slate-300"
                  )}
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
