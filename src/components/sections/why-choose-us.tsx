'use client';

import { motion } from 'framer-motion';
import { Server, Shield, Zap, Users, Code2, Heart } from 'lucide-react';

const features = [
  {

    import { useEffect, useState } from 'react';
    import { getHomePageContent } from '@/lib/content';

    type Feature = {
      icon: string;
      title: string;
      description: string;
      color: string;
    };

    const iconMap = { Server, Shield, Zap, Users, Code2, Heart };

    export default function WhyChooseUs() {
      const [features, setFeatures] = useState<Feature[]>([]);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        getHomePageContent().then(data => {
          setFeatures(data.features || []);
          setLoading(false);
        });
      }, []);

      if (loading) return <div className="text-center py-12">Loading features...</div>;
      if (!features.length) return <div className="text-center py-12">No features available.</div>;
  return (
    <section className="py-24 bg- relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-primary/5 to-black" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Why Choose Novix?</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            We combine cutting-edge technology with expert knowledge to deliver 
            unparalleled solutions for your business.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Server;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="relative z-10 bg-white/5 p-6 rounded-2xl border border-white/10 h-full">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl`}
                    style={{ willChange: 'opacity, transform', transform: 'translateZ(0)', pointerEvents: 'none' }}
                  />
                  <div className="relative z-10">
                    <Icon className="w-12 h-12 text-white mb-4" />
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}