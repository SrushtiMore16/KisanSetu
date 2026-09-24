// app/trader/settings/page.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Settings, 
  ChevronLeft, 
  Globe, 
  Sprout, 
  Building2,
  KeyRound, 
  MonitorSmartphone,
  ShieldCheck,
  LogOut,
  Eye,
  EyeOff,
  CheckCircle2,
  MapPin,
  Clock
} from "lucide-react";
import Link from "next/link";

// Mock Data
const languages = [
  { code: "en", name: "English", label: "English" },
  { code: "mr", name: "मराठी", label: "Marathi" },
  { code: "hi", name: "हिंदी", label: "Hindi" }
];

const marketTypes = [
  "Local APMC (Mandi)",
  "Direct Farm Gate",
  "Export Markets",
  "Processing Units",
  "FPO Aggregators"
];

const cropTypes = [
  "Soybean", "Cotton", "Wheat", "Tur (Arhar)", "Onion", "Maize", "Chana", "Sugarcane"
];

const activeSessions = [
  { id: "SESS-1", device: "Windows 11 • Chrome Browser", location: "Pune, Maharashtra", ip: "103.45.67.89", time: "Active Now", isCurrent: true },
  { id: "SESS-2", device: "Android • Mobile App", location: "Navi Mumbai, Maharashtra", ip: "117.20.44.12", time: "Last active: 2 hours ago", isCurrent: false },
];

