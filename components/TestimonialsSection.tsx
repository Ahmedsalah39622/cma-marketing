'use client';

import { useEffect } from 'react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  avatar: string;
  rating: number;
}

export default function TestimonialsSection() {
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

  const testimonials: Testimonial[] = [
    {
      name: 'Sarah Johnson',
      role: 'CEO',
      company: 'TechFlow Inc',
      text: 'Working with this team transformed our marketing completely. We saw a 400% ROI increase within 6 months.',
      avatar: '👩‍💼',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Marketing Director',
      company: 'Global Ventures',
      text: 'The creativity and strategic thinking here is unmatched. They truly understand modern marketing.',
      avatar: '👨‍💼',
      rating: 5
    },
    {
      name: 'Emma Rodriguez',
      role: 'Founder',
      company: 'StartupHub',
      text: 'From day one, they were committed to our success. Best decision we made for our brand.',
      avatar: '👩‍🦰',
      rating: 5
    },
  ];

  return (
    <section id="testimonials" className="section bg-gradient-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 hero-glow hero-glow-gold opacity-20" style={{ filter: 'blur(100px)' }}></div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16 fade-in-down">
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle">Join hundreds of satisfied clients achieving their goals</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="scroll-fade card-premium"
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-2xl group-hover:scale-125 transition-transform" style={{ animationDelay: `${i * 0.1}s` }}>⭐</span>
                ))}
              </div>

              {/* Testimonial text */}
              <p className="text-gray-300 mb-6 italic leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-yellow-600/50 via-blue-600/50 to-transparent mb-6"></div>

              {/* Client info */}
              <div className="flex items-center gap-4">
                <div className="text-5xl">{testimonial.avatar}</div>
                <div>
                  <h4 className="font-bold text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                  <p className="text-xs text-yellow-500 font-semibold">{testimonial.company}</p>
                </div>
              </div>

              {/* Hover effect background */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-500/0 via-blue-500/0 to-yellow-500/0 opacity-0 hover:opacity-5 transition-all duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Social proof */}
        <div className="mt-20 text-center fade-in-up" style={{ animationDelay: '0.6s' }}>
          <p className="text-gray-400 mb-6">Trusted by leading brands worldwide</p>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {['Google', 'Microsoft', 'Amazon', 'Apple', 'Meta'].map((brand, idx) => (
              <div
                key={idx}
                className="text-gray-500 font-bold text-lg hover:text-yellow-400 transition-colors opacity-50 hover:opacity-100"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
