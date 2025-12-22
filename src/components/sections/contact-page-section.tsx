// contact-page-section.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';


type ContactCard = { icon?: string; title?: string; details?: string[]; description?: string };
interface ContactPageSectionProps {
  services?: string[];
  whatsapp?: string;
  title?: string;
  description?: string;
  cards?: ContactCard[];
}


import { Phone, Mail, MapPin } from 'lucide-react';
const ICONS: Record<string, React.ComponentType<{ className?: string }>> = { Phone, Mail, MapPin };

export default function ContactPageSection({ services, whatsapp, title, description, cards }: ContactPageSectionProps) {
  const formSectionRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');
    setErrorMessage('');
    try {
      const response = await fetch('https://flow.sokt.io/func/scri1dUzNJTg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to send message');
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', serviceType: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message. Please try again.');
      console.error('Form submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const scrollToForm = searchParams && searchParams.get('scroll') === 'form';
    if (scrollToForm && formSectionRef.current) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      setTimeout(() => {
        const el = formSectionRef.current!;
        const headerOffset = 96;
        const elementTop = el.getBoundingClientRect().top + window.scrollY;
        const scrollTarget = Math.max(elementTop - headerOffset, 0);
        window.scrollTo({ top: scrollTarget, left: 0, behavior: 'smooth' });
      }, 120);
    }
  }, [searchParams]);

  const contactInfo = Array.isArray(cards) && cards.length > 0
    ? cards.map(card => ({
        ...card,
        iconName: card.icon || '',
      }))
    : [
        { iconName: 'Phone', title: 'Phone', details: ['+20 1113146750'], description: 'Sun-Thurs from 8am to 6pm.' },
        { iconName: 'Mail', title: 'Email', details: ['novix.its.co@gmail.com'], description: 'Online support 24/7' },
        { iconName: 'MapPin', title: 'Office', details: ['Helmiet El-Zaitoun, Cairo, Egypt'], description: 'Contact with us' }
      ];

  return (
    <div className="min-h-screen bg- text-white pt-32 pb-20">
      <section className="relative mb-20">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-gradient-to-b from-primary/20 via-secondary/10 to-transparent opacity-30 blur-3xl" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">{title || 'Get in Touch'}</h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">{description || `Have a project in mind? Let's discuss how we can help bring your ideas to life.`}</p>
          </motion.div>
        </div>
      </section>
      <section className="relative px-4 mb-20">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => {
              const Icon = ICONS[info.iconName] || Phone;
              return (
                <motion.div key={info.title + index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} whileHover={{ scale: 1.02 }} className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{info.title}</h3>
                  </div>
                  {(info.details || []).map((detail, i) => (<p key={i} className="text-gray-300 mb-1">{detail}</p>))}
                  <p className="text-gray-400 text-sm mt-2">{info.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="relative px-4" ref={formSectionRef}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-gradient-to-t from-primary/10 via-secondary/5 to-transparent opacity-30 blur-3xl" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                {status === 'success' && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-300">✓ Message sent successfully! We&apos;ll get back to you soon.</motion.div>
                )}
                {status === 'error' && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300">✕ {errorMessage}</motion.div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Name" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Your Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="email@example.com" required />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">Phone (optional)</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="+20 123 456 789" />
                  </div>
                  <div>
                    <label htmlFor="serviceType" className="block text-sm font-medium text-gray-300 mb-2">Service Type (optional)</label>
                    <select id="serviceType" name="serviceType" value={formData.serviceType} onChange={handleChange} className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none cursor-pointer">
                      <option value="" style={{ backgroundColor: '#1f2937', color: '#9ca3af' }}>-- Select a service --</option>
                      {(services || [
                        'Web Development',
                        'Cloud Migration',
                        'Consulting',
                        'Maintenance & Support',
                        'Custom Solution',
                        'Other',
                      ]).map((service) => (
                        <option key={service} value={service} style={{ backgroundColor: '#1f2937', color: '#ffffff' }}>{service}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                  <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Project Discussion" required />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={6} className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" placeholder="Tell us about your project..." required />
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                    {loading ? 'Sending...' : 'Send Message'}
                    <Send className="w-4 h-4" />
                  </Button>
                </motion.div>
              </motion.form>
            </div>
            <div className="lg:col-span-1">
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="bg-green-500/10 backdrop-blur-xl rounded-2xl p-8 border border-green-500/30 h-full flex flex-col justify-center items-center text-center">
                <div className="mb-6 p-4 bg-green-500/20 rounded-full">
                  <svg className="w-12 h-12 text-green-400" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.781 1.159l-.336-.168c-1.126-.561-1.335-1.623-.715-2.524.61-.9 1.638-1.512 2.568-1.41.93.101 5.228 1.247 5.228 1.247s-1.096-3.215-.549-4.573c.547-1.359 2.517-.369 2.978 1.129.46 1.498-.528 4.209-1.915 5.352-1.387 1.143-3.095 1.779-4.788 1.114a9.87 9.87 0 01-.215-.112z" /></svg>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">Quick Chat on WhatsApp</h3>
                <p className="text-gray-300 mb-6 text-sm">Get instant responses from our team. Available 24/7 for your inquiries.</p>
                <a href={`https://wa.me/${whatsapp || '201113146750'}?text=مرحبا، أود الاستفسار عن خدماتكم`} target="_blank" rel="noopener noreferrer" className="w-full px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.781 1.159l-.336-.168c-1.126-.561-1.335-1.623-.715-2.524.61-.9 1.638-1.512 2.568-1.41.93.101 5.228 1.247 5.228 1.247s-1.096-3.215-.549-4.573c.547-1.359 2.517-.369 2.978 1.129.46 1.498-.528 4.209-1.915 5.352-1.387 1.143-3.095 1.779-4.788 1.114a9.87 9.87 0 01-.215-.112z" /></svg>
                  Start WhatsApp Chat
                </a>
                <p className="text-xs text-gray-400 mt-4">No registration needed. Direct chat with our team.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