export default function TraderSettingsPage() {
  const [activeLang, setActiveLang] = useState("en");
  const [selectedMarkets, setSelectedMarkets] = useState<string[]>(["Local APMC (Mandi)", "Direct Farm Gate"]);
  const [selectedCrops, setSelectedCrops] = useState<string[]>(["Soybean", "Cotton", "Wheat"]);
  const [showPassword, setShowPassword] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }
  };

  const toggleSelection = (setter: React.Dispatch<React.SetStateAction<string[]>>, current: string[], item: string) => {
    if (current.includes(item)) {
      setter(current.filter(i => i !== item));
    } else {
      setter([...current, item]);
    }
  };

  return (
    <div className="min-h-screen bg-floral-white p-6 md:p-12 font-body">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Navigation */}
        <div className="flex flex-col gap-4">
          <Link 
            href="/trader/dashboard" 
            className="w-fit text-golden-chestnut hover:text-sage-green flex items-center gap-1 font-medium transition-colors text-sm"
          >
            <ChevronLeft size={16} /> Back to Dashboard
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-pitch-black font-heading flex items-center gap-3">
                <Settings className="text-sage-green" size={32} />
                System Settings
              </h1>
              <p className="text-golden-chestnut font-medium mt-2">
                Customize your trading preferences and manage account security.
              </p>
            </div>
          </div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Left Column: Security & Sessions */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Password Change */}
            <motion.div variants={itemVariants} className="bg-white rounded-3xl border border-[#F0EBE1] shadow-sm overflow-hidden">
              <div className="p-6 border-b border-[#F0EBE1] bg-floral-white/30">
                <h2 className="text-xl font-bold text-pitch-black font-heading flex items-center gap-2">
                  <KeyRound className="text-pitch-black" size={24} /> 
                  Account Security
                </h2>
              </div>
              
              <div className="p-6">
                <form className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-golden-chestnut uppercase tracking-wider">Current Password</label>
                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••" 
                        className="w-full bg-floral-white border border-[#F0EBE1] text-pitch-black text-sm rounded-xl py-3 px-4 outline-none focus:border-sage-green transition-all"
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-golden-chestnut hover:text-pitch-black"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-golden-chestnut uppercase tracking-wider">New Password</label>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Enter new password" 
                      className="w-full bg-floral-white border border-[#F0EBE1] text-pitch-black text-sm rounded-xl py-3 px-4 outline-none focus:border-sage-green transition-all"
                    />
                  </div>

                  <button 
                    type="button"
                    className="w-full py-3 mt-2 bg-pitch-black text-white rounded-xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm flex items-center justify-center gap-2"
                  >
                    <ShieldCheck size={18} /> Update Password
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Login Sessions */}
            <motion.div variants={itemVariants} className="bg-white rounded-3xl border border-[#F0EBE1] shadow-sm overflow-hidden">
              <div className="p-6 border-b border-[#F0EBE1] bg-floral-white/30">
                <h2 className="text-xl font-bold text-pitch-black font-heading flex items-center gap-2">
                  <MonitorSmartphone className="text-pitch-black" size={24} /> 
                  Active Sessions
                </h2>
              </div>
              
              <div className="divide-y divide-[#F0EBE1]">
                {activeSessions.map((session) => (
                  <div key={session.id} className="p-6 hover:bg-floral-white/30 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-pitch-black text-sm flex items-center gap-2">
                        {session.device}
                        {session.isCurrent && (
                          <span className="text-[10px] font-bold text-sage-green uppercase tracking-wider bg-sage-green/10 px-2 py-0.5 rounded-md">
                            Current
                          </span>
                        )}
                      </h4>
                    </div>
                    
                    <div className="space-y-1 mb-4">
                      <p className="text-xs font-medium text-golden-chestnut flex items-center gap-1.5">
                        <MapPin size={12} /> {session.location} ({session.ip})
                      </p>
                      <p className="text-xs font-medium text-golden-chestnut flex items-center gap-1.5">
                        <Clock size={12} /> {session.time}
                      </p>
                    </div>

                    {!session.isCurrent && (
                      <button className="text-xs font-bold text-red-500 hover:text-white border border-red-500 hover:bg-red-500 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                        <LogOut size={12} /> Revoke Access
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Preferences */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* System Language */}
            <motion.div variants={itemVariants} className="bg-white rounded-3xl border border-[#F0EBE1] shadow-sm overflow-hidden">
              <div className="p-6 border-b border-[#F0EBE1] bg-floral-white/30">
                <h2 className="text-xl font-bold text-pitch-black font-heading flex items-center gap-2">
                  <Globe className="text-sage-green" size={24} /> 
                  Preferred Language
                </h2>
              </div>
              <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
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
            </motion.div>

            {/* Trading Preferences */}
            <motion.div variants={itemVariants} className="bg-white rounded-3xl border border-[#F0EBE1] shadow-sm overflow-hidden flex flex-col">
              <div className="p-6 border-b border-[#F0EBE1] bg-floral-white/30 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-pitch-black font-heading flex items-center gap-2">
                    <Building2 className="text-pitch-black" size={24} /> 
                    Trading Preferences
                  </h2>
                  <p className="text-xs font-medium text-golden-chestnut mt-1">Filters your marketplace feed and incoming negotiation alerts.</p>
                </div>
              </div>
              
              <div className="p-6 space-y-8 flex-grow">
                
                {/* Market Type Filter */}
                <div>
                  <h3 className="text-sm font-bold text-pitch-black uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Building2 size={16} className="text-sage-green" /> Preferred Market Types
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {marketTypes.map((market) => (
                      <button
                        key={market}
                        onClick={() => toggleSelection(setSelectedMarkets, selectedMarkets, market)}
                        className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all flex items-center gap-2 ${
                          selectedMarkets.includes(market) 
                            ? 'bg-pitch-black text-white border-pitch-black' 
                            : 'bg-floral-white text-golden-chestnut border-[#F0EBE1] hover:border-sage-green'
                        }`}
                      >
                        {market}
                        {selectedMarkets.includes(market) && <CheckCircle2 size={14} />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="w-full h-px bg-[#F0EBE1]" />

                {/* Crop Type Filter */}
                <div>
                  <h3 className="text-sm font-bold text-pitch-black uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Sprout size={16} className="text-sage-green" /> Tracked Commodities
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {cropTypes.map((crop) => (
                      <button
                        key={crop}
                        onClick={() => toggleSelection(setSelectedCrops, selectedCrops, crop)}
                        className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all flex items-center gap-2 ${
                          selectedCrops.includes(crop) 
                            ? 'bg-sage-green/10 text-sage-green border-sage-green' 
                            : 'bg-floral-white text-golden-chestnut border-[#F0EBE1] hover:border-sage-green'
                        }`}
                      >
                        {crop}
                        {selectedCrops.includes(crop) && <CheckCircle2 size={14} />}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Save Button */}
              <div className="p-6 border-t border-[#F0EBE1] bg-floral-white/30 flex justify-end">
                <button className="px-8 py-3 bg-sage-green text-white rounded-xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm">
                  Save Preferences
                </button>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
