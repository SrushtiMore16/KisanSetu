// components/feature-section.tsx
"use client";

import { motion } from "framer-motion";
import { Sprout, TrendingUp, ShieldCheck } from "lucide-react";

export function FeatureSection() {
  return (
    <section className="w-full bg-floral-white py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
        >
          {[
            { icon: Sprout, title: "Crop Lifecycle", desc: "Track stages, events, and yield precisely." },
            { icon: TrendingUp, title: "Live Marketplace", desc: "Direct negotiation with verified buyers." },
            { icon: ShieldCheck, title: "Verified Network", desc: "Secure and trusted digital transactions." }
          ].map((feature, i) => (
            <div key={i} className="flex flex-col items-start p-8 bg-white rounded-2xl border border-[#F0EBE1] shadow-sm hover:shadow-md transition-all h-full">
              <div className="p-4 rounded-xl mb-6 flex items-center justify-center bg-sage-green/10 text-sage-green">
                <feature.icon size={32} />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-pitch-black">
                {feature.title}
              </h3>
              <p className="text-base font-medium text-golden-chestnut">
                {feature.desc}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}