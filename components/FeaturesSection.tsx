'use client';

import { useEffect } from 'react';
import AnimatedCard from './AnimatedCard';

type Feature = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

export default function FeaturesSection() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('visible')),
      { threshold: 0.12 }
    );

    document.querySelectorAll('.scroll-fade').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const features: Feature[] = [
    { icon: <span className="text-3xl">⚡</span>, title: 'Lightning Fast', description: 'Real-time analytics and instant campaign deployment.' },
    { icon: <span className="text-3xl">🔒</span>, title: 'Secure & Reliable', description: 'Enterprise-grade security and data protection.' },
    { icon: <span className="text-3xl">🎛️</span>, title: 'Easy to Use', description: 'Intuitive interface that our clients love.' },
    { icon: <span className="text-3xl">📈</span>, title: 'Proven Results', description: 'Measured growth driven by strategic campaigns.' },
  ];

  return (
    <section id="features" className="section relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 hero-glow hero-glow-blue opacity-18" style={{ filter: 'blur(110px)' }} />

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12 fade-in-down">
          <h2 className="section-title">Powerful Features</h2>
          <p className="section-subtitle">Everything crafted for measurable growth</p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={i} className="scroll-fade" style={{ animationDelay: `${i * 0.08}s` }}>
              <AnimatedCard className="h-full flex flex-col items-start gap-3" title={f.title} subtitle={f.description} icon={f.icon} />
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <div className="w-full md:w-3/4 text-center">
            <div className="rounded-lg p-6 card-premium">
              <h3 className="text-xl font-bold mb-2">Integrated Platform</h3>
              <p className="text-gray-300">A single platform to plan, launch, and measure omni-channel campaigns.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
