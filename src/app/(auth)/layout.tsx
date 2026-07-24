import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Sign In — UTS",
    template: "%s — UTS",
  },
  description: "Access your Universal Techno Services account.",
  robots: { index: false, follow: false },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.className} min-h-screen flex`}>
      {/* Left Panel — Branding */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[40%] relative overflow-hidden bg-[#0A192F] flex-col justify-between p-12">
        {/* Decorative gradient orbs */}
        <div className="absolute top-[-20%] right-[-20%] w-[500px] h-[500px] rounded-full bg-[#F97316]/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-blue-500/8 blur-[100px]" />

        {/* Logo & Brand */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-[#F97316] flex items-center justify-center">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <span className="text-white font-bold text-xl tracking-tight">
              UTS
            </span>
          </div>
          <p className="text-white/50 text-sm mt-1">
            Universal Techno Services
          </p>
        </div>

        {/* Tagline */}
        <div className="relative z-10">
          <h2 className="text-white text-3xl xl:text-4xl font-bold leading-tight mb-4">
            Engineering
            <br />
            Excellence
            <br />
            <span className="text-[#F97316]">Since 2013</span>
          </h2>
          <p className="text-white/60 text-sm leading-relaxed max-w-sm">
            India&apos;s trusted partner for industrial valves, safety equipment,
            agriculture machinery, and construction chemicals.
          </p>
        </div>

        {/* Footer */}
        <div className="relative z-10">
          <p className="text-white/30 text-xs">
            &copy; {new Date().getFullYear()} Universal Techno Services. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-gray-50 min-h-screen">
        <div className="w-full max-w-[440px]">{children}</div>
      </div>
    </div>
  );
}
