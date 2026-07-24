"use client";
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Search, Home, Wrench } from 'lucide-react';
import { Magnetic } from '@/components/animations/Magnetic';

export default function NotFound() {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center bg-[#0B1120] overflow-hidden text-center py-24">
      {/* Industrial Blueprint Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      
      {/* Animated Glowing Orb */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] bg-[#F97316]/5"
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <Container className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative mb-8"
        >
          {/* Mechanical 404 Display */}
          <div className="text-[12rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-slate-100 to-slate-800 tracking-tighter leading-none select-none flex items-center justify-center">
            4
            <motion.div 
              className="mx-4 text-[#F97316]"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Wrench size={120} className="drop-shadow-[0_0_15px_rgba(249,115,22,0.3)]" />
            </motion.div>
            4
          </div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[2px] bg-[#F97316]/50 shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-4xl font-bold text-white mb-6 uppercase tracking-wider">System Override: Page Not Found</h2>
          <p className="text-slate-400 max-w-lg mx-auto mb-10 text-lg leading-relaxed">
            The schematic you are looking for has been moved, deleted, or never existed in our engineering blueprints.
          </p>
        </motion.div>

        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-6 w-full max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Magnetic strength={0.2}>
            <Link href="/" className={cn(buttonVariants({ size: "lg" }), "w-full bg-[#F97316] hover:bg-[#F97316]/90 text-white px-8 h-14 text-lg gap-2 shadow-[0_0_15px_rgba(249,115,22,0.2)] hover:shadow-[0_0_25px_rgba(249,115,22,0.4)]")}>
              <Home size={20} />
              Return to Base
            </Link>
          </Magnetic>
          <Magnetic strength={0.2}>
            <Link href="/products" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full border-slate-700 bg-slate-800/50 text-slate-200 hover:bg-slate-700 hover:text-white px-8 h-14 text-lg gap-2 backdrop-blur-sm")}>
              <Search size={20} />
              Browse Catalog
            </Link>
          </Magnetic>
        </motion.div>
      </Container>
    </div>
  );
}
