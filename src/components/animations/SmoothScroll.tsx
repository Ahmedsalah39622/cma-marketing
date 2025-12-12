'use client';

import Lenis from 'lenis';
import { useEffect, useState } from 'react';
import { useMediaQuery } from '@/lib/hooks/use-media-query';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Only initialize Lenis on desktop after mount
    if (!isDesktop || !isMounted) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isDesktop, isMounted]);

  return <>{children}</>;
}