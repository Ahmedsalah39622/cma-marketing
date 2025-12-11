'use client';

import { useEffect } from 'react';

interface PortfolioItem {
  title: string;
  category: string;
  image: string;
  increase: string;
}

export default function PortfolioSection() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')), { threshold: 0.12 });
    document.querySelectorAll('.scroll-fade').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const portfolio: PortfolioItem[] = [
    { title: 'E-Commerce Revolution', category: 'Digital Strategy', image: '🛍️', increase: '+340% Sales Growth' },
    { title: 'Tech Startup Launch', category: 'Brand Identity', image: '🚀', increase: '+500K Users' },
    { title: 'Fashion Global Brand', category: 'Social Media', image: '👗', increase: '+2M Followers' },
    { title: 'SaaS Marketing Success', category: 'Performance Marketing', image: '💻', increase: '+250% Revenue' },
  ];

  return (
    <section id="portfolio" className="section bg-gradient-dark relative">
      <div className="absolute top-20 right-10 w-80 h-80 hero-glow hero-glow-gold opacity-18" style={{ filter: 'blur(100px)' }} />

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12 fade-in-down">
          <h2 className="section-title">Our Success Stories</h2>
          <p className="section-subtitle">Real results from real clients</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {portfolio.map((item, idx) => (
            <div key={idx} className="scroll-fade">
              <div className="card-premium relative overflow-hidden h-80 group">
                <div className="absolute inset-0 bg-gradient-gold-blue opacity-0 group-hover:opacity-8 transition-all duration-400"></div>

                <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="inline-block px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 mb-4">
                      <span className="text-yellow-400 text-sm font-semibold">{item.category}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Performance</span>
                      <span className="text-2xl font-bold text-yellow-400">{item.increase}</span>
                    </div>
                    <div className="mt-4 h-1 bg-gradient-gold-blue rounded-full transition-all duration-300"></div>
                  </div>
                </div>

                <div className="absolute -right-12 -top-8 text-8xl opacity-8 group-hover:opacity-14 transition-all duration-400">{item.image}</div>

                <div className="absolute bottom-0 left-0 right-0 h-0 group-hover:h-16 bg-gradient-to-t from-black via-black to-transparent transition-all duration-300 flex items-center justify-center">
                  <button className="text-yellow-400 font-bold">View Case Study</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 fade-in-up">
          <button className="btn-premium">View All Projects</button>
        </div>
      </div>
    </section>
  );
}
