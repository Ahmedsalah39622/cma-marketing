'use client';

import AchievementTimeline from '@/components/sections/achievement-timeline';

export default function AboutPage() {
  return (
  <main className="flex flex-col min-h-screen text-white">
      {/* About Hero Section */}
      <section className="py-24 bg- relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">About Novix</h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              We are a team of passionate innovators dedicated to transforming businesses through cutting-edge technology solutions. 
              Our commitment to excellence and continuous innovation drives us to deliver exceptional results for our clients.
            </p>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <AchievementTimeline />

      {/* Vision Section */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Vision</h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                At Novix, we envision a future where technology seamlessly empowers businesses to achieve their fullest potential. 
                We strive to be at the forefront of digital innovation, creating solutions that not only solve today&apos;s challenges 
                but anticipate tomorrow&apos;s needs.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Our approach combines technical excellence with creative problem-solving, ensuring that every solution we deliver 
                makes a meaningful impact on our clients&apos; success.
              </p>
            </div>
            <div className="relative h-full min-h-[400px] bg-gradient-to-br from-primary/20 to-transparent rounded-2xl">
              {/* Placeholder for future image or 3D element */}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}