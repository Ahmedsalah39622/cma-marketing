'use client';

import { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section id="contact" className="section relative overflow-hidden">
      <div className="absolute bottom-0 right-10 w-96 h-96 hero-glow hero-glow-blue opacity-20" style={{ filter: 'blur(100px)' }}></div>
      <div className="absolute top-10 left-0 w-80 h-80 hero-glow hero-glow-gold opacity-20" style={{ filter: 'blur(100px)' }}></div>

      <div className="container mx-auto relative z-10 max-w-4xl">
        <div className="text-center mb-16 fade-in-down">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">Ready to elevate your business? Let&apos;s talk</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact info */}
          <div className="space-y-8 fade-in-left">
            {[
              { icon: '📧', title: 'Email', value: 'hello@elitemarketing.com' },
              { icon: '📱', title: 'Phone', value: '+1 (555) 123-4567' },
              { icon: '📍', title: 'Address', value: '123 Business Ave, Suite 500, NY' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="scroll-fade group"
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <div className="flex gap-4 items-start group-hover:translate-x-2 transition-transform">
                  <div className="text-4xl mt-2">{item.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-gray-400">{item.value}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Social links */}
            <div className="pt-8 flex gap-6">
              {['LinkedIn', 'Twitter', 'Instagram', 'Facebook'].map((social, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-12 h-12 rounded-full bg-yellow-600/20 border border-yellow-600/50 flex items-center justify-center hover:bg-yellow-600/40 hover:border-yellow-500 transition-all group"
                >
                  <span className="group-hover:scale-125 transition-transform">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <form onSubmit={handleSubmit} className="space-y-6 fade-in-right">
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full px-6 py-4 rounded-lg bg-yellow-600/10 border border-yellow-600/30 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:bg-yellow-600/20 transition-all duration-300"
              />
            </div>

            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="w-full px-6 py-4 rounded-lg bg-yellow-600/10 border border-yellow-600/30 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:bg-yellow-600/20 transition-all duration-300"
              />
            </div>

            <div className="relative">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your Phone"
                className="w-full px-6 py-4 rounded-lg bg-yellow-600/10 border border-yellow-600/30 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:bg-yellow-600/20 transition-all duration-300"
              />
            </div>

            <div className="relative">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
                rows={5}
                className="w-full px-6 py-4 rounded-lg bg-yellow-600/10 border border-yellow-600/30 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:bg-yellow-600/20 transition-all duration-300 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full btn-premium group relative"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Send Message
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
            </button>

            {submitted && (
              <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-center font-semibold animate-pulse">
                Message sent successfully! We&apos;ll be in touch soon.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
