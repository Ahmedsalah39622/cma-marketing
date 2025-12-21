'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function ContactSection() {
  return (
    <section className="relative py-16 sm:py-24 bg-white" id="contact">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto relative"
        >
          <div className="text-center mb-8 sm:mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              id="contact-form-title" 
              className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
            >
              تواصل معنا
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-lg sm:text-xl text-gray-600 mb-4"
            >
              يمكنك التواصل معنا مباشرة عبر البريد الإلكتروني أو الواتساب، أو استخدام النموذج أدناه.
            </motion.p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
              <motion.a
                href="mailto:info@cma-marketing.com"
                className="text-lg font-semibold text-blue-600 hover:underline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                info@cma-marketing.com
              </motion.a>
              <motion.a
                href="https://wa.me/201113146750?text=مرحبا، أود الاستفسار عن خدماتكم"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg text-lg font-semibold shadow hover:bg-green-700 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A12 12 0 0 0 3.48 20.52l-1.32 4.8a1 1 0 0 0 1.24 1.24l4.8-1.32A12 12 0 1 0 20.52 3.48ZM12 22a10 10 0 1 1 10-10 10 10 0 0 1-10 10Zm5.2-7.6c-.28-.14-1.65-.81-1.9-.9s-.44-.14-.62.14-.71.9-.87 1.08-.32.21-.6.07a8.18 8.18 0 0 1-2.4-1.48 9.06 9.06 0 0 1-1.68-2.08c-.18-.31 0-.48.13-.62.13-.13.28-.34.42-.51a2.13 2.13 0 0 0 .28-.47.56.56 0 0 0 0-.54c-.07-.14-.62-1.5-.85-2.06-.22-.54-.45-.47-.62-.48h-.53a1 1 0 0 0-.72.34 3 3 0 0 0-.94 2.23c0 1.31.95 2.58 1.08 2.76s1.87 3 4.54 4.09a6.13 6.13 0 0 0 2.84.54 2.6 2.6 0 0 0 1.7-.7 2.13 2.13 0 0 0 .47-.72c.07-.14.07-.27 0-.41s-.25-.17-.53-.31Z"/></svg>
                تواصل عبر واتساب
              </motion.a>
            </div>
          </div>
          
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
            aria-labelledby="contact-form-title"
            role="form"
          >
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <div className="relative">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="w-full px-4 py-3 sm:py-2 border border-gray-300 rounded-xl bg-white/50 sm:backdrop-blur-sm focus:ring-2 focus:ring-primary focus:border-primary/50 transition-all duration-200 shadow-sm text-base"
                  placeholder="Your name"
                  aria-label="Your name"
                  title="Your name"
                  autoComplete="name"
                />
              </div>
              <div className="relative">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="w-full px-4 py-3 sm:py-2 border border-gray-300 rounded-xl bg-white/50 sm:backdrop-blur-sm focus:ring-2 focus:ring-primary focus:border-primary/50 transition-all duration-200 shadow-sm text-base"
                  placeholder="your@email.com"
                  aria-label="Your email address"
                  title="Your email address"
                  autoComplete="email"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white/50 sm:backdrop-blur-sm focus:ring-2 focus:ring-primary focus:border-primary/50 transition-all duration-200 shadow-sm resize-none text-base"
                placeholder="Tell us about your project..."
                aria-label="Your message"
                title="Your message"
              />
            </div>
            <div className="text-center">
              <Button size="lg" type="submit" aria-label="Submit contact form" title="Send Message">
                Send Message
              </Button>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}