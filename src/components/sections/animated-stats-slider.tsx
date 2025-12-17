'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sara El-Sayed",
    position: "CTO at NileTech Solutions",
    content: "Novix transformed our entire digital infrastructure. The results exceeded our expectations.",
    rating: 5,
    image: "/testimonials/egypt1.svg"
  },
  {
    name: "Mohamed Hassan",
    position: "Head of Engineering at Cairo Data Co",
    content: "Their AI integration solutions helped us achieve 200% growth in efficiency.",
    rating: 5,
    image: "/testimonials/egypt2.svg"
  },
  {
    name: "Fatma Ali",
    position: "CEO at Alexandria Innovations",
    content: "The team at Novix delivered exceptional results. Best tech partner we've worked with.",
    rating: 5,
    image: "/testimonials/egypt3.svg"
  }
];

const stats = [
  { value: "98%", label: "Client Satisfaction" },
  { value: "25+", label: "Projects Completed" },
  { value: "2+", label: "Years Experience" },
  { value: "24/7", label: "Support Available" },
];

export default function AnimatedStatsSlider() {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  // Deterministic values for hydration safety
  const bgShapes = [
    { w: 400, h: 350, l: 10, t: 15, x: 30, y: -20, d: 22 },
    { w: 500, h: 420, l: 60, t: 40, x: -25, y: 15, d: 28 },
    { w: 350, h: 500, l: 30, t: 60, x: 20, y: 30, d: 24 },
    { w: 600, h: 300, l: 75, t: 25, x: -35, y: -15, d: 26 },
    { w: 450, h: 380, l: 45, t: 70, x: 15, y: -25, d: 30 },
  ];
  return (
    <section id="stats" className="py-20 bg- text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
        {bgShapes.map((shape, i) => (
          <motion.div
            key={i}
            className="absolute bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl"
            style={{
              width: `${shape.w}px`,
              height: `${shape.h}px`,
              left: `${shape.l}%`,
              top: `${shape.t}%`,
            }}
            animate={{
              x: [0, shape.x, 0],
              y: [0, shape.y, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: shape.d,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 mb-20">
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <motion.div
                className="text-4xl md:text-5xl font-bold text-primary mb-2"
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring",
                  stiffness: 100,
                  delay: index * 0.1 
                }}
              >
                {stat.value}
              </motion.div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Testimonials Slider */}
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Navigation Buttons */}
            <motion.button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white/10 hover:bg-white/20 rounded-full p-2 z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous testimonial"
              title="Previous testimonial"
            >
              <span className="sr-only">Previous testimonial</span>
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white/10 hover:bg-white/20 rounded-full p-2 z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Next testimonial"
              title="Next testimonial"
            >
              <span className="sr-only">Next testimonial</span>
              <ChevronRight className="w-6 h-6" />
            </motion.button>

            {/* Testimonial Cards */}
            <div className="relative h-[300px] overflow-hidden">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="absolute inset-0 flex flex-col items-center text-center p-8 bg-white/5 sm:backdrop-blur-lg rounded-2xl"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{
                    opacity: activeSlide === index ? 1 : 0,
                    x: activeSlide === index ? 0 : -100,
                    scale: activeSlide === index ? 1 : 0.9,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-xl mb-6">&quot;{testimonial.content}&quot;</p>
                  <div className="mt-auto">
                    <h4 className="font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-gray-400">{testimonial.position}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    activeSlide === index ? 'bg-primary' : 'bg-white/20'
                  }`}
                  onClick={() => setActiveSlide(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Go to testimonial ${index + 1}`}
                  title={`Go to testimonial ${index + 1}`}
                >
                  <span className="sr-only">Go to testimonial {index + 1}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}