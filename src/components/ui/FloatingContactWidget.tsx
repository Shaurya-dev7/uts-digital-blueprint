"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MessageCircle, Phone, Mail, FileText, ChevronUp } from "lucide-react";
import { useLenis } from "lenis/react";

export function FloatingContactWidget() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const lenis = useLenis();

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Desktop Sticky Sidebar (Right Side) */}
      <div className="hidden md:flex flex-col fixed right-6 top-1/2 -translate-y-1/2 z-50 gap-3">
        <Link 
          href="/request-quote" 
          className="group relative flex items-center justify-center w-12 h-12 bg-slate-900 text-white rounded-full shadow-lg hover:bg-[#F97316] transition-colors"
        >
          <FileText className="w-5 h-5" />
          <span className="absolute right-14 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Request Quote
          </span>
        </Link>
        
        <a 
          href="https://wa.me/919031044769" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-12 h-12 bg-emerald-500 text-white rounded-full shadow-lg hover:bg-emerald-600 transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="absolute right-14 bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap">
            WhatsApp
          </span>
        </a>

        <a 
          href="tel:+919031044769" 
          className="group relative flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <Phone className="w-5 h-5" />
          <span className="absolute right-14 bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Call Us
          </span>
        </a>

        <a 
          href="mailto:uts.jsr@gmail.com" 
          className="group relative flex items-center justify-center w-12 h-12 bg-slate-700 text-white rounded-full shadow-lg hover:bg-[#F97316] transition-colors"
        >
          <Mail className="w-5 h-5" />
          <span className="absolute right-14 bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Email Us
          </span>
        </a>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          className={`flex items-center justify-center w-12 h-12 bg-white text-slate-400 rounded-full shadow-lg border border-slate-200 hover:bg-slate-100 transition-all ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50 px-4 py-2 flex justify-between items-center pb-safe">
        <Link href="/request-quote" className="flex flex-col items-center gap-1 p-2 text-slate-500 hover:text-[#F97316]">
          <FileText className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Quote</span>
        </Link>
        <a href="https://wa.me/919031044769" className="flex flex-col items-center gap-1 p-2 text-slate-500 hover:text-emerald-600">
          <MessageCircle className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">WhatsApp</span>
        </a>
        <a href="tel:+919031044769" className="flex flex-col items-center gap-1 p-2 text-slate-500 hover:text-blue-600">
          <Phone className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Call</span>
        </a>
        <a href="mailto:uts.jsr@gmail.com" className="flex flex-col items-center gap-1 p-2 text-slate-500 hover:text-[#F97316]">
          <Mail className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Email</span>
        </a>
      </div>
    </>
  );
}
