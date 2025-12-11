'use client';

import { useEffect } from 'react';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: string;
}

export default function ProcessSection() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.scroll-fade');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const steps: ProcessStep[] = [
    {
      number: '01',
      title: 'Discovery & Strategy',
      description: 'Deep dive into your business, market, and goals to develop a winning strategy.',
      icon: '🔍'
    },
    {
      number: '02',
      title: 'Creative Development',
      description: 'Craft compelling creative assets and campaigns tailored to your audience.',
      icon: '🎨'
    },
    {
      number: '03',
      title: 'Implementation',
      description: 'Execute with precision across all channels with our expert team.',
      icon: '🚀'
    },
    {
      number: '04',
      title: 'Optimization & Growth',
      description: 'Continuously refine and scale for maximum ROI and sustainable growth.',
      icon: '📈'
    },
  ];

  return (
    <section id="process" className="section relative overflow-hidden">
      <div className="absolute bottom-10 left-10 w-80 h-80 hero-glow hero-glow-blue opacity-20" style={{ filter: 'blur(100px)' }}></div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-20 fade-in-down">
          <h2 className="section-title">Our Process</h2>
          <p className="section-subtitle">A proven methodology for guaranteed success</p>
        </div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="scroll-fade card-premium text-center"
                style={{ animationDelay: `${idx * 0.2}s` }}
              >
                {/* Animated circle */}
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-gold-blue rounded-full opacity-20 blur-lg"></div>
                  <div className="absolute inset-1 rounded-full border-2 border-yellow-500 flex items-center justify-center">
                    <span className="text-3xl font-black text-transparent bg-gradient-to-r from-yellow-400 to-blue-400 bg-clip-text">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Card content */}
                <div className="space-y-4">
                  <div className="text-5xl mb-4">{step.icon}</div>
                  <h3 className="text-xl font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="text-gray-400">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        {/* CTA */}
        <div className="text-center mt-20 fade-in-up" style={{ animationDelay: '0.8s' }}>
          <p className="text-xl text-gray-300 mb-8">Ready to transform your business?</p>
          <button className="btn-premium">
            Start Your Journey
          </button>
        </div>
      </div>
    </section>
  );
}
