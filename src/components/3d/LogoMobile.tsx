'use client'

import Image from 'next/image';
import { motion } from 'framer-motion';

export function LogoMobile() {
  return (
    <div className="relative w-full aspect-square max-w-[280px] mx-auto">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-2xl" />
      <motion.div 
        className="relative w-full h-full flex items-center justify-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Image
          src="/hex-logo.png"
          alt="Novix Logo"
          width={200}
          height={200}
          className="w-4/5 h-auto drop-shadow-lg"
          priority
        />
      </motion.div>
    </div>
  );
}