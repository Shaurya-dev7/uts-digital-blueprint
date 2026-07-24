import React from "react";
import { FileText, Download, ShieldCheck } from "lucide-react";

export function DownloadCenter() {
  const downloads = [
    { title: "Company Profile", desc: "Overview of UTS capabilities and history.", size: "2.4 MB PDF" },
    { title: "ISO 9001:2015 Certificate", desc: "Quality management system certification.", size: "1.1 MB PDF" },
    { title: "Product Line Card", desc: "Quick reference guide to all products.", size: "3.5 MB PDF" },
    { title: "Vendor Registration", desc: "Forms and policies for new vendors.", size: "800 KB PDF" },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-1/3">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Trust & Certifications</h2>
            <p className="text-slate-600 mb-8 text-lg font-light leading-relaxed">
              Access our complete library of company documents, technical brochures, and official certifications.
            </p>
            <div className="flex items-start gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <ShieldCheck className="w-8 h-8 text-[#F97316] shrink-0" />
              <div>
                <h4 className="font-bold text-slate-800 text-sm mb-1">Verified Documents</h4>
                <p className="text-sm text-slate-500 leading-relaxed">All documents are official, up-to-date, and strictly virus-scanned for your security.</p>
              </div>
            </div>
          </div>

          <div className="lg:w-2/3 w-full grid sm:grid-cols-2 gap-6">
            {downloads.map((doc, idx) => (
              <div key={idx} className="flex items-start gap-5 p-6 rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300 group cursor-pointer bg-white">
                <div className="bg-slate-50 p-4 rounded-xl text-slate-400 border border-slate-100 group-hover:bg-[#F97316] group-hover:text-white group-hover:border-[#F97316] transition-colors duration-300">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-800 group-hover:text-[#F97316] transition-colors mb-1">{doc.title}</h4>
                  <p className="text-sm text-slate-500 mb-4 leading-relaxed">{doc.desc}</p>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                    <span className="bg-slate-100 px-2 py-1 rounded-md">{doc.size}</span>
                    <span className="flex items-center gap-1.5 group-hover:text-[#F97316] transition-colors">
                      Download <Download className="w-3.5 h-3.5" /> 
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
