'use client';
import React from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
const categories = [
  { name: 'CSS', icon: '#' },
  { name: 'React', icon: '⚛️' },
  { name: 'Animation', icon: '✨' },
  { name: 'JavaScript', icon: 'JS' },
  { name: 'Career', icon: '💼' },
  { name: 'General', icon: '📄' },
];

const dropdownVariants = {
  hidden: { opacity: 0, y: -10, pointerEvents: 'none' },
  visible: { opacity: 1, y: 0, pointerEvents: 'auto' },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

interface CategoryDropProps {
  isOpen: boolean;
}
const CategoryDrop = ({ isOpen }: CategoryDropProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="absolute z-10 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 grid grid-cols-1 gap-3 border border-gray-200">
          {categories.map(({ name, icon }, index) => (
            <Link
              key={index}
              href={`/${name.toLowerCase()}`}
              className="flex items-center p-2 hover:bg-gray-50 rounded-md"
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
