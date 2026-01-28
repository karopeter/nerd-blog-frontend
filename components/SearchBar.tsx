"use client";

import { useState, useEffect, useCallback } from "react";
import { usePostStore } from "@/store/usePostStore";

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = usePostStore();
  const [localSearch, setLocalSearch] = useState(searchQuery);

  // Debounce search input without cascading setState
  useEffect(() => {
    if (localSearch === searchQuery) return; // Skip if no change
    
    const timer = setTimeout(() => {
      setSearchQuery(localSearch);
    }, 500);

    return () => clearTimeout(timer);
  }, [localSearch, setSearchQuery, searchQuery]);

  const handleClear = useCallback(() => {
    setLocalSearch("");
    setSearchQuery("");
  }, [setSearchQuery]);

  // Determine if searching based on comparison, not state
  const isSearching = localSearch !== searchQuery && localSearch.length > 0;

  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
        <div className="relative flex items-center">
          <div className="absolute left-5 pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search posts by title or content"
            className="w-full pl-14 pr-14 py-4 text-gray-900 placeholder-gray-400 bg-white border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md focus:shadow-lg"
          />
          {(localSearch || isSearching) && (
            <div className="absolute right-5 flex items-center gap-2">
              {isSearching && (
                <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full" />
              )}
              {localSearch && (
                <button
                  onClick={handleClear}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                  aria-label="Clear search"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}