import { CompareClient } from "./CompareClient";
import { mockProducts } from "@/data/mockProducts";
import { Metadata } from "next";

import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Compare Products | UTS",
  description: "Compare industrial equipment, pumps, and construction chemicals side-by-side to find the perfect fit for your application.",
};

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 pb-24 flex justify-center"><div className="animate-pulse w-12 h-12 bg-slate-200 rounded-full" /></div>}>
      <CompareClient products={mockProducts} />
    </Suspense>
  );
}
