'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const skills = [
  'Next.js',
  'React.js',
  'Supabase',
  'MongoDB',
  'Prisma',
  'TypeScript',
  'Tailwind CSS',
];

const projects = [
  {
    name: 'Clash of Clans Stats Tracker',
    description:
      'A full-stack dashboard that allows users to track player stats using the Clash of Clans API. Built with Supabase for backend and Next.js for frontend.',
    tech: ['Next.js', 'Supabase', 'Tailwind', 'API'],
    link: '#',
  },
  {
    name: 'PC Builder App',
    description:
      'A web app that lets users pick PC parts and build custom configurations. Saved builds persist with MongoDB and Prisma.',
    tech: ['Next.js', 'MongoDB', 'Prisma'],
    link: '#',
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' },
  }),
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        custom={0}
        className="text-center mb-20"
      >
        <h1 className="text-5xl font-bold tracking-tight mb-4">
          Hey, I’m a Full-Stack Developer
        </h1>
        <p className="text-lg text-white max-w-2xl mx-auto">
          I specialize in building robust, scalable, and modern web applications
          using the best tools of today—Next.js, React, Supabase, Prisma, and
          MongoDB. I turn ideas into clean, efficient code.
        </p>
      </motion.div>

      {/* Skills Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        custom={1}
        className="mb-20"
      >
        <h2 className="text-3xl font-semibold mb-6">Tech Stack</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {skills.map((skill) => (
            <motion.div
              key={skill}
              whileHover={{ scale: 1.05 }}
              className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-center shadow-sm text-gray-700 font-medium"
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Projects Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        custom={2}
      >
        <h2 className="text-3xl font-semibold mb-8">Featured Projects</h2>
        <div className="space-y-8">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.01 }}
              className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-2xl font-bold text-black ">
                  {project.name}
                </h3>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    className="text-blue-600 hover:underline flex items-center gap-1"
                  >
                    View <ArrowUpRight size={16} />
                  </a>
                )}
              </div>
              <p className="text-gray-600 mt-2">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tech.map((tech, j) => (
                  <span
                    key={j}
                    className="px-3 py-1 bg-gray-100 text-sm rounded-full text-gray-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
