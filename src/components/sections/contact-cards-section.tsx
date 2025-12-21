// contact-cards-section.tsx
'use client';


import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';

export default function ContactCardsSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [subject, setSubject] = useState('Project Discussion');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !subject || !message) {
      setError('Please fill in all required fields.');
      return;
    }
    setSuccess(true);
    setTimeout(() => setSuccess(false), 5000);
    setName('');
    setEmail('');
    setPhone('');
    setService('');
    setSubject('Project Discussion');
    setMessage('');
  };

  return (
    <section className="py-16 px-4 bg-black text-white">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Phone Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-black border border-gray-700 rounded-2xl p-6 flex flex-col items-start gap-2 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-2 text-xl font-bold">
              <FaPhoneAlt className="text-2xl" /> Phone
            </div>
            <div className="text-lg font-semibold">+20 1113146750</div>
            <div className="text-gray-400 text-sm">Sun-Thurs from 8am to 6pm.</div>
          </motion.div>
          {/* Email Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-black border border-gray-700 rounded-2xl p-6 flex flex-col items-start gap-2 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-2 text-xl font-bold">
              <FaEnvelope className="text-2xl" /> Email
            </div>
            <div className="text-lg font-semibold">novix.its.co@gmail.com</div>
            <div className="text-gray-400 text-sm">Online support 24/7</div>
          </motion.div>
          {/* Office Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-black border border-gray-700 rounded-2xl p-6 flex flex-col items-start gap-2 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-2 text-xl font-bold">
              <FaMapMarkerAlt className="text-2xl" /> Office
            </div>
            <div className="text-lg font-semibold">Helmiet El-Zaitoun, Cairo, Egypt</div>
            <div className="text-gray-400 text-sm">Contact with us</div>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="md:col-span-2 bg-black border border-gray-700 rounded-2xl p-8 flex flex-col gap-4 shadow-lg">
            {success && (
              <div className="bg-green-900 text-green-200 px-4 py-3 rounded mb-2 text-center font-semibold">
                ✓ Message sent successfully! We'll get back to you soon.
              </div>
            )}
            {error && (
              <div className="bg-red-900 text-red-200 px-4 py-3 rounded mb-2 text-center font-semibold">
                {error}
              </div>
            )}
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block mb-1 text-sm">Your Name</label>
                <input value={name} onChange={e => setName(e.target.value)} className="w-full rounded-lg bg-gray-900 border border-gray-700 px-3 py-2 text-white" placeholder="Name" />
              </div>
              <div>
                <label className="block mb-1 text-sm">Your Email</label>
                <input value={email} onChange={e => setEmail(e.target.value)} className="w-full rounded-lg bg-gray-900 border border-gray-700 px-3 py-2 text-white" placeholder="email@example.com" />
              </div>
              <div>
                <label className="block mb-1 text-sm">Phone (optional)</label>
                <input value={phone} onChange={e => setPhone(e.target.value)} className="w-full rounded-lg bg-gray-900 border border-gray-700 px-3 py-2 text-white" placeholder="+20 123 456 789" />
              </div>
            </div>
            <div>
              <label className="block mb-1 text-sm">Service Type (optional)</label>
              <select value={service} onChange={e => setService(e.target.value)} className="w-full rounded-lg bg-gray-900 border border-gray-700 px-3 py-2 text-white">
                <option value="">-- Select a service --</option>
                <option value="Marketing">Marketing</option>
                <option value="Branding">Branding</option>
                <option value="Web Development">Web Development</option>
                <option value="Consultation">Consultation</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-sm">Subject</label>
              <input value={subject} onChange={e => setSubject(e.target.value)} className="w-full rounded-lg bg-gray-900 border border-gray-700 px-3 py-2 text-white" placeholder="Project Discussion" />
            </div>
            <div>
              <label className="block mb-1 text-sm">Message</label>
              <textarea value={message} onChange={e => setMessage(e.target.value)} className="w-full rounded-lg bg-gray-900 border border-gray-700 px-3 py-2 text-white min-h-[100px]" placeholder="Tell us about your project..." />
            </div>
            <div className="text-right">
              <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-primary/80 transition">
                Send Message <span className="ml-1">✈️</span>
              </button>
            </div>
          </form>
          {/* WhatsApp Card */}
          <div className="bg-green-900 border border-green-700 rounded-2xl p-8 flex flex-col items-center justify-center shadow-lg">
            <FaWhatsapp className="text-5xl text-green-400 mb-4" />
            <div className="text-xl font-bold mb-2">Quick Chat on WhatsApp</div>
            <div className="text-gray-200 text-sm mb-4 text-center">Get instant responses from our team. Available 24/7 for your inquiries.</div>
            <a
              href="https://wa.me/201113146750?text=مرحبا، أود الاستفسار عن خدماتكم"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold text-lg flex items-center gap-2 transition"
            >
              <FaWhatsapp className="text-2xl" /> Start WhatsApp Chat
            </a>
            <div className="text-gray-300 text-xs mt-3 text-center">No registration needed. Direct chat with our team.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
