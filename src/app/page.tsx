
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



import PartnersSection from '@/components/sections/partners-section';
import { partners } from '@/components/sections/partners-data';
import WorkShowcaseSection from '@/components/sections/work-showcase-section';
import { works } from '@/components/sections/work-showcase-data';



export default function Home() {
  const router = useRouter();
  const [content, setContent] = useState(null);

  useEffect(() => {
    getHomePageContent().then(setContent);
  }, []);

  if (!content) return null;

  return (
    <main className="flex flex-col min-h-screen w-screen overflow-x-hidden">
      <div className="w-full">
        <HeroSection content={content.hero} />
        {/* <AnimatedStatsSlider content={content.stats} /> */}
        <ServicesSection content={content.services} />
        <ProcessSection content={content.process} />
        <TestimonialsSection content={content.testimonials} />
        <CtaSection content={content.cta} />

        {/* Partners Section */}
        <PartnersSection partners={partners} />

        {/* Some of Our Work Section */}
        <WorkShowcaseSection works={works} />

        {/* Contact Us Section (modern, with backend integration) */}
        <ContactPageSection />
      </div>
    </main>
  );
}
