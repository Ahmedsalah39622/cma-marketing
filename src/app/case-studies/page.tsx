'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const caseStudies = [
  {
    id: 'fintech-transformation',
    title: 'FinTech Digital Transformation',
    client: 'Global Financial Services Corp',
    category: 'Digital Transformation',
    image: '/case-studies/fintech.jpg',
    challenge: 'Legacy systems hindering scalability and customer experience',
    solution: 'Comprehensive digital transformation with cloud migration and modern architecture',
    results: [
      '65% faster transaction processing',
      '40% reduction in operational costs',
      '99.99% system uptime achieved',
      'Enhanced security compliance'
    ],
    metrics: {
      users: '2M+',
      transactions: '$500M',
      uptime: '99.99%',
      timeline: '8 months'
    },
    tags: ['Cloud Migration', 'API Development', 'Security', 'DevOps']
  },
  {
    id: 'healthcare-analytics',
    title: 'Healthcare Analytics Platform',
    client: 'MediCare Solutions',
    category: 'Data Analytics & AI',
    image: '/case-studies/healthcare.jpg',
    challenge: 'Inefficient patient data analysis and prediction capabilities',
    solution: 'AI-powered analytics platform with predictive modeling',
    results: [
      'Reduced diagnosis time by 40%',
      'Improved patient outcomes by 35%',
      'Automated 70% of data processing',
      'Real-time patient monitoring'
    ],
    metrics: {
      patients: '500K+',
      accuracy: '98%',
      hospitals: '50+',
      timeline: '12 months'
    },
    tags: ['AI/ML', 'Data Analytics', 'Healthcare', 'Real-time Processing']
  },
  {
    id: 'ecommerce-scale',
    title: 'E-commerce Scale-up',
    client: 'RetailTech Innovations',
    category: 'Cloud Solutions',
    image: '/case-studies/ecommerce.jpg',
    challenge: 'Platform stability issues during high-traffic periods',
    solution: 'Scalable cloud architecture with microservices',
    results: [
      '10x increase in concurrent users',
      '99.9% uptime during peak sales',
      '50% reduction in page load time',
      'Zero downtime deployments'
    ],
    metrics: {
      traffic: '1M/day',
      conversion: '+45%',
      performance: '300ms',
      timeline: '6 months'
    },
    tags: ['Cloud Architecture', 'Performance', 'Scalability', 'Microservices']
  }
];

export default function CaseStudiesPage() {
  return (
    <main className="flex flex-col min-h-screen bg-black">
      {/* Hero Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent opacity-40" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
              Case Studies
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Explore how we&apos;ve helped businesses transform their operations and achieve remarkable results through innovative technology solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-32">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative"
              >
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Image Section */}
                  <div className="relative h-[400px] rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent z-10" />
                    <Image
                      src={study.image}
                      alt={study.title}
                      fill
                      loading="lazy"
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="space-y-6">
                    <div>
                      <span className="text-primary mb-2 block">{study.category}</span>
                      <h2 className="text-3xl font-bold mb-4">{study.title}</h2>
                      <p className="text-gray-400">{study.client}</p>
                    </div>

                    {/* Challenge & Solution */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Challenge</h3>
                        <p className="text-gray-400">{study.challenge}</p>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Solution</h3>
                        <p className="text-gray-400">{study.solution}</p>
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(study.metrics).map(([key, value]) => (
                        <div key={key} className="bg-white/5 p-4 rounded-lg">
                          <span className="text-2xl font-bold text-primary block mb-1">
                            {value}
                          </span>
                          <span className="text-sm text-gray-400 capitalize">
                            {key.replace('_', ' ')}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Results */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Key Results</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {study.results.map((result) => (
                          <li key={result} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                            <span className="text-gray-300">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {study.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full bg-white/5 text-sm text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Write Your Success Story?</h2>
            <p className="text-xl text-gray-400 mb-8">
              Let&apos;s discuss how we can help transform your business with innovative technology solutions.
            </p>
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-colors" title="Start Your Project" aria-label="Start Your Project">
              Start Your Project
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}