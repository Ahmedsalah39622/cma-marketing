'use client'

import Image from 'next/image';
import { motion } from 'framer-motion';

export function MobileHeroImage() {
  return (
    <div className="relative w-full h-full flex items-center justify-center py-4 bg-black">
      {/* Elegant gradient background */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent opacity-30 rounded-[40px] blur-3xl transform rotate-12" />
        <div className="absolute inset-0 bg-gradient-to-tr from-secondary/5 via-primary/5 to-transparent opacity-30 rounded-[40px] blur-3xl transform -rotate-12" />
      </motion.div>

      {/* Simple, elegant logo presentation */}
      <motion.div
        className="relative z-10 flex items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Image
          src="/hex-logo.png"
          alt="Novix"
          width={400}
          height={400}
          className="w-auto h-auto max-w-[400px] drop-shadow-xl"
          priority
        />
      </motion.div>

      {/* Subtle decorative dots */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="absolute top-[20%] left-[20%] w-1 h-1 bg-primary/20 rounded-full blur-[1px]" />
        <div className="absolute top-[30%] right-[25%] w-1.5 h-1.5 bg-secondary/20 rounded-full blur-[1px]" />
        <div className="absolute bottom-[25%] left-[30%] w-1 h-1 bg-secondary/20 rounded-full blur-[1px]" />
        <div className="absolute bottom-[35%] right-[20%] w-1 h-1 bg-primary/20 rounded-full blur-[1px]" />
      </motion.div>
    </div>
  );
}