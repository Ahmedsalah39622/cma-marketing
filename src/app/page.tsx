"use client";

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import HeroSection from '@/components/sections/hero-section';
import ServicesSection from '@/components/sections/services-section';
import AnimatedStatsSlider from '@/components/sections/animated-stats-slider';
import CtaSection from '@/components/sections/cta-section';
import ProcessSection from '@/components/sections/process-section';
import TestimonialsSection from '@/components/sections/testimonials-section';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';


export default function Home() {
  const router = useRouter();
  return (
    <main className="flex flex-col min-h-screen w-screen overflow-x-hidden">
      <div className="w-full">
        <HeroSection />
        <AnimatedStatsSlider />
        <ServicesSection />
        <ProcessSection />
        <TestimonialsSection />
        <CtaSection />
        {/* Replaced the animated contact form with a single CTA button that redirects to /contact */}
      <section className="py-20 px-4 relative bg-black text-white">
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <a
                  href="https://wa.me/201113146750?text=مرحبا، أود الاستفسار عن خدماتكم"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-6 rounded-xl text-lg font-medium bg-green-600 hover:bg-green-700 text-white inline-flex items-center gap-2"
                >
                  Chat on WhatsApp
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      </div>
    </main>
  );
}
