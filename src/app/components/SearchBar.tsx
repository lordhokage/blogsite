import { useState, useEffect, useRef } from 'react';
import { Search, X, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SearchModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchInputRef = useRef(null);
  const modalRef = useRef(null);
  const router = useRouter();

  // Focus on input when modal opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 100);
    }
  }, [isOpen]);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim().length > 2) {
        performSearch();
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const performSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(searchQuery)}`
      );
      if (!response.ok) {
        throw new Error('Search failed');
      }
      const results = await response.json();
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResultClick = (slug, category) => {
    onClose();
    router.push(`/${category}/${slug}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-16 z-50">
      <div
        ref={modalRef}
        className="bg-white w-full max-w-2xl rounded-lg shadow-lg overflow-hidden"
      >
        <div className="p-4 border-b">
          <div className="relative w-full flex items-center">
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

            <button
              onClick={onClose}
              className="ml-3 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none"
              aria-label="Close search"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : searchQuery.trim().length > 2 && searchResults.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No results found for "{searchQuery}"
            </div>
          ) : searchResults.length > 0 ? (
            <div>
              {searchResults.map((result, index) => (
                <div
                  key={index}
                  className="px-4 py-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                  onClick={() =>
                    handleResultClick(result.slug, result.category)
                  }
                >
                  <div className="text-blue-600 text-xs font-medium mb-1">
                    {result.category}
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">
                    {result.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-snug line-clamp-2">
                    {result.description}
                  </p>
                </div>
              ))}
            </div>
          ) : searchQuery.trim().length > 0 &&
            searchQuery.trim().length <= 2 ? (
            <div className="p-8 text-center text-gray-500">
              Please enter at least 3 characters
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
