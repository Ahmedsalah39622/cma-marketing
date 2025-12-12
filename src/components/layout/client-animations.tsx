'use client';

import dynamic from 'next/dynamic';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

// Dynamically import animation components - only load on desktop
const SmoothScroll = dynamic(() => import("@/components/animations/SmoothScroll"), {
  ssr: false,
  loading: () => null,
});

const AnimatedCursor = dynamic(() => import('@/components/animations/AnimatedCursor'), {
  ssr: false,
  loading: () => null,
});

export function ClientAnimations({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AnimatedCursor />
      <SmoothScroll>
        {children}
        <Analytics />
        <SpeedInsights />
      </SmoothScroll>
    </>
  );
}
