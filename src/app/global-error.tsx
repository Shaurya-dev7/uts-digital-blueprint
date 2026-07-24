'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Fatal Global Error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="antialiased bg-[#0B1120] text-white">
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden text-center py-24">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
          
          <Container className="relative z-10 flex flex-col items-center">
            <div className="relative mb-8">
              <div className="text-[10rem] md:text-[12rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-slate-100 to-slate-800 tracking-tighter leading-none select-none flex items-center justify-center">
                5<AlertTriangle size={120} className="mx-4 text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.4)]" />0
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[2px] bg-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
            </div>

            <div>
              <h2 className="text-4xl font-bold text-white mb-6 uppercase tracking-wider">Fatal System Malfunction</h2>
              <p className="text-slate-400 max-w-lg mx-auto mb-10 text-lg leading-relaxed">
                A critical application error occurred. We apologize for the disruption.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-6 w-full max-w-md mx-auto">
              <button
                onClick={() => reset()}
                className={cn(buttonVariants({ size: "lg" }), "w-full bg-red-600 hover:bg-red-500 text-white px-8 h-14 text-lg gap-2 shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:shadow-[0_0_25px_rgba(239,68,68,0.4)]")}
              >
                <RotateCcw size={20} />
                Hard Reset
              </button>
              <Link href="/" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full border-slate-700 bg-slate-800/50 text-slate-200 hover:bg-slate-700 hover:text-white px-8 h-14 text-lg gap-2 backdrop-blur-sm")}>
                <Home size={20} />
                Return to Base
              </Link>
            </div>
          </Container>
        </div>
      </body>
    </html>
  );
}
