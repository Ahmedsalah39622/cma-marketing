// work-showcase-section.tsx
'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export type WorkVideo = {
  client: string;
  videoUrl: string;
  title?: string;
  thumbnailUrl?: string;
};

export interface WorkShowcaseSectionProps {
  works: WorkVideo[];
}

export default function WorkShowcaseSection({ works }: WorkShowcaseSectionProps) {
  const { language } = useLanguage();
  // Group by client
  const grouped = works.reduce<Record<string, WorkVideo[]>>((acc, w) => {
    acc[w.client] = acc[w.client] || [];
    acc[w.client].push(w);
    return acc;
  }, {});

  return (
    <section dir={language === 'ar' ? 'rtl' : 'ltr'} className="py-16 px-4 bg--50">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold mb-8 text-center">{language === 'ar' ? 'بعض من أعمالنا' : 'Our Work'}</h2>
        <div className="space-y-10">
          {Object.entries(grouped).map(([client, videos], i) => (
            <div key={client}>
              <h3 className="text-xl font-bold mb-4 text-center">{client}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {videos.map((v, j) => (
                  <motion.div
                    key={v.videoUrl}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: j * 0.07, type: 'spring', stiffness: 120 }}
                    className="bg-white rounded-xl shadow p-3 flex flex-col items-center hover:scale-105 transition"
                  >
                    <div className="w-full aspect-video mb-2">
                      <iframe
                        src={v.videoUrl}
                        title={v.title || v.client}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-48 rounded"
                      />
                    </div>
                    <div className="font-semibold text-center">{language === 'ar' ? ((v as any).title_ar || v.title) : (v.title || v.videoUrl)}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
