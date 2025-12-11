'use client';

import { useEffect, useRef } from 'react';
import AnimatedCard from './AnimatedCard';

export default function HeroSection() {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current as HTMLElement | null;
    if (element) element.classList.add('fade-in-down');
  }, []);

  return (
    <section id="hero" className="section relative min-h-screen overflow-hidden pt-28">
      <div className="absolute top-8 left-8 w-64 h-64 hero-glow hero-glow-gold opacity-60" style={{ filter: 'blur(68px)' }} />
      <div className="absolute bottom-12 right-12 w-80 h-80 hero-glow hero-glow-blue opacity-50" style={{ filter: 'blur(88px)' }} />

      <div className="absolute inset-0 bg-grid-pattern opacity-6"></div>

      <div className="container mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div ref={ref} className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              <span className="block text-white">Transform Your</span>
              <span className="block text-gradient">Business Today</span>
            </h1>

            <p className="text-lg text-gray-300 max-w-xl">
              Experience powerful marketing crafted to elevate your brand — elegant design, measurable growth, and campaigns that convert.
            </p>

            <div className="flex items-center gap-6">
              <button className="btn-premium text-base">
                Get Started
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>

              <div className="text-sm text-gray-400">
                <div className="font-semibold">Trusted by</div>
                <div className="flex gap-4 mt-2 opacity-70">
                  {['Google', 'Microsoft', 'Amazon', 'Apple', 'Meta'].map((b) => (
                    <span key={b} className="text-xs">{b}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative h-80 md:h-96">
              <AnimatedCard className="absolute top-0 left-0 w-56 animate-float" title="Sarah Johnson" subtitle="CEO, TechFlow">
                <em className="text-sm">"Incredible results in just 6 months!"</em>
              </AnimatedCard>

              <AnimatedCard className="absolute top-28 right-0 w-56 animate-float" title="Revenue Growth" subtitle="+340%" />

              <AnimatedCard className="absolute bottom-0 right-12 w-56 animate-float" title="Campaigns" subtitle="Successful Launches">
                <div className="mt-2"><span className="text-sm text-gray-300">Strategic launches across channels</span></div>
              </AnimatedCard>

              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -bottom-16 -right-12 w-56 h-36 bg-white/5 rounded-2xl blur-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
