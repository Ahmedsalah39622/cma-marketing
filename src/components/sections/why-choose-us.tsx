'use client';

import { motion } from 'framer-motion';
import { Server, Shield, Zap, Users, Code2, Heart } from 'lucide-react';

const features = [
  {
    icon: Server,
    title: "Enterprise Infrastructure",
    description: "Scalable, secure, and reliable infrastructure solutions built for enterprise needs.",
    color: "from-blue-500/20 to-blue-600/20"
  },
  {
    icon: Shield,
    title: "Maximum Security",
    description: "Advanced security protocols and real-time threat monitoring for complete protection.",
    color: "from-green-500/20 to-green-600/20"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized performance and rapid deployment for mission-critical applications.",
    color: "from-yellow-500/20 to-yellow-600/20"
  },
  {
    icon: Users,
    title: "Dedicated Support",
    description: "24/7 expert support team committed to your success and satisfaction.",
    color: "from-purple-500/20 to-purple-600/20"
  },
  {
    icon: Code2,
    title: "Custom Development",
    description: "Tailored solutions designed specifically for your unique business needs.",
    color: "from-red-500/20 to-red-600/20"
  },
  {
    icon: Heart,
    title: "Client Satisfaction",
    description: "98% client satisfaction rate with long-term partnership approach.",
    color: "from-pink-500/20 to-pink-600/20"
  }
];

export default function WhyChooseUs() {
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
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="relative z-10 bg-white/5 sm:backdrop-blur-sm p-6 rounded-2xl border border-white/10 h-full">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl`} />
                <div className="relative z-10">
                  <feature.icon className="w-12 h-12 text-white mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}