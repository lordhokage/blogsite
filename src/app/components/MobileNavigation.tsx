import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface MobileNavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({
  href,
  children,
  onClick,
}) => (
  <a
    href={href}
    className="block py-3 text-center text-gray-800 hover:text-indigo-600 transition-colors duration-200"
    onClick={onClick}
  >
    {children}
  </a>
);

const MobileNavigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="p-2 text-gray-800 hover:text-indigo-600 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg z-50">
          <div className="px-4 py-2">
            <MobileNavLink href="/categories" onClick={closeMenu}>
              Categories
            </MobileNavLink>
            <MobileNavLink href="/courses" onClick={closeMenu}>
              Courses
            </MobileNavLink>
            <MobileNavLink href="/goodies" onClick={closeMenu}>
              Goodies
            </MobileNavLink>
            <MobileNavLink href="/about" onClick={closeMenu}>
              About
            </MobileNavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNavigation;
