'use client';

import { motion } from 'framer-motion';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, ArrowUpCircle } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getHomePageContent } from '@/lib/content';
import Head from 'next/head';

export default function SuperFooter() {
  const [content, setContent] = useState<any>(null);
  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const data = await getHomePageContent();
        if (!mounted) return;
        // normalize: some saved content may be under root or under .footer
        const normalized = data?.footer ? data.footer : data;
        setContent(normalized || null);
      } catch (e) {
        // ignore
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  // ensure FontAwesome stylesheet is available so admin-selected icon classes render
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const href = '/adminlte/plugins/fontawesome-free/css/all.min.css';
    if (document.querySelector(`link[href="${href}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
    return () => { /* keep stylesheet for app lifetime */ };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // fallbacks and compatibility mapping for structured admin content
  const company = content?.companyName || 'Novix';
  const description = content?.description || 'Transforming businesses through innovative technology solutions. Your trusted partner in digital evolution.';

  // socials: accept legacy `socials` (array of {label, href}) or new `socialsStructured` (name, icon, link)
  const socialsRaw = content?.socialsStructured ?? content?.socials;
  const socials = Array.isArray(socialsRaw) ? socialsRaw.map((s: any) => {
    // map to { label, href, icon? }
    if (s?.link || s?.href) return { label: s?.name || s?.label, href: s?.link || s?.href, icon: s?.icon };
    // fallback if simple strings
    if (typeof s === 'string') return { label: s, href: '#' };
    return { label: s?.label || s?.name || 'Social', href: s?.href || s?.link || '#' };
  }) : [
    { label: 'Facebook', href: '#' },
    { label: 'Twitter', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'Instagram', href: '#' },
  ];

  // quickLinks: accept new shape {name,path} or old {text,href}
  const quickLinksRaw = content?.quickLinks;
  const quickLinks = Array.isArray(quickLinksRaw) ? quickLinksRaw.map((q: any) => ({ text: q?.text || q?.name || q?.label || '', href: q?.href || q?.path || q?.to || '/' })) : [
    { text: 'About Us', href: '/about' },
    { text: 'Services', href: '/services' },
    { text: 'Testimonials', href: '/testimonials' },
    { text: 'Contact', href: '/contact' },
  ];
  const defaultServices = [
    'ERP Solutions',
    'System Administration',
    'Web Development',
    'Cloud Solutions',
    'Security Services',
  ];
  const servicesRaw = content?.services ?? defaultServices;
  const services = Array.isArray(servicesRaw) ? servicesRaw : defaultServices;
  // contact: new shape { email, phones: [], location }
  const contactRaw = content?.contact || {};
  const contact = {
    email: contactRaw?.email || 'novix.its.co@gmail.com',
    // prefer first phone if phones array exists, else try legacy phone field
    phone: Array.isArray(contactRaw?.phones) ? (contactRaw.phones[0] || '') : (contactRaw?.phone || ''),
    // address may be stored in footer.address or contact.location/address
    address: contactRaw?.location || contactRaw?.address || content?.address || 'Helmiet El-Zaitoun, Cairo, Egypt',
  };
  const copyright = content?.copyright || `© ${new Date().getFullYear()} ${company}. All rights reserved.`;

  // minimal animated background (kept light)
  const bgShapes = Array.from({ length: 6 }, (_, i) => ({
    w: 80 + (i * 37) % 140,
    h: 80 + (i * 53) % 140,
    l: (i * 19) % 100,
    t: (i * 23) % 100,
    d: 8 + (i % 4),
    delay: (i % 6) * 0.2,
  }));

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
        {bgShapes.map((shape, i) => (
          <motion.div
            key={i}
            className="absolute bg-secondary/40 rounded-full"
            style={{
              width: `${shape.w}px`,
              height: `${shape.h}px`,
              left: `${shape.l}%`,
              top: `${shape.t}%`,
              backgroundColor: 'rgba(212, 175, 55, 0.14)',
            }}
            animate={{ y: [0, -12, 0], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: shape.d, repeat: Infinity, ease: 'easeInOut', delay: shape.delay }}
          />
        ))}
      </div>

      <div className="relative container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl font-bold mb-6">{company}</h2>
            <p className="text-gray-300 mb-6">{description}</p>
            <div className="flex space-x-4">
              {socials.map((s: any) => {
                const defaultIconMap: Record<string, string> = {
                  Facebook: 'fab fa-facebook-f',
                  Twitter: 'fab fa-twitter',
                  LinkedIn: 'fab fa-linkedin-in',
                  Instagram: 'fab fa-instagram',
                };
                const iconClass = s.icon || defaultIconMap[s.label] || 'fas fa-share-alt';
                return (
                  <motion.a key={s.label || s} href={s.href || '#'} whileHover={{ scale: 1.08 }} className="text-white/80 hover:text-white transition-colors flex items-center">
                    <span className="sr-only">{s.label || s}</span>
                    <i className={`${iconClass} text-lg`} aria-hidden />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((ql: any, index: number) => (
                <motion.li key={ql.text || index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.06 + 0.1 }}>
                  <Link href={ql.href || '/'} className="text-gray-300 hover:text-white hover:translate-x-2 transition-all flex items-center">
                    <span className="mr-2">→</span>
                    {ql.text}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
            <h3 className="text-xl font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service: any, index: number) => (
                <motion.li key={service} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.06 + 0.1 }} className="text-gray-300 flex items-center">
                  <span className="mr-2 text-primary">•</span>
                  {service}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }} className="space-y-4">
            <h3 className="text-xl font-semibold mb-6">Contact Us</h3>
            <motion.div whileHover={{ scale: 1.03 }} className="flex items-center text-gray-300">
              <Mail className="mr-3" size={18} />
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} className="flex items-center text-gray-300">
              <Phone className="mr-3" size={18} />
              <a href={`tel:${contact.phone}`}>{contact.phone}</a>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} className="flex items-center text-gray-300">
              <MapPin className="mr-3" size={18} />
              <p>{contact.address}</p>
            </motion.div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.8 }} className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">{copyright}</p>
          <motion.button onClick={scrollToTop} whileHover={{ scale: 1.05, y: -4 }} whileTap={{ scale: 0.95 }} className="mt-4 md:mt-0 text-white/80 hover:text-white transition-colors flex items-center" aria-label="Back to top" title="Back to top">
            <ArrowUpCircle className="mr-2" size={20} />
            Back to top
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
}