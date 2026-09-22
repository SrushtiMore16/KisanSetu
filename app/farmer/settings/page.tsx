// app/farmer/settings/page.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Settings, 
  Globe, 
  HelpCircle, 
  ChevronLeft, 
  MessageCircle, 
  Phone, 
  FileText,
  CheckCircle2,
  ChevronRight,
  Shield,
  Bell
} from "lucide-react";
import Link from "next/link";

const languages = [
  { code: "mr", name: "मराठी", label: "Marathi" },
  { code: "hi", name: "हिंदी", label: "Hindi" },
  { code: "en", name: "English", label: "English" }
];

export default function SettingsPage() {
  const [activeLang, setActiveLang] = useState("mr");

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-floral-white p-6 md:p-12 font-body">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Navigation */}
        <div className="flex flex-col gap-4">
          <Link 
            href="/farmer/profile" 
            className="w-fit text-golden-chestnut hover:text-sage-green flex items-center gap-1 font-medium transition-colors text-sm"
          >
            <ChevronLeft size={16} /> Back to Profile
          </Link>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-pitch-black font-heading flex items-center gap-3">
              <Settings className="text-sage-green" size={32} />
              Settings
            </h1>
            <p className="text-golden-chestnut font-medium mt-2">
              Manage your platform preferences and get support.
            </p>
          </div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {/* Section 1: Language Preferences */}
          <motion.div variants={itemVariants} className="bg-white rounded-3xl border border-[#F0EBE1] shadow-sm overflow-hidden">
            <div className="p-6 border-b border-[#F0EBE1] bg-floral-white/30">
              <h2 className="text-xl font-bold text-pitch-black font-heading flex items-center gap-2">
                <Globe className="text-sage-green" size={24} /> 
                System Language
              </h2>
            </div>
            <div className="p-6">
              <p className="text-sm font-medium text-golden-chestnut mb-4">
                Choose the language for your dashboard, AI diagnostics, and notifications.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setActiveLang(lang.code)}
                    className={`relative p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${
                      activeLang === lang.code 
                        ? 'border-sage-green bg-sage-green/5' 
                        : 'border-[#F0EBE1] hover:border-sage-green/40 bg-white'
                    }`}
                  >
                    <span className={`text-2xl font-bold font-heading ${activeLang === lang.code ? 'text-sage-green' : 'text-pitch-black'}`}>
                      {lang.name}
                    </span>
                    <span className="text-xs font-bold text-golden-chestnut uppercase tracking-wider">
                      {lang.label}
                    </span>
                    
                    {/* Active Checkmark */}
                    <AnimatePresence>
                      {activeLang === lang.code && (
                        <motion.div 
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="absolute -top-3 -right-3 bg-sage-green text-white p-1 rounded-full shadow-md"
                        >
                          <CheckCircle2 size={16} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Section 2: Help & Support */}
          <motion.div variants={itemVariants} className="bg-white rounded-3xl border border-[#F0EBE1] shadow-sm overflow-hidden">
            <div className="p-6 border-b border-[#F0EBE1] bg-floral-white/30">
              <h2 className="text-xl font-bold text-pitch-black font-heading flex items-center gap-2">
                <HelpCircle className="text-pitch-black" size={24} /> 
                Help & Support
              </h2>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Support Action: Call */}
              <button className="flex flex-col items-start p-5 rounded-2xl border border-[#F0EBE1] bg-floral-white/50 hover:border-sage-green hover:bg-sage-green/5 transition-all group text-left">
                <div className="p-3 bg-white shadow-sm rounded-xl text-sage-green mb-4 group-hover:scale-110 transition-transform">
                  <Phone size={24} />
                </div>
                <h3 className="font-bold text-pitch-black text-lg">Kisan Helpline</h3>
                <p className="text-xs font-medium text-golden-chestnut mt-1">Toll-free, 24/7 support.</p>
                <span className="mt-4 text-sm font-bold text-sage-green flex items-center gap-1">
                  1800-180-1551
                </span>
              </button>

              {/* Support Action: Chat */}
              <button className="flex flex-col items-start p-5 rounded-2xl border border-[#F0EBE1] bg-floral-white/50 hover:border-sage-green hover:bg-sage-green/5 transition-all group text-left">
                <div className="p-3 bg-white shadow-sm rounded-xl text-sage-green mb-4 group-hover:scale-110 transition-transform">
                  <MessageCircle size={24} />
                </div>
                <h3 className="font-bold text-pitch-black text-lg">Live Chat</h3>
                <p className="text-xs font-medium text-golden-chestnut mt-1">Chat with agricultural experts.</p>
                <span className="mt-4 text-sm font-bold text-sage-green flex items-center gap-1 group-hover:gap-2 transition-all">
                  Start Chat <ChevronRight size={16} />
                </span>
              </button>

              {/* Support Action: FAQs */}
              <button className="flex flex-col items-start p-5 rounded-2xl border border-[#F0EBE1] bg-floral-white/50 hover:border-sage-green hover:bg-sage-green/5 transition-all group text-left">
                <div className="p-3 bg-white shadow-sm rounded-xl text-sage-green mb-4 group-hover:scale-110 transition-transform">
                  <FileText size={24} />
                </div>
                <h3 className="font-bold text-pitch-black text-lg">FAQs & Guides</h3>
                <p className="text-xs font-medium text-golden-chestnut mt-1">Tutorials on using KisanSetu.</p>
                <span className="mt-4 text-sm font-bold text-sage-green flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read Articles <ChevronRight size={16} />
                </span>
              </button>

            </div>
          </motion.div>

          {/* Section 3: Additional Settings (Visual scaffold for scalability) */}
          <motion.div variants={itemVariants} className="bg-white rounded-3xl border border-[#F0EBE1] shadow-sm overflow-hidden divide-y divide-[#F0EBE1]">
            <button className="w-full p-6 flex items-center justify-between hover:bg-floral-white/50 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-sage-green/10 text-sage-green rounded-lg">
                  <Bell size={20} />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-pitch-black">Notification Preferences</h3>
                  <p className="text-xs font-medium text-golden-chestnut mt-0.5">Manage SMS and Push alerts.</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-golden-chestnut group-hover:text-sage-green transition-colors" />
            </button>
            
            <button className="w-full p-6 flex items-center justify-between hover:bg-floral-white/50 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-sage-green/10 text-sage-green rounded-lg">
                  <Shield size={20} />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-pitch-black">Privacy & Security</h3>
                  <p className="text-xs font-medium text-golden-chestnut mt-0.5">Location sharing and data permissions.</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-golden-chestnut group-hover:text-sage-green transition-colors" />
            </button>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
