import { useState, useEffect } from 'react';

export function useSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Debounce function to prevent too many requests
    const debounceTimeout = setTimeout(async () => {
      if (searchQuery.trim().length > 1) {
        setIsLoading(true);
        setError(null);

        try {
          const response = await fetch(
            `/api/search?q=${encodeURIComponent(searchQuery)}`
          );

          if (!response.ok) {
            throw new Error('Search failed');
          }

          const data = await response.json();
          setSearchResults(data.results);
          // The query is included in the response for highlighting later
        } catch (err) {
          console.error('Search error:', err);
          setError('Failed to perform search');
          setSearchResults([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 300); // Wait 300ms after user stops typing

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isLoading,
    error,
  };
}
