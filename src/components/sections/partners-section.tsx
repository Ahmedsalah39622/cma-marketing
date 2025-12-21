// partners-section.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export type Partner = {
  name: string;
  logoUrl?: string;
  socials: { platform: string; url: string }[];
};

export interface PartnersSectionProps {
  partners: Partner[];
}

const platformIcons: Record<string, React.ReactNode> = {
  instagram: <span className="text-pink-500">IG</span>,
  facebook: <span className="text-blue-600">FB</span>,
  tiktok: <span className="text-black">TT</span>,
  youtube: <span className="text-red-600">YT</span>,
};

export default function PartnersSection({ partners }: PartnersSectionProps) {
  return (
    <section className="py-16 px-4 bg-">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold mb-8 text-center">شركاؤنا</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, type: 'spring', stiffness: 120 }}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition"
            >
              {partner.logoUrl && (
                <img src={partner.logoUrl} alt={partner.name} className="w-16 h-16 object-contain mb-3" />
              )}
              <div className="font-bold text-lg mb-2 text-center">{partner.name}</div>
              <div className="flex gap-2 mt-2">
                {partner.socials.map((s, idx) => (
                  <Link key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="text-xl">
                    {platformIcons[s.platform] || s.platform}
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
