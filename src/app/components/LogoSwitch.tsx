'use client';

import { motion } from 'framer-motion';

export default function LogoSwitch() {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 220 100"
      width="160"
      height="80"
      style={{ cursor: 'default' }}
    >
      {/* Left Brace */}
      <motion.text
        x="30"
        y="70"
        fontFamily="monospace"
        fontSize="70"
        fontWeight="bold"
        fill="#3498db"
        initial={{ x: 0 }}
        animate={{ x: -8 }}
        transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
      >
        {'{'}
      </motion.text>

      {/* Right Brace */}
      <motion.text
        x="150"
        y="70"
        fontFamily="monospace"
        fontSize="70"
        fontWeight="bold"
        fill="#3498db"
        initial={{ x: 0 }}
        animate={{ x: 8 }}
        transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
      >
        {'}'}
      </motion.text>

      {/* Switch */}
      <motion.g
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
      >
        {/* Switch track */}
        <rect
          x="80"
          y="40"
          width="60"
          height="24"
          rx="12"
          ry="12"
          fill="#3498db"
        />
        {/* Switch toggle */}
        <motion.circle
          cx="90"
          cy="52"
          r="10"
          fill="white"
          initial={{ x: 0 }}
          animate={{ x: 30 }}
          transition={{ type: 'spring', stiffness: 300, delay: 0.6 }}
        />
      </motion.g>
    </motion.svg>
  );
}
