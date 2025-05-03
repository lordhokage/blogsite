export const getBookmarks = () => {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem('bookmarks')) || [];
};

export const saveBookmark = (post) => {
  const bookmarks = getBookmarks();
  const exists = bookmarks.some((item) => item.slug === post.slug);
  if (!exists) {
    bookmarks.push(post);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
};

export const removeBookmark = (slug) => {
  const bookmarks = getBookmarks().filter((item) => item.slug !== slug);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
};

export const isBookmarked = (slug) => {
  const bookmarks = getBookmarks();
  return bookmarks.some((item) => item.slug === slug);
};
