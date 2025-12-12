'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function CurvedBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden -z-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative w-full h-full"
      >
        <Image
          src="/ChatGPT_Image_Sep_23__2025__02_17_10_PM-removebg-preview.png"
          alt="Background curve"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black pointer-events-none" />
      </motion.div>
    </div>
  );
}