// SocialLinksSection.tsx
'use client';

import { motion } from 'framer-motion';
import { FaTiktok, FaInstagram, FaYoutube, FaFacebook } from 'react-icons/fa';
import Link from 'next/link';

export type SocialLink = {
  name?: string;
  url: string;
  platform: 'tiktok' | 'instagram' | 'youtube' | 'facebook';
  type?: 'influencer' | 'company' | 'managed' | 'client';
};

export interface SocialLinksSectionProps {
  title: string;
  links: SocialLink[];
  admin?: boolean;
  onManage?: () => void;
}

const platformIcons = {
  tiktok: FaTiktok,
  instagram: FaInstagram,
  youtube: FaYoutube,
  facebook: FaFacebook,
};

export default function SocialLinksSection({ title, links, admin, onManage }: SocialLinksSectionProps) {
  return (
    <section className="py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="container mx-auto max-w-5xl"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold animate-pulse">{title}</h2>
          {admin && (
            <button
              onClick={onManage}
              className="bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-primary/80 transition"
            >
              إدارة
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {links.map((link, i) => {
            const Icon = platformIcons[link.platform];
            return (
              <motion.div
                key={link.url}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.07, type: 'spring', stiffness: 120 }}
                className="bg-white/10 rounded-xl p-4 flex flex-col items-center shadow-lg hover:scale-105 hover:shadow-2xl transition cursor-pointer group"
              >
                <Link href={link.url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 w-full">
                  <Icon className="text-4xl mb-2 group-hover:scale-125 transition-transform" />
                  <span className="text-base font-semibold text-center break-all">
                    {link.name || link.url.replace(/^https?:\/\//, '').split(/[/?#]/)[0]}
                  </span>
                  <span className="text-xs text-gray-400 mt-1 capitalize">{link.platform}</span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
