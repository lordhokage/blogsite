'use client';

import { useRef, useEffect } from 'react';
import { Search, X, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSearch } from '@/hooks/useSearch';
import { highlightText } from '@/utils/highlightText';

export default function SearchModal({ onClose }) {
  const modalRef = useRef(null);
  const searchInputRef = useRef(null);
  const router = useRouter();

  const { searchQuery, setSearchQuery, searchResults, isLoading, error } =
    useSearch();

  // Focus the search input when the modal opens
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // Handle click outside modal
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
      }
    }

    function handleEscKey(event) {
      if (event.key === 'Escape') {
        handleClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  const handleClose = () => {
    onClose();
  };

  const handleResultClick = (slug) => {
    router.push(slug);
    handleClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-16 z-50">
      <div
        ref={modalRef}
        className="bg-white w-full max-w-2xl rounded-lg shadow-lg overflow-hidden"
      >
        <div className="p-4 border-b">
          <div className="relative w-full flex items-center">
            {/* Search input with icons inside */}
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                <Search className="h-5 w-5" />
              </span>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search articles..."
                className="w-full outline-none text-gray-800 p-3 pl-10 pr-10 rounded-md bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  aria-label="Clear search"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Close button */}
            <button
              onClick={handleClose}
              className="ml-3 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none"
              aria-label="Close search"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="max-h-96 min-h-30 overflow-y-auto">
          {isLoading && (
            <div className="p-4 text-center text-gray-500">Searching...</div>
          )}

          {error && <div className="p-4 text-center text-red-500">{error}</div>}

          {!isLoading &&
            !error &&
            searchQuery &&
            searchResults.length === 0 && (
              <div className="p-4 text-center text-gray-500">
                No results found for "{searchQuery}"
              </div>
            )}

          {searchResults.map((result, index) => {
            // Highlight matching text in title
            const titleHighlight = highlightText(
              result.title,
              searchQuery,
              100
            );

            // Highlight matching text in description or content
            let contentHighlight;
            if (result.description) {
              contentHighlight = highlightText(
                result.description,
                searchQuery,
                160
              );
            } else if (result.plainContent) {
              contentHighlight = highlightText(
                result.plainContent,
                searchQuery,
                160
              );
            }

            return (
              <div
                key={index}
                className="px-4 py-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                onClick={() => handleResultClick(result.slug)}
              >
                <div className="text-blue-600 text-xs font-medium mb-1 capitalize">
                  {result.category}
                </div>
                <h3 className="font-medium text-gray-900 mb-1">
                  <span
                    dangerouslySetInnerHTML={{ __html: titleHighlight.html }}
                  />
                </h3>
                {contentHighlight && (
                  <p className="text-sm text-gray-600 leading-snug">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: contentHighlight.html,
                      }}
                    />
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
