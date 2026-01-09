import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play } from 'lucide-react';

const ServiceCard = ({ service, index, total, progress }) => {
  const targetScale = 1 - (total - index - 1) * 0.05;
  const start = index * (1 / total);
  const scale = useTransform(progress, [start, 1], [1, targetScale]);

  return (
    <div 
      className="sticky w-full flex items-start justify-center py-8" 
      style={{ top: `${60 + index * 25}px` }}
    >
      <motion.div
        style={{
          scale,
          zIndex: index + 1,
        }}
        className="w-full max-w-6xl origin-top" 
      >
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden" style={{ maxHeight: '75vh' }}>
          {/* Title Header */}
          <div className="p-6 md:p-8 bg-gradient-to-r from-zinc-50 to-zinc-100 border-b border-slate-100">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-none">
              {service.title}
            </h2>
          </div>

          {/* Content Grid */}
          <div className="p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {/* Left Side - Image/Video */}
              <div className="relative aspect-square group cursor-pointer">
                <div className={`w-full h-full ${service.color} rounded-2xl`} />
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl cursor-pointer"
                >
                  <Play className="w-8 h-8 text-black fill-black ml-1" />
                </motion.div>
              </div>

              {/* Right Side - Description & Projects */}
              <div className="flex flex-col justify-center space-y-6">
                <p className="text-base md:text-xl text-slate-600 leading-relaxed">
                  {service.description}
                </p>
                
                {/* Total Projects */}
                <div className="pt-4 border-t border-slate-200">
                  <p className="text-xs uppercase tracking-wider text-slate-400 mb-2">
                    Total Projects
                  </p>
                  <p className="text-4xl font-bold text-slate-900">
                    {service.projects}+
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function ServicesPage() {
  const container = useRef(null);

  const services = [
    {
      id: 0,
      title: 'Brand Identity',
      description: 'We craft distinctive visual identities that resonate with your audience. From logo design to comprehensive brand guidelines, we ensure every touchpoint reflects your unique voice and vision.',
      color: 'bg-zinc-900',
      projects: 127,
    },
    {
      id: 1,
      title: 'Digital Experience',
      description: 'Immersive web experiences that captivate and convert. We blend cutting-edge technology with intuitive design to create digital products that users love and remember.',
      color: 'bg-zinc-800',
      projects: 89,
    },
    {
      id: 2,
      title: 'Motion & Video',
      description: 'Dynamic storytelling through motion. We produce compelling video content and animations that bring your brand to life and engage audiences across all platforms.',
      color: 'bg-zinc-900',
      projects: 156,
    },
    {
      id: 3,
      title: 'Strategy & Consulting',
      description: 'Strategic guidance rooted in research and insight. We help you navigate complex challenges and identify opportunities for growth through comprehensive brand strategy.',
      color: 'bg-zinc-800',
      projects: 94,
    },
  ];

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20 bg-white">
        <div className="max-w-5xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="aspect-video bg-zinc-200 mb-8 rounded-2xl"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center"
          >
            <p className="text-xl md:text-2xl font-bold tracking-wider uppercase mb-2">
              your voice = your signature
            </p>
            <p className="text-base md:text-lg text-zinc-500 uppercase tracking-wide">
              different is good!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stacking Services Section */}
      <section ref={container} className="relative bg-slate-50" style={{ height: `${services.length * 100}vh` }}>
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="relative">
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                total={services.length}
                progress={scrollYProgress}
              />
            ))}
            {/* Spacer to allow last card to stick */}
            <div className="h-screen" />
          </div>
        </div>
      </section>

      {/* Footer text */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-base md:text-lg uppercase tracking-wider text-zinc-400 text-center">
            we focus on every small details
          </p>
        </div>
      </section>
    </div>
  );
}