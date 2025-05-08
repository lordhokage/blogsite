/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // This is critical for class-based dark mode
  theme: {
    extend: {
      smallscreen: { raw: '(min-width: 385px)' },
      screens: {},
      colors: {
        // Define your custom colors here, if needed
        primary: {
          light: '#4f46e5', // indigo-600
          dark: '#818cf8', // indigo-400
        },
      },
      backgroundColor: {
        light: '#ffffff', // Light mode background
        dark: '#121212', // Dark mode background
      },
      textColor: {
        light: '#171717', // Light mode text
        dark: '#f3f4f6', // Dark mode text
      },
    },
  },
  plugins: [
    // Add a custom plugin to increase dark mode specificity
    function ({ addBase, addUtilities, config }) {
      // Add a base style that ensures dark mode has higher specificity
      addBase({
        '.dark': {
          colorScheme: 'dark',
        },
      });

      // Create utilities with higher specificity for dark mode
      const darkUtilities = {};

      // Add higher specificity to common text colors
      darkUtilities['.dark .dark\\:text-white'] = {
        color: '#ffffff !important',
      };
      darkUtilities['.dark .dark\\:text-black'] = {
        color: '#000000 !important',
      };

      // Add higher specificity to common background colors
      darkUtilities['.dark .dark\\:bg-black'] = {
        backgroundColor: '#000000 !important',
      };
      darkUtilities['.dark .dark\\:bg-white'] = {
        backgroundColor: '#ffffff !important',
      };
      darkUtilities['.dark .dark\\:bg-gray-900'] = {
        backgroundColor: '#111827 !important',
      };
      darkUtilities['.dark .dark\\:bg-gray-800'] = {
        backgroundColor: '#1f2937 !important',
      };

      // Add more color overrides as needed
      addUtilities(darkUtilities, { variants: ['responsive'] });
    },
  ],
};
