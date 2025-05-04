'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

const LikeButton = () => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(42);
  const [showAnimation, setShowAnimation] = useState(false);
  const [isIncrement, setIsIncrement] = useState(true);

  const handleLike = () => {
    // Set animation type before changing liked state
    setIsIncrement(!liked);

    // Toggle liked state
    setLiked(!liked);

    // Update like count
    setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));

    // Show animation
    setShowAnimation(true);

    // Hide animation after animation completes
    setTimeout(() => {
      setShowAnimation(false);
    }, 1000);
  };

  return (
    <div className="relative h-12 flex items-center">
      <button
        onClick={handleLike}
        className="flex items-center justify-center focus:outline-none"
        aria-label={liked ? 'Unlike article' : 'Like article'}
      >
        <motion.div whileTap={{ scale: 0.9 }} className="relative">
          <Heart
            size={32}
            className={`transition-colors ${
              liked ? 'text-red-500 fill-red-500' : 'text-gray-400'
            }`}
          />

          {/* Heart explosion animation when liked */}
          <AnimatePresence>
            {liked && (
              <motion.div
                key="heart-particles"
                initial={{ scale: 0.8, opacity: 1 }}
                animate={{ scale: 1.5, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Heart size={32} className="text-red-500 fill-red-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Fixed position count display to prevent layout shift */}
        <span className="ml-2  font-medium w-8">{likeCount}</span>

        {/* Floating Heart Animation Indicator */}
        <AnimatePresence>
          {showAnimation && (
            <motion.div
              key={isIncrement ? 'heart-added' : 'heart-removed'}
              initial={{ opacity: 0, y: 0, scale: 0.5 }}
              animate={{ opacity: 1, y: -30, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute left-8 pointer-events-none"
            >
              {isIncrement ? (
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, times: [0, 0.2, 0.4, 0.6] }}
                >
                  <Heart size={16} className="text-red-500 fill-red-500" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{
                    rotate: [-5, 5],
                    x: [0, 2, -2, 0],
                  }}
                  transition={{
                    duration: 0.4,
                    repeat: 1,
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-red-500"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    <path d="m12 13-1-1 2-2-3 1-2-4 1 4-4 2 3.5.5L12 13Z" />
                  </svg>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
};

export default LikeButton;
