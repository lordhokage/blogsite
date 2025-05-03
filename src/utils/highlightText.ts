export function highlightText(text, query, maxLength = 160) {
  if (!text || !query || query.trim() === '') {
    return {
      html: text ? truncateText(text, maxLength) : '',
      text: text ? truncateText(text, maxLength) : '',
    };
  }

  // Clean and prepare the query for regex
  const cleanQuery = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Create a regex pattern that matches whole words and is case insensitive
  const queryWords = cleanQuery.split(/\s+/).filter((word) => word.length > 1);

  if (queryWords.length === 0) {
    return {
      html: truncateText(text, maxLength),
      text: truncateText(text, maxLength),
    };
  }

  const pattern = new RegExp(`(${queryWords.join('|')})`, 'gi');

  // Find the first match to center the excerpt around
  const firstMatch = pattern.exec(text);

  let excerpt = '';
  let start = 0;

  if (firstMatch) {
    // Calculate start position to center the match
    const matchPosition = firstMatch.index;
    start = Math.max(0, matchPosition - Math.floor(maxLength / 2));

    // Get excerpt
    excerpt = text.substring(start, start + maxLength);

    // Add ellipsis if we're not at the beginning or end
    if (start > 0) {
      excerpt = '...' + excerpt;
    }
    if (start + maxLength < text.length) {
      excerpt = excerpt + '...';
    }
  } else {
    // If no match found, take the beginning of the text
    excerpt = truncateText(text, maxLength);
  }

  // Highlight all matches in the excerpt
  const highlightedHtml = excerpt.replace(
    pattern,
    '<mark class="bg-yellow-200 font-normal">$1</mark>'
  );

  return {
    html: highlightedHtml,
    text: excerpt,
  };
}

/**
 * Truncates text to a specified max length and adds ellipsis if needed
 */
function truncateText(text, maxLength) {
  if (!text || text.length <= maxLength) {
    return text || '';
  }
  return text.substring(0, maxLength) + '...';
}
