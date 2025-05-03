import React from 'react';
import Link from 'next/link';
const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <Link
        href="/"
        className="text-indigo-600 text-xl font-bold flex items-center"
      >
        <span>Blog</span>
        <span className="relative px-1 inline-block">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 left-0"
            style={{ transform: 'translateY(-50%) translateX(0%)' }}
          >
            <path
              d="M9 5L15 12L9 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span>Post</span>
      </Link>
    </div>
  );
};

export default Logo;
