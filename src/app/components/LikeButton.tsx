'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';

export default function LikeButton() {
  const [likes, setLikes] = useState(23222);
  const [animations, setAnimations] = useState<{ id: string; value: number }[]>(
    []
  );

  const handleClick = () => {
    const id = uuidv4();
    setLikes((prev) => prev + 1);
    setAnimations((prev) => [...prev, { id, value: 1 }]);

    setTimeout(() => {
      setAnimations((prev) => prev.filter((a) => a.id !== id));
    }, 600); // duration of animation
  };

  return (
    <div className="flex flex-col items-center space-y-1">
      <div className="relative flex items-center justify-center">
        <motion.button
          onClick={handleClick}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="focus:outline-none"
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#ff007a"
            width="48"
            height="48"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                     2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 
                     4.5 2.09C13.09 3.81 14.76 3 16.5 3 
                     19.58 3 22 5.42 22 8.5c0 3.78-3.4 
                     6.86-8.55 11.54L12 21.35z"
            />
          </motion.svg>
        </motion.button>

        {/* Multiple +1s */}
        <AnimatePresence>
          {animations.map(({ id, value }) => (
            <motion.span
              key={id}
              initial={{ opacity: 0, x: 8, y: -10 }}
              animate={{ opacity: 1, y: -30 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6 }}
              className="absolute text-pink-500 font-bold text-sm pointer-events-none"
            >
              +{value}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      {/* Like count */}
      <motion.div
        key={likes}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-pink-600 font-bold text-lg"
      >
        {likes.toLocaleString()}
      </motion.div>
    </div>
  );
}
