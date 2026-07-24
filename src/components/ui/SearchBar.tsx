'use client';

import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-2xl mx-auto">
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-5 h-5 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products, industries, knowledge base..."
          className="w-full pl-12 pr-12 py-4 bg-white border-2 border-slate-200 rounded-full text-lg focus:outline-none focus:border-[#F97316] transition-colors shadow-sm"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-4 p-1 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      <div className="absolute top-full left-0 right-0 mt-2 text-center text-sm text-slate-500">
        Try: <button type="button" onClick={() => setQuery('valves')} className="text-[#F97316] hover:underline">valves</button>, <button type="button" onClick={() => setQuery('steel')} className="text-[#F97316] hover:underline">steel</button>, <button type="button" onClick={() => setQuery('pumps')} className="text-[#F97316] hover:underline">pumps</button>
      </div>
    </form>
  );
}
