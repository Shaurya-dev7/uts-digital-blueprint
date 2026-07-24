import React from "react";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";

export function InteractiveContactCards() {
  const cards = [
    {
      title: "Call Us",
      description: "Speak directly with our sales team.",
      value: "+91 90310 44769",
      icon: <Phone className="w-6 h-6" />,
      href: "tel:+919031044769",
      color: "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white border-blue-200"
    },
    {
      title: "Email Us",
      description: "Send us your technical inquiries.",
      value: "uts.jsr@gmail.com",
      icon: <Mail className="w-6 h-6" />,
      href: "mailto:uts.jsr@gmail.com",
      color: "bg-[#F97316]/10 text-[#F97316] group-hover:bg-[#F97316] group-hover:text-white border-[#F97316]/20"
    },
    {
      title: "WhatsApp",
      description: "Fast responses for urgent queries.",
      value: "Message on WhatsApp",
      icon: <MessageCircle className="w-6 h-6" />,
      href: "https://wa.me/919031044769",
      color: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white border-emerald-200"
    },
    {
      title: "Visit Office",
      description: "Pragati Nagar, Baridih, Jamshedpur",
      value: "Get Directions",
      icon: <MapPin className="w-6 h-6" />,
      href: "https://maps.google.com/?q=Universal+Techno+Services,Jamshedpur",
      target: "_blank",
      color: "bg-slate-100 text-slate-700 group-hover:bg-slate-800 group-hover:text-white border-slate-200"
    }
  ];

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {cards.map((card, idx) => (
        <a 
          key={idx}
          href={card.href}
          target={card.target}
          rel={card.target === "_blank" ? "noopener noreferrer" : undefined}
          className="group p-6 bg-white rounded-2xl border border-slate-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col items-start gap-4 cursor-pointer"
        >
          <div className={`p-4 rounded-xl border transition-colors duration-300 ${card.color}`}>
            {card.icon}
          </div>
          <div>
            <h4 className="font-bold text-slate-800 mb-1 group-hover:text-[#F97316] transition-colors">{card.title}</h4>
            <p className="text-sm text-slate-500 mb-2">{card.description}</p>
            <p className="font-semibold text-slate-900">{card.value}</p>
          </div>
        </a>
      ))}
    </div>
  );
}
