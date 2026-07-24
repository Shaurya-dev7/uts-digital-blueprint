import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SplashScreen } from "@/components/animations/SplashScreen";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { FloatingContactWidget } from "@/components/ui/FloatingContactWidget";
import { TooltipProvider } from "@/components/ui/tooltip";
import { siteConfig } from "@/config/site";
import { LenisProvider } from "@/components/providers/LenisProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  authors: [{ name: "Universal Techno Services" }],
  generator: "Next.js",
  keywords: ["Industrial Valves", "Safety Relief Valves", "Agriculture Equipment", "Construction Chemicals", "Jamshedpur", "India"],
  referrer: "origin-when-cross-origin",
  creator: "Universal Techno Services",
  publisher: "Universal Techno Services",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@utsservices",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Universal Techno Services",
    "image": "https://www.utsjamshedpur.com/logo.png",
    "@id": "https://www.utsjamshedpur.com",
    "url": "https://www.utsjamshedpur.com",
    "telephone": "+919031044769",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "P/14 Pragati Nagar, Baridih",
      "addressLocality": "Jamshedpur",
      "addressRegion": "JH",
      "postalCode": "831017",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://www.linkedin.com/company/universal-techno-services"
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className={`${inter.className} min-h-screen bg-white text-gray-900 antialiased selection:bg-[#F97316] selection:text-white flex flex-col relative`}>
        <LenisProvider>
          <NoiseOverlay />
          <SplashScreen />
          <TooltipProvider>
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <FloatingContactWidget />
          </TooltipProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
