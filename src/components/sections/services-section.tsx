'use client';

import { motion } from 'framer-motion';
import { Database, Server, Globe, ShoppingCart, Code2, Cog, Cloud, Shield } from 'lucide-react';
import { AnimatedServiceCard } from '../ui/animated-service-card';
import CurvedBackground from '../ui/curved-background';

const services = [
  {
    title: 'ERP Solutions',
    description: 'Custom Enterprise Resource Planning systems to streamline your business operations and improve efficiency.',
    icon: Database,
    tech: ['SAP', 'Oracle', 'Custom Solutions'],
  },
  {
    title: 'System Administration',
    description: 'Expert management and maintenance of your IT infrastructure, ensuring optimal performance and security.',
    icon: Server,
    tech: ['Windows Server', 'Linux', 'Cloud Infrastructure'],
  },
  {
    title: 'Web Development',
    description: 'Modern, responsive websites and web applications built with cutting-edge technologies.',
    icon: Globe,
    tech: ['Next.js', 'React', 'Node.js'],
  },
  {
    title: 'POS & Cashier Systems',
    description: 'Reliable point-of-sale and inventory management solutions for retail businesses.',
    icon: ShoppingCart,
    tech: ['Custom POS', 'Inventory Management', 'Payment Integration'],
  },
  {
    title: 'Custom Software',
    description: 'Tailored software solutions designed to meet your specific business needs and challenges.',
    icon: Code2,
    tech: ['Desktop Apps', 'Mobile Apps', 'Web Apps'],
  },
  {
    title: 'DevOps Services',
    description: 'Streamline your development and operations with modern DevOps practices and tools.',
    icon: Cog,
    tech: ['CI/CD', 'Docker', 'Kubernetes'],
  },
  {
    title: 'Cloud Solutions',
    description: 'Expert cloud consulting and implementation services for scalable infrastructure.',
    icon: Cloud,
    tech: ['AWS', 'Azure', 'GCP'],
  },
  {
    title: 'Security Services',
    description: 'Comprehensive cybersecurity solutions to protect your business assets and data.',
    icon: Shield,
    tech: ['Security Audits', 'Penetration Testing', 'Compliance'],
  },
];


export default function ServicesSection() {
  return (
    <section className="relative py-24 bg-">
      <CurvedBackground />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Our Solutions</h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            At Novix, we provide advanced technological solutions that drive innovation.
            From AI integration to cloud infrastructure, we power your digital transformation.
          </p>
        </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {services.map((service, index) => (
            <AnimatedServiceCard
              key={service.title}
              {...service}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
