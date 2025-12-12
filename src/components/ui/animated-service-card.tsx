'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface AnimatedServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  tech: string[];
  index: number;
}

export function AnimatedServiceCard({ title, description, icon: Icon, tech, index }: AnimatedServiceCardProps) {
  // Calculate puzzle piece connector positions based on index
  const hasPuzzleLeft = index % 4 !== 0;
  const hasPuzzleRight = (index + 1) % 4 !== 0;
  const hasPuzzleTop = index >= 4;
  const hasPuzzleBottom = index < 4;

  return (
    <motion.div
      className="relative bg-white rounded-lg p-6 shadow-lg overflow-hidden group"
      initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
      whileInView={{
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: {
          type: "spring",
          damping: 12,
          stiffness: 100,
          delay: index * 0.1
        }
      }}
      whileHover={{
        scale: 1.05,
        rotate: 2,
        transition: { type: "spring", damping: 10 }
      }}
      viewport={{ once: true }}
    >
      {/* Puzzle connectors */}
      {hasPuzzleLeft && (
        <motion.div
          className="absolute left-0 top-1/2 w-3 h-8 -ml-3 bg-primary/20 rounded-l-full"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: index * 0.1 + 0.2 }}
        />
      )}
      {hasPuzzleRight && (
        <motion.div
          className="absolute right-0 top-1/2 w-3 h-8 -mr-3 bg-primary/20 rounded-r-full"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: index * 0.1 + 0.2 }}
        />
      )}
      {hasPuzzleTop && (
        <motion.div
          className="absolute top-0 left-1/2 h-3 w-8 -mt-3 bg-primary/20 rounded-t-full"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          transition={{ delay: index * 0.1 + 0.2 }}
        />
      )}
      {hasPuzzleBottom && (
        <motion.div
          className="absolute bottom-0 left-1/2 h-3 w-8 -mb-3 bg-primary/20 rounded-b-full"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          transition={{ delay: index * 0.1 + 0.2 }}
        />
      )}

      {/* Glowing background effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: index * 0.1 }}
      />

      {/* Icon with floating animation */}
      <motion.div
        className="relative mb-4 text-black"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <Icon className="w-10 h-10" />
      </motion.div>

      {/* Content */}
      <motion.h3
        className="text-xl font-bold mb-2 text-black"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 + 0.1 }}
      >
        {title}
      </motion.h3>

      <motion.p
        className="text-black/70 mb-4"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 + 0.2 }}
      >
        {description}
      </motion.p>

      {/* Tech tags with stagger animation */}
      <div className="flex flex-wrap gap-2">
        {tech.map((item, i) => (
          <motion.span
            key={item}
            className="px-2 py-1 text-sm bg-black/10 rounded-full text-black"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              delay: index * 0.1 + 0.3 + i * 0.1,
              type: "spring",
              damping: 10
            }}
          >
            {item}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}