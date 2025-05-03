import React from 'react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => (
  <a
    href={href}
    className="px-4 py-2 text-gray-800 hover:text-indigo-600 transition-colors duration-200"
  >
    {children}
  </a>
);

const Navigation: React.FC = () => {
  return (
    <nav className="hidden md:flex items-center">
      <NavLink href="/categories">Categories</NavLink>
      <NavLink href="/courses">Courses</NavLink>
      <NavLink href="/goodies">Goodies</NavLink>
      <NavLink href="/about">About</NavLink>
    </nav>
  );
};

export default Navigation;
