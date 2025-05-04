'use client';
import React from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

const categories = [
  { name: 'CSS', icon: '#', link: '/css' },
  { name: 'React', icon: '⚛️', link: '/react' },
  // { name: 'Animation', icon: '✨', link: '/animation' },
  { name: 'JavaScript', icon: 'JS', link: 'js' },
  { name: 'Career', icon: '💼', link: '/career' },
  { name: 'General', icon: '📄', link: '/blog' },
];

const dropdownVariants = {
  hidden: { opacity: 0, y: -10, pointerEvents: 'none' },
  visible: { opacity: 1, y: 0, pointerEvents: 'auto' },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

interface CategoryDropProps {
  isOpen: boolean;
  onClose: () => void;
}
const CategoryDrop = ({ isOpen, onClose }: CategoryDropProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="absolute z-10 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 grid grid-cols-1 gap-3 border border-gray-200">
          {categories.map(({ name, icon, link }, index) => (
            <Link
              key={index}
              href={link}
              className="flex items-center p-2 hover:bg-gray-50 rounded-md"
              onClick={onClose}
            >
              <span className="w-6 h-6 flex items-center justify-center text-sm bg-blue-100 text-blue-600 rounded mr-3">
                {icon}
              </span>
              <span className="text-black ">{name}</span>
            </Link>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CategoryDrop;
