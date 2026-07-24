import React from "react";
import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";

export function CompanyInformation() {
  return (
    <div className="bg-white p-8 h-full flex flex-col justify-between">
      <div>
        <div className="mb-6 pb-6 border-b border-slate-100">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Universal Techno Services</h3>
          <p className="text-slate-600 font-medium mb-4">Industrial Engineering Solutions</p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span className="bg-slate-100 px-2 py-1 rounded text-slate-700 font-medium">Est. 2013</span>
            <span>•</span>
            <span>Contact: Rajesh Kumar Rai</span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="bg-orange-50 p-3 rounded-lg h-fit text-[#F97316]">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-1">Headquarters</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                P/14 Pragati Nagar, Baridih<br />
                Jamshedpur, Jharkhand<br />
                831017, India
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-orange-50 p-3 rounded-lg h-fit text-[#F97316]">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-1">Contact</h4>
              <p className="text-slate-600 text-sm">+91 90310 44769</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-orange-50 p-3 rounded-lg h-fit text-[#F97316]">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-1">Email</h4>
              <p className="text-slate-600 text-sm">uts.jsr@gmail.com</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-orange-50 p-3 rounded-lg h-fit text-[#F97316]">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-1">Business Hours</h4>
              <p className="text-slate-600 text-sm">Mon - Sat: 9:00 AM - 7:00 PM</p>
              <p className="text-slate-500 text-xs mt-1">24/7 Emergency Support for enterprise clients.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col gap-3">
        <a 
          href="https://maps.google.com/?q=Universal+Techno+Services,Jamshedpur" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white px-4 py-3 rounded-xl font-semibold transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:ring-offset-2"
        >
          <Navigation className="w-4 h-4" />
          Get Directions
        </a>
        <div className="grid grid-cols-2 gap-3">
          <a 
            href="tel:+919031044769"
            className="inline-flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-700 px-4 py-3 rounded-xl font-semibold transition-colors border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-2"
          >
            <Phone className="w-4 h-4 text-[#F97316]" />
            Call Us
          </a>
          <a 
            href="mailto:uts.jsr@gmail.com"
            className="inline-flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-700 px-4 py-3 rounded-xl font-semibold transition-colors border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-2"
          >
            <Mail className="w-4 h-4 text-[#F97316]" />
            Email
          </a>
        </div>
      </div>
    </div>
  );
}
