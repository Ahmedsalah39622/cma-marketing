'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import logoImg from '../../../Gemini_Generated_Image_qt0ozxqt0ozxqt0o-removebg-preview.png';

// Use static logo image instead of 3D scene

export default function HeroSection() {

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center bg- pt-16 pb-8 md:py-0">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left space-y-4 md:space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-[1.2] tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Grow Your Brand with{' '}
              <span className="text-primary">CMA Marketing</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto md:mx-0 leading-relaxed">
              We craft data-driven marketing strategies that elevate brands, increase engagement, and
              drive measurable growth across digital channels — from creative campaigns to analytics-led optimization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/contact">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto text-[1rem] py-6 sm:py-4 font-medium tracking-wide" 
                  title="Get Started" 
                  aria-label="Get Started"
                >
                  Get Started
                </Button>
              </Link>
              <Link href="/services">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto text-[1rem] py-6 sm:py-4 font-medium tracking-wide border-white/10 hover:bg-white/5" 
                  title="Learn More" 
                  aria-label="Learn More"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square w-full max-w-lg mx-auto md:max-w-none flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-10 rounded-full blur-3xl" />
            <motion.div
              initial={{ y: 6 }}
              animate={{ y: [-10, 0, -10] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-48 h-48 md:w-80 md:h-80 flex items-center justify-center"
            >
              <Image src={logoImg} alt="CMA Marketing logo" width={320} height={320} className="object-contain" priority />
            </motion.div>
          </motion.div>
        </div>
      </div>
      {/* Bouncing scroll arrow - not a button; scrolls slowly to the next section (id="stats") */}
      <a
        href="#stats"
        onClick={(e) => {
          e.preventDefault();
          const target = document.getElementById('stats');
          if (!target) return;
          const start = window.pageYOffset;
          const end = target.getBoundingClientRect().top + window.pageYOffset;
          const distance = end - start;
          const duration = 1200; // ms
          let startTime: number | null = null;
          function easeInOut(t: number) {
            return 0.5 - Math.cos(t * Math.PI) / 2;
          }
          function step(timestamp: number) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeInOut(progress);
            window.scrollTo(0, start + distance * eased);
            if (progress < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
        }}
        className="absolute left-1/2 transform -translate-x-1/2 bottom-24 md:bottom-32 hidden md:flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full border border-white/10 bg-white/2 text-white cursor-pointer hero-scroll-arrow z-50 pointer-events-auto"
        aria-label="Scroll to next section"
        title="Scroll to next section"
      >
        <span className="sr-only">Scroll to next section</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </a>
    </section>
  );
}
