'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Database, Cloud, Code2, Cpu, Brain, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SpeedInsights } from "@vercel/speed-insights/next"

const technologies = [
  {
    category: 'Backend Development',
    icon: Database,
    techs: ['Node.js', 'Python', 'Java', 'Go', 'PostgreSQL', 'MongoDB'],
    description: 'Robust and scalable backend solutions'
  },
  {
    category: 'Frontend Development',
    icon: Code2,
    techs: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js'],
    description: 'Modern and responsive user interfaces'
  },
  {
    category: 'Cloud & DevOps',
    icon: Cloud,
    techs: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'CI/CD'],
    description: 'Scalable cloud infrastructure'
  },
  {
    category: 'AI & Machine Learning',
    icon: Brain,
    techs: ['TensorFlow', 'PyTorch', 'OpenAI', 'Computer Vision', 'NLP'],
    description: 'Cutting-edge AI solutions'
  },
  {
    category: 'Cybersecurity',
    icon: Lock,
    techs: ['Encryption', 'Penetration Testing', 'Security Audits', 'WAF'],
    description: 'Enterprise-grade security'
  },
  {
    category: 'IoT & Edge Computing',
    icon: Cpu,
    techs: ['IoT Platforms', 'Edge Computing', 'Sensors', 'Real-time Analytics'],
    description: 'Connected device solutions'
  }
];

export default function TechnologyPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20">
      {/* Hero Section */}
      <section className="relative mb-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-b from-primary/20 via-secondary/10 to-transparent opacity-30 blur-3xl"
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Cutting-Edge Technology Stack
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              We leverage the latest technologies to build scalable, secure, and innovative solutions for our clients.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tech Grid */}
      <section className="relative px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <tech.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{tech.category}</h3>
                </div>
                <p className="text-gray-400 mb-4">{tech.description}</p>
                <div className="flex flex-wrap gap-2">
                  {tech.techs.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 mt-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-primary/10 via-secondary/5 to-transparent opacity-30 blur-3xl"
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <h3 className="text-4xl font-bold text-primary mb-2">20+</h3>
              <p className="text-gray-400">Technologies Mastered</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <h3 className="text-4xl font-bold text-primary mb-2">15+</h3>
              <p className="text-gray-400">Projects Delivered</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <h3 className="text-4xl font-bold text-primary mb-2">24/7</h3>
              <p className="text-gray-400">Technical Support</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}