"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Product } from "@/types/catalog";
import { Button } from "@/components/ui/button";
import { Check, X, Search, PlusCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { getBrandBySlug } from "@/lib/data/mockBrands";
import { useSearchParams } from "next/navigation";

export function CompareClient({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const initialId = searchParams?.get('id');
  const [selectedIds, setSelectedIds] = useState<string[]>(initialId ? [initialId] : []);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSelecting, setIsSelecting] = useState(false);

  const selectedProducts = selectedIds.map(id => products.find(p => p.id === id)).filter(Boolean) as Product[];
  
  const filteredProducts = products.filter(p => 
    !selectedIds.includes(p.id) && 
    (p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const toggleProduct = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(prev => prev.filter(pId => pId !== id));
    } else if (selectedIds.length < 4) {
      setSelectedIds(prev => [...prev, id]);
      setIsSelecting(false);
      setSearchQuery("");
    }
  };

  const removeProduct = (id: string) => {
    setSelectedIds(prev => prev.filter(pId => pId !== id));
  };

  // Collect all unique spec names from selected products to build rows
  const allSpecNames = Array.from(new Set(
    selectedProducts.flatMap(p => p.specifications?.map(s => s.name) || [])
  ));

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-24">
      <Container>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-navy mb-4">Compare Products</h1>
            <p className="text-slate-600">Evaluate specifications and features side-by-side to find the right solution.</p>
          </div>
          <Link href="/products" className="hidden md:flex items-center text-slate-500 hover:text-navy font-semibold transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Catalog
          </Link>
        </div>

        {selectedProducts.length === 0 && !isSelecting ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm flex flex-col items-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h2 className="text-2xl font-bold text-navy mb-3">Select products to compare</h2>
            <p className="text-slate-500 max-w-md mx-auto mb-8">
              You can select up to 4 products to compare their technical specifications, features, and applications side-by-side.
            </p>
            <Button size="lg" className="bg-[#F97316] hover:bg-[#ea580c] text-white" onClick={() => setIsSelecting(true)}>
              Choose First Product
            </Button>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200 shadow-sm overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr>
                  <th className="w-1/5 p-4 align-top">
                    {selectedProducts.length < 4 && (
                      <div className="h-full flex flex-col justify-end">
                        {!isSelecting ? (
                          <Button variant="outline" className="w-full border-dashed border-2 border-slate-200 text-slate-500 hover:text-navy hover:border-navy hover:bg-slate-50 py-8" onClick={() => setIsSelecting(true)}>
                            <PlusCircle className="w-5 h-5 mr-2" /> Add Product
                          </Button>
                        ) : (
                          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative">
                            <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-6 w-6 rounded-full text-slate-400 hover:text-red hover:bg-red/10" onClick={() => setIsSelecting(false)}>
                              <X className="w-3 h-3" />
                            </Button>
                            <h4 className="text-sm font-bold text-navy mb-3">Search Catalog</h4>
                            <Input 
                              placeholder="Search name or SKU..." 
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="mb-3 bg-white"
                              autoFocus
                            />
                            <div className="max-h-60 overflow-y-auto pr-1 space-y-2">
                              {filteredProducts.slice(0, 10).map(p => (
                                <button key={p.id} onClick={() => toggleProduct(p.id)} className="w-full text-left p-2 rounded-lg hover:bg-white border border-transparent hover:border-slate-200 transition-all text-sm group flex items-center justify-between">
                                  <span className="truncate pr-2 font-medium text-slate-700 group-hover:text-navy">{p.name}</span>
                                  <PlusCircle className="w-4 h-4 text-slate-400 group-hover:text-[#F97316] flex-shrink-0" />
                                </button>
                              ))}
                              {filteredProducts.length === 0 && <div className="text-xs text-slate-500 text-center py-4">No results found.</div>}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </th>
                  {selectedProducts.map(p => (
                    <th key={p.id} className="w-1/5 p-4 align-top relative group">
                      <Button variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-red hover:text-white rounded-full shadow-sm z-10" onClick={() => removeProduct(p.id)}>
                        <X className="w-4 h-4" />
                      </Button>
                      <div className="bg-slate-50 rounded-2xl p-4 h-full flex flex-col items-center text-center border border-slate-100">
                        <div className="w-32 h-32 bg-white rounded-xl mb-4 flex items-center justify-center p-2 border border-slate-200 overflow-hidden mix-blend-multiply">
                          <img src={p.images[0]?.url} alt={p.name} className="max-w-full max-h-full object-contain" />
                        </div>
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{getBrandBySlug(p.brandSlug)?.name || p.brandSlug}</div>
                        <h3 className="text-lg font-extrabold text-navy mb-4 line-clamp-2">{p.name}</h3>
                        <div className="mt-auto w-full">
                          <Link href={`/products/${p.slug}`} className="block">
                            <Button className="w-full bg-navy hover:bg-navy/90 text-white font-bold text-sm">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </th>
                  ))}
                  {Array.from({ length: 4 - selectedProducts.length - (isSelecting ? 1 : 0) }).map((_, i) => (
                    <th key={i} className="w-1/5 p-4 align-top">
                      <div className="h-full border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50 flex items-center justify-center">
                        <span className="text-slate-300 text-sm font-medium">Empty Slot</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              
              {selectedProducts.length > 0 && (
                <tbody>
                  <tr className="bg-slate-50/50">
                    <td colSpan={5} className="p-4 font-bold text-navy border-t border-slate-200">General Information</td>
                  </tr>
                  <tr>
                    <td className="p-4 border-b border-slate-100 font-medium text-slate-500 bg-slate-50/30">Category</td>
                    {selectedProducts.map(p => (
                      <td key={p.id} className="p-4 border-b border-slate-100 text-slate-700 font-semibold capitalize">{p.categorySlugs[0]?.replace('-', ' ')}</td>
                    ))}
                    {Array.from({ length: 4 - selectedProducts.length }).map((_, i) => <td key={i} className="p-4 border-b border-slate-100"></td>)}
                  </tr>
                  <tr>
                    <td className="p-4 border-b border-slate-100 font-medium text-slate-500 bg-slate-50/30">SKU</td>
                    {selectedProducts.map(p => (
                      <td key={p.id} className="p-4 border-b border-slate-100 text-slate-700">{p.id}</td>
                    ))}
                    {Array.from({ length: 4 - selectedProducts.length }).map((_, i) => <td key={i} className="p-4 border-b border-slate-100"></td>)}
                  </tr>

                  {allSpecNames.length > 0 && (
                    <>
                      <tr className="bg-slate-50/50">
                        <td colSpan={5} className="p-4 font-bold text-navy border-t border-slate-200 border-b border-slate-100">Technical Specifications</td>
                      </tr>
                      {allSpecNames.map((specName, idx) => (
                        <tr key={idx}>
                          <td className="p-4 border-b border-slate-100 font-medium text-slate-500 bg-slate-50/30">{specName}</td>
                          {selectedProducts.map(p => {
                            const specValue = p.specifications?.find(s => s.name === specName)?.value;
                            return (
                              <td key={p.id} className="p-4 border-b border-slate-100 text-slate-700">
                                {specValue ? <span className="font-medium">{specValue}</span> : <span className="text-slate-300">-</span>}
                              </td>
                            );
                          })}
                          {Array.from({ length: 4 - selectedProducts.length }).map((_, i) => <td key={i} className="p-4 border-b border-slate-100"></td>)}
                        </tr>
                      ))}
                    </>
                  )}

                  <tr className="bg-slate-50/50">
                    <td colSpan={5} className="p-4 font-bold text-navy border-t border-slate-200 border-b border-slate-100">Features</td>
                  </tr>
                  <tr>
                    <td className="p-4 border-b border-slate-100 font-medium text-slate-500 bg-slate-50/30 align-top">Core Features</td>
                    {selectedProducts.map(p => (
                      <td key={p.id} className="p-4 border-b border-slate-100 text-slate-700 align-top">
                        {p.features && p.features.length > 0 ? (
                          <ul className="space-y-2">
                            {p.features.slice(0, 5).map((f, i) => (
                              <li key={i} className="flex items-start text-sm">
                                <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                <span>{f}</span>
                              </li>
                            ))}
                            {p.features.length > 5 && <li className="text-sm text-slate-400 italic">+{p.features.length - 5} more</li>}
                          </ul>
                        ) : (
                          <span className="text-slate-300">-</span>
                        )}
                      </td>
                    ))}
                    {Array.from({ length: 4 - selectedProducts.length }).map((_, i) => <td key={i} className="p-4 border-b border-slate-100"></td>)}
                  </tr>

                </tbody>
              )}
            </table>
          </div>
        )}
      </Container>
    </div>
  );
}
