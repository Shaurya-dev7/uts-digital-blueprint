'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';
import { Magnetic } from '@/components/animations/Magnetic';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service like Sentry
    console.error('System Error:', error);
  }, [error]);

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center bg-[#0B1120] overflow-hidden text-center py-24">
      {/* Industrial Blueprint Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      
      {/* Animated Glowing Orb - Error Red */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] bg-red-500/10"
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <Container className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="relative mb-8"
        >
          <div className="text-[10rem] md:text-[12rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-slate-100 to-slate-800 tracking-tighter leading-none select-none flex items-center justify-center">
            5
            <motion.div 
              className="mx-4 text-red-500"
              animate={{ rotate: [-10, 10, -10] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <AlertTriangle size={120} className="drop-shadow-[0_0_15px_rgba(239,68,68,0.4)]" />
            </motion.div>
            0
          </div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[2px] bg-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-4xl font-bold text-white mb-6 uppercase tracking-wider">System Malfunction</h2>
          <p className="text-slate-400 max-w-lg mx-auto mb-10 text-lg leading-relaxed">
            An unexpected engineering fault occurred. Our technicians have been notified. Please attempt to reset the system.
          </p>
        </motion.div>

        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-6 w-full max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Magnetic strength={0.2}>
            <button
              onClick={() => reset()}
              className={cn(buttonVariants({ size: "lg" }), "w-full bg-red-600 hover:bg-red-500 text-white px-8 h-14 text-lg gap-2 shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:shadow-[0_0_25px_rgba(239,68,68,0.4)]")}
            >
              <RotateCcw size={20} />
              Reset System
            </button>
          </Magnetic>
          <Magnetic strength={0.2}>
            <Link href="/" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full border-slate-700 bg-slate-800/50 text-slate-200 hover:bg-slate-700 hover:text-white px-8 h-14 text-lg gap-2 backdrop-blur-sm")}>
              <Home size={20} />
              Return to Base
            </Link>
          </Magnetic>
        </motion.div>
      </Container>
    </div>
  );
}
