'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const testimonials = [
	{
		id: 1,
		name: "Sara El-Sayed",
		role: "CTO, NileTech Solutions",
		company: "NileTech",
		logo: "/logos/niletech.svg",
		rating: 5,
		quote: "Novix transformed our digital infrastructure. Their practical approach and rapid delivery helped us scale across Egypt and the region.",
		image: "/testimonials/egypt1.svg"
	},
	{
		id: 2,
		name: "Mohamed Hassan",
		role: "Head of Engineering, Cairo Data Co",
		company: "Cairo Data",
		logo: "/logos/cairodata.svg",
		rating: 5,
		quote: "The team's expertise in cloud architecture and migrations was outstanding. We achieved higher reliability and lower costs.",
		image: "/testimonials/egypt2.svg"
	},
	{
		id: 3,
		name: "Fatma Ali",
		role: "CEO, Alexandria Innovations",
		company: "Alexandria Innovations",
		logo: "/logos/alexinnov.svg",
		rating: 4,
		quote: "Working with Novix was a game-changer for our product roadmap. Their guidance accelerated our time-to-market.",
		image: "/testimonials/egypt3.svg"
	}
];

export default function TestimonialsSection() {
	const { language } = useLanguage();
	// Helper to compute initials from a full name
	const getInitials = (name: string) => {
		if (!name) return '';
		const parts = name.split(' ').filter(Boolean);
		return (parts[0]?.[0] || '') + (parts[1]?.[0] || '')
	};

	// Avatar component that renders bold initials inside a circular tile.
	// We intentionally do NOT attempt to load external images here to avoid
	// browser broken-image icons; use initials for a clean, consistent UI.
	function Avatar({ name }: { name: string }) {
		return (
			<div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#0b1220] flex items-center justify-center text-lg md:text-2xl font-extrabold text-white shadow-sm">
				{getInitials(name).toUpperCase()}
			</div>
		);
	}
	const containerRef = useRef<HTMLDivElement>(null);
	const [activeIndex, setActiveIndex] = useState(0);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start end", "end start"]
	});

	const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

	const nextTestimonial = () => {
		setActiveIndex((prev) => (prev + 1) % testimonials.length);
	};

	const prevTestimonial = () => {
		setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
	};

	return (
		<section className="py-12 md:py-24 bg- relative overflow-hidden" ref={containerRef}>
			{/* Background Effects */}
			<div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent opacity-40" />
			<motion.div
				className="absolute inset-0"
				style={{ y }}
			/>

			<div className="container mx-auto px-4 relative">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
					className="text-center mb-8 md:mb-16"
				>
					<h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
						Client Success Stories
					</h2>
					<p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
						Hear from our partners about their transformation journey
					</p>
				</motion.div>

				<div className="relative max-w-4xl mx-auto">
					{/* Navigation Buttons - Hidden on mobile, visible on larger screens */}
					<div className="hidden md:block">
						<button
							onClick={prevTestimonial}
							className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 lg:-translate-x-24 
                       p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 
                       transition-colors z-10"
							aria-label="Previous testimonial"
							title="Previous testimonial"
						>
							<span className="sr-only">Previous testimonial</span>
							<ChevronLeft className="w-6 h-6 text-gray-400" />
						</button>

						<button
							onClick={nextTestimonial}
							className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 lg:translate-x-24 
                       p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 
                       transition-colors z-10"
							aria-label="Next testimonial"
							title="Next testimonial"
						>
							<span className="sr-only">Next testimonial</span>
							<ChevronRight className="w-6 h-6 text-gray-400" />
						</button>
					</div>

					{/* Mobile Navigation Buttons */}
					<div className="flex md:hidden justify-between mb-4">
						<button
							onClick={prevTestimonial}
							className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 
                       transition-colors z-10"
							aria-label="Previous testimonial"
							title="Previous testimonial"
						>
							<span className="sr-only">Previous testimonial</span>
							<ChevronLeft className="w-6 h-6 text-gray-400" />
						</button>

						<button
							onClick={nextTestimonial}
							className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 
                       transition-colors z-10"
							aria-label="Next testimonial"
							title="Next testimonial"
						>
							<span className="sr-only">Next testimonial</span>
							<ChevronRight className="w-6 h-6 text-gray-400" />
						</button>
					</div>

					{/* Testimonials Carousel */}
					<div className="relative overflow-hidden">
						<div 
							className="transition-all duration-500 ease-out flex"
							style={{ transform: `translateX(-${activeIndex * 100}%)` }}
						>
							{testimonials.map((testimonial, index) => (
								<motion.div
									key={testimonial.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: index === activeIndex ? 1 : 0, y: 0 }}
									transition={{ duration: 0.5 }}
									className={`w-full flex-shrink-0 px-4 ${language === 'ar' ? 'text-right' : ''}`}
								>
									<div className="bg-white/5 sm:backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-white/10">
										<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-6">
											<div className="flex items-center space-x-4">
													<div className="w-14 h-14 md:w-16 md:h-16 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
													  {/* Render initials avatar (consistent style, no broken-image icon) */}
													  <Avatar name={testimonial.name} />
													</div>
												<div>
													<h3 className="text-lg md:text-xl font-semibold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">{language === 'ar' ? (testimonial.name_ar || testimonial.name) : testimonial.name}</h3>
													<p className="text-sm md:text-base text-gray-300">{language === 'ar' ? (testimonial.role_ar || testimonial.role) : testimonial.role}</p>
												</div>
											</div>
											<div className="flex space-x-1">
												{[...Array(testimonial.rating)].map((_, i) => (
													<Star
														key={i}
														className="w-4 h-4 md:w-5 md:h-5 text-primary fill-primary"
													/>
												))}
											</div>
										</div>
										<blockquote className="text-base md:text-lg text-gray-300 italic leading-relaxed break-words whitespace-pre-line">
											&ldquo;{language === 'ar' ? (testimonial.quote_ar || testimonial.quote) : testimonial.quote}&rdquo;
										</blockquote>
									</div>
								</motion.div>
							))}
						</div>
					</div>

					{/* Dots Navigation */}
					<div className="flex justify-center space-x-2 mt-8">
						{testimonials.map((_, index) => (
							<button
								key={index}
								onClick={() => setActiveIndex(index)}
								className={`w-2 h-2 rounded-full transition-colors ${
									index === activeIndex ? 'bg-primary' : 'bg-white/20'
								}`}
								aria-label={`Go to testimonial ${index + 1}`}
								title={`Go to testimonial ${index + 1}`}
							>
								<span className="sr-only">Go to testimonial {index + 1}</span>
							</button>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}