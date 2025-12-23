// partners-section.tsx (replaced)
'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import styles from './partners-section.module.css';

export type Partner = {
  id?: string;
  name: string;
  logoUrl?: string;
  photoUrl?: string;
  company?: string;
  title?: string;
  description?: string;
  cta?: string;
  saved?: boolean;
  socials?: { platform: string; url: string }[];
  services?: string[];
  color?: string;
};

export default function PartnersSection({ partners }: { partners?: Partner[] }) {
  const { language } = useLanguage();
  const list = (partners && partners.length > 0) ? partners : [
    { id: 'a', name: 'Custom Software Development', company: 'Custom Software Development', title: 'Tailored solutions built from the ground up to meet your specific business needs.', logoUrl: '/img/placeholder.png', cta: 'Learn more', saved: false, color: '#0ea5a4', services: ['Enterprise Software Solutions','Mobile App Development','Web Applications','Integration Services'] },
    { id: 'b', name: 'Cloud Solutions', company: 'Cloud Solutions', title: 'Scalable and secure cloud infrastructure designed for modern businesses.', logoUrl: '/img/placeholder.png', cta: 'Learn more', saved: false, color: '#7c3aed', services: ['Cloud Migration','Cloud-Native Development','Serverless Architecture','Multi-Cloud Strategy'] },
    { id: 'c', name: 'Digital Transformation', company: 'Digital Transformation', title: 'Guide your business into the digital age with comprehensive transformation strategies.', logoUrl: '/img/placeholder.png', cta: 'Learn more', saved: false, color: '#059669', services: ['Process Automation','Legacy System Modernization','Digital Strategy Consulting','Technology Roadmap'] },
    { id: 'd', name: 'UI/UX Design', company: 'UI/UX Design', title: 'Create engaging user experiences that drive adoption and satisfaction.', logoUrl: '/img/placeholder.png', cta: 'Learn more', saved: false, color: '#b45309', services: ['User Interface Design','User Experience Design','Design Systems','Prototyping & Testing'] },
  ];

  return (
    <section dir={language === 'ar' ? 'rtl' : 'ltr'} className={styles.outer} aria-labelledby="partners-heading">
      <div className={styles.background} />

      <div className={styles.wrap}>
        <h2 id="partners-heading" className={styles.heading}>{language === 'ar' ? 'شركاؤنا' : 'Our Partners'}</h2>

        <div className={styles.gridCards}>
          {list.map((p, i) => (
            <motion.article
              key={p.id || `${p.name}-${i}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, type: 'spring', stiffness: 110 }}
              className={styles.cardBox}
              style={{
                ['--accent' as any]: p.color || '#0ea5a4',
                ['--glow' as any]: (p.color ? p.color + '33' : '#0ea5a433'),
              }}
            >
              {/* Card layout: logo, name, socials only */}
              <div className={styles.cardMain}>
                <div className={styles.iconWrap} aria-hidden>
                  {p.logoUrl ? (
                    <img src={p.logoUrl as string} alt={p.name} />
                  ) : (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.4"/></svg>
                  )}
                </div>
                <div className={styles.cardTitle}>{language === 'ar' ? ((p as any).name_ar || p.name) : p.name}</div>
                {((p as any).description_ar || p.description) && (
                  <div className={styles.cardDesc}>{language === 'ar' ? ((p as any).description_ar || p.description) : p.description}</div>
                )}
                <div className={styles.socialRow}>
                  {Array.isArray(p.socials) && p.socials.map((s: any) => (
                    s.url ? (
                      <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className={styles.socialIcon} title={s.platform}>
                        {s.platform === 'instagram' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.4"/></svg>}
                        {s.platform === 'facebook' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 8h-2c-1.1 0-2 .9-2 2v2H9v2h2v6h2v-6h2.5l.5-2H13v-1" stroke="currentColor" strokeWidth="1.4"/></svg>}
                        {s.platform === 'tiktok' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M17 6v6a3 3 0 1 1-3-3" stroke="currentColor" strokeWidth="1.4"/></svg>}
                        {s.platform === 'youtube' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.4"/><polygon points="10,9 16,12 10,15" fill="currentColor"/></svg>}
                      </a>
                    ) : null
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
