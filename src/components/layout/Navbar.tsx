"use client"

import { Home, Info, Package, Phone, Building2, Users, Briefcase } from 'lucide-react'
import { NavBar } from "@/components/ui/tubelight-navbar"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export function Navbar() {
  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'About', url: '/about', icon: Info },
    { name: 'Brands', url: '/brands', icon: Building2 },
    { name: 'Customers', url: '/customers', icon: Users },
    { name: 'Projects', url: '/projects', icon: Briefcase },
    { name: 'Products', url: '/products', icon: Package },
    { name: 'Contact', url: '/contact', icon: Phone }
  ]

  return (
    <header className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between pointer-events-none">
      {/* Left: Logo */}
      <div className="pointer-events-auto flex items-center bg-white/90 backdrop-blur-md px-6 py-2.5 rounded-full border border-gray-200 shadow-lg">
        <Link href="/" className="font-extrabold text-xl tracking-tight text-navy">
          UTS<span className="text-red">.</span>
        </Link>
      </div>

      {/* Center: Tubelight Navbar (Mobile overrides to bottom) */}
      <div className="pointer-events-auto fixed bottom-6 left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:bottom-auto">
        <NavBar items={navItems} />
      </div>

      {/* Right: CTA */}
      <div className="pointer-events-auto hidden md:flex items-center">
        <Link href="/request-quote" className={cn(buttonVariants(), "bg-red hover:bg-red/90 text-white font-bold px-6 shadow-lg rounded-full")}>
          Request Quote
        </Link>
      </div>
    </header>
  )
}
