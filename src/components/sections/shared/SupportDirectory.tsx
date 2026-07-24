import React from "react";
import { Wrench, PackageSearch, Users, Mail } from "lucide-react";

export function SupportDirectory() {
  const departments = [
    {
      title: "Sales & Quotations",
      description: "For product pricing, bulk orders, and commercial terms.",
      email: "sales@utsjamshedpur.com",
      icon: <PackageSearch className="w-6 h-6 text-[#F97316]" />,
    },
    {
      title: "Technical Support",
      description: "For engineering specs, product selection, and troubleshooting.",
      email: "tech@utsjamshedpur.com",
      icon: <Wrench className="w-6 h-6 text-blue-600" />,
    },
    {
      title: "Dealer Inquiry",
      description: "Partner with us to distribute industrial products in your region.",
      email: "partners@utsjamshedpur.com",
      icon: <Users className="w-6 h-6 text-emerald-600" />,
    },
    {
      title: "General Inquiry",
      description: "For careers, administration, or other general information.",
      email: "info@utsjamshedpur.com",
      icon: <Mail className="w-6 h-6 text-slate-600" />,
    }
  ];

  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Dedicated Support Departments</h2>
          <p className="text-slate-500 text-lg">Direct your inquiry to the right team for the fastest response.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col hover:shadow-md transition-shadow">
              <div className="bg-slate-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                {dept.icon}
              </div>
              <h3 className="font-bold text-slate-800 mb-2">{dept.title}</h3>
              <p className="text-sm text-slate-500 mb-6 flex-1">{dept.description}</p>
              <a href={`mailto:${dept.email}`} className="text-sm font-semibold text-slate-900 hover:text-[#F97316] transition-colors border-t border-slate-100 pt-4 mt-auto">
                {dept.email}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
