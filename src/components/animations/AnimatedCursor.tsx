'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useMediaQuery } from '@/lib/hooks/use-media-query';

export default function AnimatedCursor() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Only show cursor on desktop after mount
    if (!isDesktop || !isMounted) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, [isDesktop, isMounted]);

  // Don't render on mobile
  if (!isDesktop || !isMounted) return null;

  return (
    <>
      <motion.div
        className="fixed pointer-events-none z-50"
        animate={{ x: mousePosition.x - 4, y: mousePosition.y - 4 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        <div className="w-2 h-2 bg-primary rounded-full" />
      </motion.div>
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-difference"
        animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
        transition={{ type: "spring", damping: 18, stiffness: 200 }}
      >
        <div className="w-8 h-8 border border-primary rounded-full opacity-50" />
      </motion.div>
    </>
  );
}