"use client";
import * as React from "react";
import { Search, Package, Factory, FolderOpen, Briefcase, HelpCircle, FileText, Bookmark } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";

import { mockProducts } from "@/data/mockProducts";
import { mockBrands, getBrandBySlug } from "@/lib/data/mockBrands";
import { catalogCategories, catalogIndustries, catalogApplications } from "@/data/catalogEntities";

// Static mapping for non-product routes
const staticPages = [
  { group: "Company", items: [
    { title: "About UTS", href: "/about" },
    { title: "Contact Support", href: "/contact" },
    { title: "Request Quote", href: "/request-quote" },
  ]},
];

// Pre-compute flattened lists for deep searching
const allFaqs = mockProducts.flatMap(p => 
  (p.faqs || []).map(faq => ({ ...faq, productSlug: p.slug, productName: p.name }))
);
const allDownloads = mockProducts.flatMap(p => 
  (p.downloads || []).map(doc => ({ ...doc, productSlug: p.slug, productName: p.name }))
);

export function GlobalSearch() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    command();
    setQuery("");
  }, []);

  // Filter Logic
  const q = query.toLowerCase().trim();
  
  const filteredProducts = q ? mockProducts.filter(p => 
    p.name.toLowerCase().includes(q) || 
    p.id.toLowerCase().includes(q) || 
    p.shortDescription.toLowerCase().includes(q)
  ).slice(0, 5) : [];

  const filteredBrands = q ? mockBrands.filter(b => 
    b.name.toLowerCase().includes(q) || 
    b.country.toLowerCase().includes(q)
  ).slice(0, 3) : [];

  const filteredCategories = q ? catalogCategories.filter(c => 
    c.name.toLowerCase().includes(q)
  ).slice(0, 3) : [];

  const filteredIndustries = q ? catalogIndustries.filter(i => 
    i.name.toLowerCase().includes(q)
  ).slice(0, 3) : [];

  const filteredApplications = q ? catalogApplications.filter(a => 
    a.name.toLowerCase().includes(q)
  ).slice(0, 3) : [];

  const filteredFaqs = q ? allFaqs.filter(f => 
    f.question.toLowerCase().includes(q) || 
    f.answer.toLowerCase().includes(q)
  ).slice(0, 3) : [];

  const filteredDownloads = q ? allDownloads.filter(d => 
    d.title.toLowerCase().includes(q)
  ).slice(0, 4) : [];

  const hasResults = q.length > 0 && (
    filteredProducts.length > 0 || 
    filteredBrands.length > 0 || 
    filteredCategories.length > 0 || 
    filteredIndustries.length > 0 || 
    filteredApplications.length > 0 ||
    filteredFaqs.length > 0 ||
    filteredDownloads.length > 0
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-navy px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors w-full lg:w-64"
      >
        <Search className="w-4 h-4" />
        <span className="flex-1 text-left">Search UTS...</span>
        <kbd className="pointer-events-none hidden lg:inline-flex h-5 select-none items-center gap-1 rounded border bg-white px-1.5 font-mono text-[10px] font-medium text-slate-500 opacity-100 shadow-sm">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen} shouldFilter={false}>
        <CommandInput 
          placeholder="Search products, brands, industries, faqs..." 
          value={query}
          onValueChange={setQuery}
        />
        <CommandList className="max-h-[60vh] custom-scrollbar">
          {!hasResults && q.length > 0 && (
            <CommandEmpty>No results found for "{query}".</CommandEmpty>
          )}
          
          {!q && (
            <>
              <CommandGroup heading="Suggested">
                {mockProducts.slice(0, 3).map((product) => (
                  <CommandItem
                    key={`sug-${product.id}`}
                    onSelect={() => runCommand(() => router.push(`/products/${product.slug}`))}
                    className="cursor-pointer"
                  >
                    <Package className="w-4 h-4 mr-2 text-slate-400" />
                    {product.name}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              {staticPages.map((group) => (
                <React.Fragment key={group.group}>
                  <CommandGroup heading={group.group}>
                    {group.items.map((item) => (
                      <CommandItem
                        key={item.href}
                        onSelect={() => runCommand(() => router.push(item.href))}
                        className="cursor-pointer"
                      >
                        <Bookmark className="w-4 h-4 mr-2 text-slate-400" />
                        {item.title}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  <CommandSeparator />
                </React.Fragment>
              ))}
            </>
          )}

          {q.length > 0 && (
            <>
              {filteredProducts.length > 0 && (
                <CommandGroup heading="Products">
                  {filteredProducts.map((product) => (
                    <CommandItem
                      key={product.id}
                      onSelect={() => runCommand(() => router.push(`/products/${product.slug}`))}
                      className="cursor-pointer py-3"
                    >
                      <Package className="w-5 h-5 mr-3 text-[#F97316] flex-shrink-0" />
                      <div className="flex flex-col">
                        <span className="font-bold text-navy">{product.name}</span>
                        <span className="text-xs text-slate-500">
                          {getBrandBySlug(product.brandSlug)?.name} • SKU: {product.id}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {filteredBrands.length > 0 && (
                <CommandGroup heading="Brands">
                  {filteredBrands.map((brand) => (
                    <CommandItem
                      key={brand.id}
                      onSelect={() => runCommand(() => router.push(`/brands/${brand.slug}`))}
                      className="cursor-pointer"
                    >
                      <Factory className="w-4 h-4 mr-2 text-blue-500" />
                      <span className="font-semibold text-navy">{brand.name}</span>
                      <span className="ml-2 text-xs text-slate-400">Brand</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {filteredCategories.length > 0 && (
                <CommandGroup heading="Categories">
                  {filteredCategories.map((cat) => (
                    <CommandItem
                      key={cat.id}
                      onSelect={() => runCommand(() => router.push(`/products?category=${cat.slug}`))}
                      className="cursor-pointer"
                    >
                      <FolderOpen className="w-4 h-4 mr-2 text-amber-500" />
                      <span className="font-semibold text-navy">{cat.name}</span>
                      <span className="ml-2 text-xs text-slate-400">Category</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {filteredIndustries.length > 0 && (
                <CommandGroup heading="Industries">
                  {filteredIndustries.map((ind) => (
                    <CommandItem
                      key={ind.id}
                      onSelect={() => runCommand(() => router.push(`/products?industry=${ind.slug}`))}
                      className="cursor-pointer"
                    >
                      <Briefcase className="w-4 h-4 mr-2 text-indigo-500" />
                      <span className="font-semibold text-navy">{ind.name}</span>
                      <span className="ml-2 text-xs text-slate-400">Industry</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {filteredApplications.length > 0 && (
                <CommandGroup heading="Applications">
                  {filteredApplications.map((app) => (
                    <CommandItem
                      key={app.id}
                      onSelect={() => runCommand(() => router.push(`/products?application=${app.slug}`))}
                      className="cursor-pointer"
                    >
                      <Briefcase className="w-4 h-4 mr-2 text-teal-500" />
                      <span className="font-semibold text-navy">{app.name}</span>
                      <span className="ml-2 text-xs text-slate-400">Application</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {filteredDownloads.length > 0 && (
                <CommandGroup heading="Downloads">
                  {filteredDownloads.map((doc, i) => (
                    <CommandItem
                      key={`doc-${i}`}
                      onSelect={() => runCommand(() => window.open(doc.url, "_blank"))}
                      className="cursor-pointer"
                    >
                      <FileText className="w-4 h-4 mr-2 text-red-500" />
                      <div className="flex flex-col">
                        <span className="font-semibold text-navy">{doc.title}</span>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider">{doc.type} • {doc.productName}</span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {filteredFaqs.length > 0 && (
                <CommandGroup heading="Frequently Asked Questions">
                  {filteredFaqs.map((faq, i) => (
                    <CommandItem
                      key={`faq-${i}`}
                      onSelect={() => runCommand(() => router.push(`/products/${faq.productSlug}#faq`))}
                      className="cursor-pointer"
                    >
                      <HelpCircle className="w-4 h-4 mr-2 text-purple-500 flex-shrink-0" />
                      <div className="flex flex-col line-clamp-1">
                        <span className="font-semibold text-navy truncate">{faq.question}</span>
                        <span className="text-xs text-slate-400 truncate">From: {faq.productName}</span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
