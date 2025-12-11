'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black border-t border-yellow-600/30 py-12">
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 hero-glow hero-glow-gold" style={{ filter: 'blur(80px)' }}></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="fade-in-up">
            <div className="text-2xl font-bold mb-4">
              <span className="text-white">ELITE</span>
              <span className="text-yellow-500 ml-2">MARKETING</span>
            </div>
            <p className="text-gray-400 text-sm">
              Transform your business with cutting-edge marketing solutions that drive results.
            </p>
          </div>

          {/* Services */}
          <div className="fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h3 className="font-bold text-white mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              {['Strategy', 'Design', 'Development', 'Marketing', 'Analytics'].map((item) => (
                <li key={item} className="hover:text-yellow-400 cursor-pointer transition-colors">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="font-bold text-white mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              {['About', 'Blog', 'Careers', 'Contact', 'Privacy'].map((item) => (
                <li key={item} className="hover:text-yellow-400 cursor-pointer transition-colors">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h3 className="font-bold text-white mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe for exclusive marketing insights
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-lg bg-yellow-600/10 border border-yellow-600/30 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-yellow-500"
              />
              <button className="px-4 py-2 bg-yellow-600 text-black font-bold rounded-lg hover:bg-yellow-500 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-yellow-600/20 pt-8 flex flex-col md:flex-row items-center justify-between text-gray-400 text-sm">
          <p>&copy; {currentYear} Elite Marketing. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-yellow-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
