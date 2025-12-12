'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, CloudCog, Shield, Blocks, MoveRight, Zap } from 'lucide-react';

const solutions = [
  {
    title: 'Custom Software Development',
    description: 'Tailored solutions built from the ground up to meet your unique business needs.',
    icon: Code,
    highlights: ['Modern Tech Stack', 'Scalable Architecture', 'Clean Code Standards'],
    benefits: '30% faster development cycles'
  },
  {
    title: 'Cloud Solutions',
    description: 'Leverage the power of cloud computing for scalability and reliability.',
    icon: CloudCog,
    highlights: ['AWS & Azure Expertise', 'Cloud Migration', 'Serverless Architecture'],
    benefits: '99.9% uptime guarantee'
  },
  {
    title: 'Cybersecurity',
    description: 'Protect your digital assets with enterprise-grade security solutions.',
    icon: Shield,
    highlights: ['Threat Detection', 'Data Encryption', 'Security Audits'],
    benefits: 'Zero security breaches'
  },
  {
    title: 'AI & Machine Learning',
    description: 'Transform your data into actionable insights with advanced AI solutions.',
    icon: Blocks,
    highlights: ['Predictive Analytics', 'Natural Language Processing', 'Computer Vision'],
    benefits: '40% improved efficiency'
  }
];

export default function SolutionsPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10
      }
    }
  };

  const gradientVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 0.8,
      scale: 1,
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "mirror" as const
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <motion.div
          className="absolute inset-0 z-0"
          initial="initial"
          animate="animate"
          variants={gradientVariants}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent opacity-30 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 via-primary/10 to-transparent opacity-30 blur-3xl" />
        </motion.div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-6">
              Enterprise Solutions That Scale
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Transform your business with cutting-edge technology solutions designed for the future.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-6 rounded-xl text-lg font-medium backdrop-blur-sm border border-white/10"
              >
                Explore Solutions <ArrowRight className="ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {solutions.map((solution) => (
              <motion.div
                key={solution.title}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <solution.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">{solution.title}</h3>
                    <p className="text-gray-400 mb-4">{solution.description}</p>
                    <ul className="space-y-2">
                      {solution.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-center text-sm text-gray-300">
                          <Zap className="w-4 h-4 mr-2 text-primary/80" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 pt-4 border-t border-white/10">
                      <p className="text-primary flex items-center text-sm">
                        <span className="font-semibold">{solution.benefits}</span>
                        <MoveRight className="w-4 h-4 ml-2" />
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-30 blur-3xl" />
        </motion.div>

        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how our solutions can help you achieve your business goals.
              Schedule a consultation with our experts today.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Button
                className="bg-white text-black hover:bg-white/90 px-8 py-6 rounded-xl text-lg font-medium"
              >
                Schedule Consultation <ArrowRight className="ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}