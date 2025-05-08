// app/changelog/page.tsx
'use client';

import { motion } from 'framer-motion';

const changelogs = [
  {
    version: 'v1.2.0',
    date: 'May 04, 2025',
    changes: [
      '✨ Added Timeline page with animations and SVG',
      '🐛 Fixed animation jitter on mobile navbar',
      '📊 Improved Supabase analytics for blog views',
    ],
  },
  {
    version: 'v1.1.0',
    date: 'April 20, 2025',
    changes: [
      '📝 Launched first MDX blog post',
      '📬 Setup contact form (no spam, promise)',
      '🖼️ Improved blog card visuals and layout',
    ],
  },
  {
    version: 'v1.0.0',
    date: 'April 01, 2025',
    changes: [
      '🚀 Initial launch of the blog site!',
      '🎨 Set up Tailwind CSS & typography',
      '🔐 Supabase integration for likes and views',
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0eafc] to-[#cfdef3] p-6 md:p-12">
      <motion.h1
        className="text-4xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
         Changelog
      </motion.h1>

      <div className="max-w-3xl mx-auto space-y-10">
        {changelogs.map((log, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-purple-700">
                {log.version}
              </h2>
              <span className="text-sm text-gray-500">{log.date}</span>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {log.changes.map((change, i) => (
                <li key={i}>{change}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
