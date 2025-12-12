


'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { title: 'About', href: '/about' },
  { title: 'Services', href: '/services' },
  { title: 'Solutions', href: '/solutions' },
 // { title: 'Case Studies', href: '/case-studies' },//
  { title: 'Technology', href: '/technology' },
  //{ title: 'Contact', href: '/contact' },
];



export default function MainNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, []);

  // Handle scroll direction detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);


  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: isVisible || isMenuOpen ? 0 : -100 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent sm:backdrop-blur-md"
    >
  <div className="container mx-auto px-4 md:px-6 lg:px-8">
  <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative z-50"
          >
            <Link href="/" className="flex items-center space-x-2 md:space-x-3">
              <Image
                src="/b5e28d61-f2d1-469f-884d-f623c1498887-removebg-preview.png"
                alt="Novix Logo"
                width={280}
                height={100}
                className="object-contain w-[180px] h-[60px] md:w-[260px] md:h-[90px]"
              />
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden z-50 text-white p-2"
            title={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Mobile Menu */}
          <motion.div
            initial={false}
            animate={{
              opacity: isMenuOpen ? 1 : 0,
              y: isMenuOpen ? 0 : -20
            }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`fixed left-0 right-0 top-0 h-screen bg-gradient-to-b from-black/95 to-black/90 sm:backdrop-blur-lg md:hidden ${
              isMenuOpen ? 'flex' : 'hidden'
            } flex-col items-center justify-start gap-3 z-[100] pt-16 pb-8 px-4 overflow-y-auto`}
          >
            {/* Keep logo and close button always visible at the top */}
            <div className="absolute top-0 left-0 w-full flex items-center justify-between px-4 h-16 bg-transparent z-[101] pointer-events-none">
              <Link href="/" className="flex items-center space-x-2 pointer-events-auto">
                <Image
                  src="/b5e28d61-f2d1-469f-884d-f623c1498887-removebg-preview.png"
                  alt="Novix Logo"
                  width={120}
                  height={40}
                  className="object-contain"
                />
              </Link>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-white p-2 pointer-events-auto"
                title="Close menu"
                aria-label="Close menu"
              >
                <X size={28} />
              </button>
            </div>
            <div className="w-12 h-1 bg-primary/20 mx-auto rounded-full mb-4 mt-16" />
            {navLinks.map((link) => (
              <motion.div
                key={link.title}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full max-w-xs mx-auto"
              >
                <Link
                  href={link.href}
                                  className="block text-center text-sm py-2.5 px-4 rounded-lg bg-white/5 hover:bg-white/10 active:bg-white/15 transition-colors text-white/90 hover:text-white font-medium backdrop-blur-sm"
                  onClick={() => setIsMenuOpen(false)}
                  title={link.title}
                >
                  {link.title}
                </Link>
              </motion.div>
            ))}
            <Link href="/contact">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6"
              >
                <Button 
                  className="w-full max-w-[240px] mx-auto py-2.5 text-sm font-medium bg-white/10 hover:bg-white/20 active:bg-white/25 text-white backdrop-blur-sm transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                  title="Contact Now"
                  aria-label="Contact Now"
                >
                  Contact Now
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center md:space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <motion.div
                key={link.title}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <Link
                  href={link.href}
                  className="px-3 md:px-4 py-2 text-sm lg:text-base transition-colors rounded-md text-white/90 hover:text-white font-medium"
                  title={link.title}
                >
                  {link.title}
                  <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-1/2 group-hover:left-1/4" />
                </Link>
              </motion.div>
            ))}
            <Link href="/contact">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-2"
              >
                <Button
                  variant="outline"
                  className="border-white/20 text-white transition-all duration-300 hover:bg-white/10 px-4 py-2 text-xs md:text-sm lg:text-base"
                  title="Contact Now"
                  aria-label="Contact Now"
                >
                  Contact Now
                </Button>
              </motion.div>
            </Link>
          </div>
        </nav>
      </div>
    </motion.header>
  );
}