'use client';
import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Search, Sun, Moon, Rss, Bookmark } from 'lucide-react';
import CategoryDrop from './CategoryDrop';
import { useDarkMode } from '@/hooks/useDarkMode';
import SearchModal from './SearchModal';

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [activeDropdown, setActiveDropdown] = useState<string | null>();
  const dropdownRef = useRef(null);
  const pathname = usePathname();
  const openSearch = () => {
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  const { isDark, toggle } = useDarkMode();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navLinks = [
    { name: 'Categories', href: '/categories' },
    { name: 'Courses', href: '/courses' },
    { name: 'Goodies', href: '/goodies' },
    { name: 'About', href: '/about-me' },
  ];

  return (
    <div className="w-full">
      <header className="max-w-5xl mx-auto px-6 lg:px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-purple-700">
          <Link href="/">BlogSite</Link>
        </div>
        <nav className="hidden gap-10 text-md font-medium md:flex md:items-center lg:text-lg lg:gap-15">
          {navLinks.map((link) =>
            link.name === 'Categories' ? (
              <div key={link.href} className="relative" ref={dropdownRef}>
                <button
                  onClick={() =>
                    setActiveDropdown(
                      activeDropdown === 'categories' ? null : 'categories'
                    )
                  }
                  className={`transition hover:text-purple-500 ${
                    pathname === link.href ? 'text-purple-500' : ''
                  }`}
                >
                  {link.name}
                </button>

                <CategoryDrop isOpen={activeDropdown === 'categories'} />
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`transition hover:text-purple-500 ${
                  pathname === link.href ? 'text-purple-500' : ''
                }`}
              >
                {link.name}
              </Link>
            )
          )}
        </nav>
        <div className="hidden sm:flex items-center space-x-3">
          <button
            className="p-2 hover:opacity-70 transition-opacity"
            aria-label="Search"
            onClick={openSearch}
          >
            <Search size={20} />
          </button>
          <button
            className="p-2 hover:opacity-70 transition-opacity"
            aria-label="bookmark"
          >
            <Link href={'/bookmark'}>
              <Bookmark
                size={20}
                className={`${
                  pathname === '/bookmark' ? 'text-purple-500' : ''
                }`}
              />
            </Link>
          </button>
          <button
            className="p-2 hover:opacity-70 transition-opacity"
            aria-label="Theme"
            onClick={toggle}
          >
            {isDark ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <Link
            className="p-2 hover:opacity-70 transition-opacity"
            href={`${process.env.NEXT_PUBLIC_BASE_URL}/rss.xml`}
            aria-label="RSS"
          >
            <Rss size={20} />
          </Link>
        </div>
        {isSearchOpen && <SearchModal onClose={closeSearch} />}
      </header>
    </div>
  );
};

export default Header;
