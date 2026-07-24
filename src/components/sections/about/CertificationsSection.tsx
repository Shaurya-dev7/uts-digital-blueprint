import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { FileBadge, Award, Building, FileCheck } from "lucide-react";

const certs = [
  {
    icon: Building,
    title: "GST Registration",
    desc: "20AKVPR6014L1ZT"
  },
  {
    icon: FileBadge,
    title: "Business Registration",
    desc: "Authorized Proprietorship"
  },
  {
    icon: Award,
    title: "Authorized Dealer",
    desc: "Certified OEM Partner"
  },
  {
    icon: FileCheck,
    title: "ISO 9001:2015",
    desc: "Certification in progress"
  }
];

export function CertificationsSection() {
  return (
    <Section className="bg-gray-50 py-24 border-t border-gray-100">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-red font-bold tracking-wider uppercase text-sm mb-2 block">Compliance & Trust</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-navy mb-6">
            Certifications & Registrations
          </h2>
          <p className="text-lg text-gray-600">
            We operate with complete transparency, strictly adhering to national business regulations and international quality standards.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certs.map((cert, i) => {
            const Icon = cert.icon;
            return (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-navy" />
                </div>
                <h3 className="font-bold text-navy text-lg mb-2">{cert.title}</h3>
                <p className="text-gray-500 font-medium text-sm">{cert.desc}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
