'use client';

import { motion } from 'framer-motion';
import { Database, Server, Globe, ShoppingCart, Code2, Cog, Cloud, Shield } from 'lucide-react';
import { AnimatedServiceCard } from '../ui/animated-service-card';
import CurvedBackground from '../ui/curved-background';


const iconMap = {
  Database,
  Server,
  Globe,
  ShoppingCart,
  Code2,
  Cog,
  Cloud,
  Shield,
};



import { useEffect, useState } from 'react';
import { getHomePageContent } from '@/lib/content';

type Service = {
  title: string;
  description: string;
  icon: string;
  tech?: string[];
};

export default function ServicesSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [heading, setHeading] = useState('Our Solutions');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHomePageContent().then(data => {
      setServices(data.services?.services || []);
      setHeading(data.services?.heading || 'Our Solutions');
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="text-center py-12">Loading services...</div>;
  if (!services.length) return <div className="text-center py-12">No services available.</div>;

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
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">{heading}</h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            At Novix, we provide advanced technological solutions that drive innovation.
            From AI integration to cloud infrastructure, we power your digital transformation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {services.map((service, index) => {
            let Icon = Database;
            if (service.icon && iconMap[service.icon]) {
              Icon = iconMap[service.icon];
            }
            return (
              <AnimatedServiceCard
                key={service.title}
                {...service}
                icon={Icon}
                index={index}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}