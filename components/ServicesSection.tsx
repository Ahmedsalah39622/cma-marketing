'use client';

import { useEffect } from 'react';

type PortfolioCard = { icon: string; title: string; description: string; tags?: string[] };

export default function ServicesSection() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')), { threshold: 0.12 });
    document.querySelectorAll('.scroll-fade').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const services: PortfolioCard[] = [
    { icon: '🗄️', title: 'ERP Solutions', description: 'Custom Enterprise Resource Planning systems to streamline operations and improve efficiency.', tags: ['SAP', 'Oracle', 'Custom Solutions'] },
    { icon: '🧰', title: 'System Administration', description: 'Expert management and maintenance of your IT infrastructure for optimal performance and security.', tags: ['Windows Server', 'Linux', 'Cloud Infrastructure'] },
    { icon: '🌐', title: 'Web Development', description: 'Modern, responsive websites and web applications built with cutting-edge technologies.', tags: ['Next.js', 'React', 'Node.js'] },
    { icon: '🛒', title: 'POS & Cashier Systems', description: 'Reliable point-of-sale and inventory management solutions for retail businesses.', tags: ['Custom POS', 'Inventory', 'Payment Integration'] },
    { icon: '</>', title: 'Custom Software', description: 'Tailored software solutions for your specific business needs and challenges.', tags: ['Desktop Apps', 'Mobile Apps', 'Web Apps'] },
    { icon: '⚙️', title: 'DevOps Services', description: 'Streamline development and operations with modern DevOps practices and tooling.', tags: ['CI/CD', 'Docker', 'Kubernetes'] },
    { icon: '☁️', title: 'Cloud Solutions', description: 'Expert cloud consulting and implementation services for scalable infrastructure.', tags: ['AWS', 'Azure', 'GCP'] },
    { icon: '🛡️', title: 'Security Services', description: 'Comprehensive cybersecurity services to protect your business assets and data.', tags: ['Audits', 'PenTesting', 'Compliance'] },
  ];

  return (
    <section id="services" className="section relative bg-black text-white">
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12 fade-in-down">
          <h2 className="section-title">Our Solutions</h2>
          <p className="section-subtitle">At Novix, we provide advanced technological solutions that drive innovation. From AI integration to cloud infrastructure, we power your digital transformation.</p>
        </div>

        <div className="flex flex-wrap justify-center" style={{ gap: '32px 32px' }}>
          {services.map((s, idx) => (
            <div key={idx} className="scroll-fade" style={{ animationDelay: `${idx * 0.04}s` }}>
              <div className="card-light h-full">
                <div className="service-icon">
                  <span>{s.icon}</span>
                </div>
                <h3 className="text-lg font-bold mb-1">{s.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{s.description}</p>
                <div>
                  {(s.tags || []).map((t, i) => (
                    <span key={i} className="tag-pill">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
