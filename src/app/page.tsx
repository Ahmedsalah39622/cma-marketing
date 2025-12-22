
"use client";

import ContactPageSection from '@/components/sections/contact-page-section';

import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { getHomePageContent } from "@/lib/content";
import HeroSection from '@/components/sections/hero-section';
import ServicesSection from '@/components/sections/services-section';
import AnimatedStatsSlider from '@/components/sections/animated-stats-slider';
import CtaSection from '@/components/sections/cta-section';
import ProcessSection from '@/components/sections/process-section';
import dynamic from 'next/dynamic';
const TestimonialsSection = dynamic(() => import('@/components/sections/testimonials-section'), { ssr: false });

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import styles from './page.module.css';




import PartnersSection from '@/components/sections/partners-section';
import WorkShowcaseSection from '@/components/sections/work-showcase-section';




type HomeContent = {
  hero?: any;
  services?: any;
  process?: any;
  testimonials?: any;
  cta?: any;
  partners?: any;
  workShowcase?: any;
  getInTouch?: any;
  [key: string]: any;
};

export default function Home() {
  const router = useRouter();
  const [content, setContent] = useState<HomeContent | null>(null);

  useEffect(() => {
    getHomePageContent().then(setContent);
  }, []);

  if (!content) return null;

  return (
    <main className={styles.mainContainer}>
      <div className={styles.contentWrapper}>
        <HeroSection content={content.hero} />
        {/* <AnimatedStatsSlider content={content.stats} /> */}
        <ServicesSection content={content.services} />
        <ProcessSection content={content.process} />
        <TestimonialsSection content={content.testimonials} />
        <CtaSection content={content.cta} />


        {/* Partners Section (dynamic) */}
        {content.partners && <PartnersSection partners={content.partners} />}

        {/* Some of Our Work Section (dynamic) */}
        {content.workShowcase && <WorkShowcaseSection works={content.workShowcase} />}

        {/* Contact Us Section (modern, with backend integration) */}
        <ContactPageSection
          services={content.getInTouch?.services}
          whatsapp={content.getInTouch?.whatsapp}
          title={content.getInTouch?.title}
          description={content.getInTouch?.description}
          cards={content.getInTouch?.cards}
        />
      </div>
    </main>
  );
}
