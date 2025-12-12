'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function CurvedDivider() {
  return (
    <div className="relative w-full h-[300px] overflow-hidden -mt-40 -mb-40 pointer-events-none">
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative w-full h-full"
      >
        <Image
          src="/ChatGPT_Image_Sep_23__2025__02_17_10_PM-removebg-preview.png"
          alt="Section divider"
          fill
          className="object-cover scale-[2.5] translate-y-40"
          priority
        />
      </motion.div>
    </div>
  );
}