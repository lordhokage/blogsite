// app/timeline/page.tsx
'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const milestones = [
  {
    title: '💡 Idea Born',
    description: 'Came up with the concept of building a personal blog site.',
    date: 'Jan 2025',
  },
  {
    title: '⚙️ Tech Stack Chosen',
    description:
      'Selected Next.js, Tailwind CSS, Supabase, and next-mdx-remote.',
    date: 'Feb 2025',
  },
  {
    title: '🚀 First Post Published',
    description: 'Wrote and published the first blog post using MDX!',
    date: 'March 2025',
  },
  {
    title: '📊 Supabase Integrated',
    description: 'Added likes and views tracking to blog posts.',
    date: 'April 2025',
  },
  {
    title: '✨ Animations & Polish',
    description: 'Used Framer Motion to bring the UI to life.',
    date: 'May 2025',
  },
  {
    title: '🌍 Launched!',
    description: 'Blog site is now live and growing 🚀',
    date: 'May 2025',
  },
];

export default function TimelinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] p-6 md:p-12">
      <motion.h1
        className="text-4xl font-bold text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Sparkles className="inline-block w-8 h-8 mr-2 text-purple-600" />
        My Blogging Journey
      </motion.h1>

      <div className="relative max-w-3xl mx-auto">
        <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 h-full border-l-4 border-purple-300 z-0"></div>

        <ul className="space-y-16 z-10 relative">
          {milestones.map((item, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="flex items-start md:items-center space-x-4"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-full border-4 border-white shadow-lg z-10" />
              <div className="bg-white p-6 rounded-xl shadow-md w-full md:ml-4">
                <h3 className="font-semibold text-xl mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{item.date}</p>
                <p className="text-gray-700">{item.description}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
