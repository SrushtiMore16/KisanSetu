"use client";

import { motion } from "framer-motion";
import { Sprout, TrendingUp, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-12 overflow-hidden relative">
      {/* Decorative Background Glow */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-96 h-96 rounded-full blur-[120px] -z-10 opacity-30" 
        style={{ backgroundColor: 'var(--accent-sage-green)' }} 
      />
      
      <div className="z-10 max-w-6xl w-full flex flex-col items-center text-center gap-8 mx-auto mt-12">
        
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full border shadow-sm text-sm font-semibold tracking-wide mx-auto"
          style={{ 
            backgroundColor: 'rgba(125, 159, 48, 0.1)', 
            color: 'var(--accent-sage-green)',
            borderColor: 'rgba(125, 159, 48, 0.2)' 
          }}
        >
          <Sprout size={18} />
          <span>Next-Gen Agricultural Platform</span>
        </motion.div>

        {/* Hero Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mx-auto leading-tight"
        >
          Empowering Farmers, <br />
          <span style={{ color: 'var(--accent-sage-green)' }}>Connecting Markets.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl text-lg md:text-xl font-medium mx-auto"
        >
          Manage your crop lifecycle, get AI-powered diagnostics, and negotiate directly with traders in one seamless platform.
        </motion.p>

        {/* Action Buttons - Fixed Flex Layout */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-6 w-full max-w-md mx-auto"
        >
          <button 
            className="px-8 py-4 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity w-full sm:w-48 shadow-lg shadow-black/10 flex items-center justify-center"
            style={{ backgroundColor: 'var(--accent-sage-green)' }}
          >
            Join as Farmer
          </button>
          <button 
            className="px-8 py-4 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity w-full sm:w-48 shadow-lg shadow-black/10 flex items-center justify-center"
            style={{ backgroundColor: 'var(--heading-pitch-black)' }}
          >
            Join as Trader
          </button>
        </motion.div>

        {/* Feature Grid - Fixed Grid Layout */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 w-full max-w-5xl mx-auto"
        >
          {[
            { icon: Sprout, title: "Crop Lifecycle", desc: "Track stages, events, and yield precisely." },
            { icon: TrendingUp, title: "Live Marketplace", desc: "Direct negotiation with verified buyers." },
            { icon: ShieldCheck, title: "Verified Network", desc: "Secure and trusted digital transactions." }
          ].map((feature, i) => (
            <div key={i} className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl border shadow-sm hover:shadow-md transition-all text-center h-full" style={{ borderColor: '#F0EBE1' }}>
              <div className="p-4 rounded-xl mb-6 flex items-center justify-center" style={{ backgroundColor: 'rgba(125, 159, 48, 0.1)', color: 'var(--accent-sage-green)' }}>
                <feature.icon size={32} />
              </div>
              <h3 className="text-2xl font-semibold mb-3" style={{ color: 'var(--heading-pitch-black)' }}>
                {feature.title}
              </h3>
              <p className="text-base font-medium">
                {feature.desc}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}