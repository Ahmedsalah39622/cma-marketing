'use client'

import Image from 'next/image';
import { motion } from 'framer-motion';

export function MobileLogoCard() {
  return (
    <div className="relative w-full h-full flex items-center justify-center py-8 bg-black">
      {/* Background gradients */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent opacity-30 rounded-[40px] blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-tr from-secondary/10 via-primary/5 to-transparent opacity-30 rounded-[40px] blur-3xl" />
      </motion.div>

      {/* Logo with glass effect */}
      <motion.div
        className="relative z-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="glass-card card-hover p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-blue-400/5 opacity-25 rounded-xl" />
          <Image
            src="/novix-logo.png"
            alt="Novix"
            width={160}
            height={160}
            className="w-auto h-auto max-w-[160px] drop-shadow-xl relative z-10"
            priority
          />
        </div>
      </motion.div>

      {/* Decorative elements */}
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