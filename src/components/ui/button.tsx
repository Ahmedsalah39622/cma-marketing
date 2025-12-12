'use client'

import { cn } from '@/lib/utils'
import { VariantProps, cva } from 'class-variance-authority'
import { motion, MotionProps } from 'framer-motion'
import React from 'react'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-2xl text-base font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]',
  {
    variants: {
      variant: {
        default: 'bg-white/10 text-white hover:bg-white/20 shadow-lg shadow-black/20',
        destructive: 'bg-destructive text-white hover:bg-destructive/90',
        outline: 'border border-[0.5px] border-white/20 text-white hover:bg-white/5 sm:backdrop-blur-sm',
        secondary: 'bg-secondary text-white hover:bg-secondary/80',
        ghost: 'text-white hover:bg-white/5',
        link: 'underline-offset-4 hover:underline text-primary',
      },
      size: {
        default: 'h-12 py-3 px-8',
        sm: 'h-10 px-6 rounded-xl text-sm',
        lg: 'h-14 px-10 rounded-2xl text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

type ButtonProps =
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> &
  Omit<MotionProps, 'children'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    children?: React.ReactNode;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <motion.button
        whileHover={{ scale: 1.02, translateY: -2 }}
        whileTap={{ scale: 0.98, translateY: 1 }}
        transition={{ duration: 0.2 }}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {...(props as any)}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }