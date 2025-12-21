'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Trophy, Users, Star, Code, Globe } from 'lucide-react';

const achievements = [
  {
    year: 2024,
    title: "Company Founded",
    description: "Started with a vision to transform digital solutions",
    icon: Trophy,
    metric: { value: 5, label: "Team Members" }
  },
  {
    year: 2024,
    title: "First Enterprise Client",
    description: "Launched our first major enterprise solution",
    icon: Star,
    metric: { value: 15, label: "Projects Delivered" }
  },
  {
    year: 2025,
    title: "Global Expansion",
    description: "Opened offices in three new countries",
    icon: Globe,
    metric: { value: 7, label: "Team Members" }
  },
  {
    year: 2025,
    title: "Technology Innovation",
    description: "Launched our proprietary cloud platform",
    icon: Code,
    metric: { value: 53, label: "Clients Worldwide" }
  },

];

type CounterProps = {
  end: number;
  duration?: number;
};

const Counter = ({ end, duration = 2000 }: CounterProps) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.5 }
    );

    const refCurrent = countRef.current;
    if (refCurrent) {
      observer.observe(refCurrent);
    }

    return () => {
      if (refCurrent) {
        observer.unobserve(refCurrent);
      }
    };
  }, []);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | undefined;
    let animationFrame: number | undefined;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, isInView]);

  return <span ref={countRef}>{count}</span>;
};

export default function AchievementTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-24 bg- relative overflow-hidden" ref={containerRef}>
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent opacity-40" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Our Journey</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Milestones that define our growth
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10" />
          <motion.div
            className="absolute left-1/2 top-0 w-px bg-primary"
            style={{ height: lineHeight }}
          />

          <div className="space-y-24">
            {achievements.map((achievement, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={`${achievement.year}-${index}`}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className={`flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className={`w-1/2 ${isEven ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 
                                  hover:bg-white/10 transition-colors">
                      <span className="text-primary font-bold text-xl mb-2 block">
                        {achievement.year}
                      </span>
                      <h3 className="text-xl font-semibold mb-2">{achievement.title}</h3>
                      <p className="text-gray-400 mb-4">{achievement.description}</p>
                      <div className="flex items-center gap-2 text-2xl font-bold text-primary">
                        <Counter end={achievement.metric.value} />
                        <span className="text-sm text-gray-400 font-normal">
                          {achievement.metric.label}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="relative">
                    <motion.div
                      className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <achievement.icon className="w-6 h-6 text-primary" />
                    </motion.div>
                  </div>

                  {/* Empty space for the other side */}
                  <div className="w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}