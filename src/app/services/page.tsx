'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Code2, Cloud, Laptop, Brush, ChartBar, Shield, Server, Lightbulb, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const projects = [
  {
    id: 1,
    title: 'Urgent Company Agents Dashboard Platform',
    category: 'System Administration',
    images: [
      '/case-studies/project1-1.png',
      '/case-studies/project1-2.png'
    ]
  },
  {
    id: 2,
    title: 'LifeLine Hospital Management System',
    category: 'Cloud Migration Project',
    images: [
      '/case-studies/project2-1.png',
      '/case-studies/project2-2.png',
      '/case-studies/project2-3.png',
      '/case-studies/project2-4.png'
    ]
  },
  {
    id: 3,
    title: 'CSS Website',
    category: 'Web Development',
    images: [
      '/case-studies/project3-1.jpg',
      '/case-studies/project3-2.jpg',
      '/case-studies/project3-3.jpg',
      '/case-studies/project3-4.jpg'
    ]
  }
];

const services = [
  {
    id: 'custom-development',
    icon: Code2,
    title: 'Custom Software Development',
    description: 'Tailored solutions built from the ground up to meet your specific business needs.',
    features: [
      'Enterprise Software Solutions',
      'Mobile App Development',
      'Web Applications',
      'Integration Services'
    ],
    color: 'from-blue-600/20 to-cyan-400/20'
  },
  {
    id: 'cloud-solutions',
    icon: Cloud,
    title: 'Cloud Solutions',
    description: 'Scalable and secure cloud infrastructure designed for modern businesses.',
    features: [
      'Cloud Migration',
      'Cloud-Native Development',
      'Serverless Architecture',
      'Multi-Cloud Strategy'
    ],
    color: 'from-purple-600/20 to-pink-400/20'
  },
  {
    id: 'digital-transformation',
    icon: Laptop,
    title: 'Digital Transformation',
    description: 'Guide your business into the digital age with comprehensive transformation strategies.',
    features: [
      'Process Automation',
      'Legacy System Modernization',
      'Digital Strategy Consulting',
      'Technology Roadmap'
    ],
    color: 'from-emerald-600/20 to-teal-400/20'
  },
  {
    id: 'ui-ux',
    icon: Brush,
    title: 'UI/UX Design',
    description: 'Create engaging user experiences that drive adoption and satisfaction.',
    features: [
      'User Interface Design',
      'User Experience Design',
      'Design Systems',
      'Prototyping & Testing'
    ],
    color: 'from-orange-600/20 to-amber-400/20'
  },
  {
    id: 'data-analytics',
    icon: ChartBar,
    title: 'Data Analytics & AI',
    description: 'Transform your data into actionable insights with advanced analytics and AI.',
    features: [
      'Business Intelligence',
      'Machine Learning Solutions',
      'Predictive Analytics',
      'Data Visualization'
    ],
    color: 'from-red-600/20 to-rose-400/20'
  },
  {
    id: 'cybersecurity',
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Protect your digital assets with comprehensive security solutions.',
    features: [
      'Security Assessments',
      'Threat Detection & Response',
      'Compliance Management',
      'Security Architecture'
    ],
    color: 'from-green-600/20 to-lime-400/20'
  },
  {
    id: 'devops',
    icon: Server,
    title: 'DevOps Solutions',
    description: 'Streamline your development and operations with modern DevOps practices.',
    features: [
      'CI/CD Implementation',
      'Infrastructure as Code',
      'Container Orchestration',
      'Monitoring & Logging'
    ],
    color: 'from-indigo-600/20 to-blue-400/20'
  },
  {
    id: 'consulting',
    icon: Lightbulb,
    title: 'Technology Consulting',
    description: 'Strategic guidance to help you make informed technology decisions.',
    features: [
      'Technology Assessment',
      'Architecture Design',
      'Vendor Selection',
      'Project Management'
    ],
    color: 'from-yellow-600/20 to-amber-400/20'
  }
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5"
    >
      <div className="relative h-56 md:h-64 overflow-hidden bg-black">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={project.images[currentImageIndex]}
            alt={`${project.title} - Image ${currentImageIndex + 1}`}
            fill
            className="w-full h-full object-cover"
            priority={false}
          />
        </motion.div>
        
        {/* Navigation Buttons */}
        {project.images.length > 1 && (
          <>
            <motion.button
              onClick={prevImage}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </motion.button>
            <motion.button
              onClick={nextImage}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </motion.button>
          </>
        )}

        {/* Image Counter */}
        {project.images.length > 1 && (
          <motion.div
            key={`counter-${currentImageIndex}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-2 right-2 bg-black/60 px-3 py-1 rounded-full text-sm text-white"
          >
            {currentImageIndex + 1} / {project.images.length}
          </motion.div>
        )}
      </div>

      {/* Project Info */}
      <div className="p-4 sm:p-6">
        <p className="text-primary text-sm font-semibold mb-2">{project.category}</p>
        <h3 className="text-lg sm:text-xl font-semibold text-white">{project.title}</h3>
      </div>
    </motion.div>
  );
}

export default function ServicesPage() {
  const router = useRouter();
  return (
  <main className="flex flex-col min-h-screen overflow-x-hidden text-white">
      {/* Hero Section */}
  <section className="py-12 md:py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent opacity-40" />
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-2xl sm:max-w-3xl md:max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Our Services</h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
                Comprehensive technology solutions tailored to transform your business. 
                From concept to execution, we deliver excellence at every step.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Detailed Services Section */}
  <section className="py-8 sm:py-12 md:py-24 bg-black">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`bg-gradient-to-br ${service.color} p-1 rounded-2xl`}>
                  <div className="bg-black/90 sm:backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-2xl h-full">
                    <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <service.icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary shrink-0" />
                      <div>
                        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">{service.title}</h2>
                        <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-4 sm:mb-6">{service.description}</p>
                      </div>
                    </div>
                    <ul className="space-y-2 sm:space-y-3">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-1 sm:gap-2">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary/60" />
                          <span className="text-gray-300 text-xs sm:text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Showcase Section - Placeholder for future content */}
  <section className="py-12 md:py-24 bg-black">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">Some of Our Projects</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-xl sm:max-w-2xl mx-auto">
              Discover how we&apos;ve helped businesses achieve their goals through innovative technology solutions.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
  <section className="py-12 md:py-24 bg-black relative overflow-hidden">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl sm:max-w-2xl md:max-w-4xl mx-auto text-center"
          >
            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-4 sm:mb-6">Ready to Transform Your Business?</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-4 sm:mb-8">
              Let&apos;s discuss how our services can help you achieve your goals.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Button
                onClick={() => router.push('/contact?scroll=form')}
                className="bg-white text-black hover:bg-white/90 px-8 py-6 rounded-xl text-lg font-medium"
              >
                Schedule Consultation <ArrowRight className="ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}