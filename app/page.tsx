import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import FeaturesSection from '@/components/FeaturesSection';
import PortfolioSection from '@/components/PortfolioSection';
import ProcessSection from '@/components/ProcessSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-black overflow-hidden">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <FeaturesSection />
      <PortfolioSection />
      <ProcessSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
