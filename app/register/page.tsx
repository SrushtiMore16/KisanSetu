// app/register/page.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sprout, 
  Building, 
  ShieldCheck, 
  Zap, 
  TrendingUp, 
  CheckCircle2, 
  Eye, 
  EyeOff,
  ArrowRight,
  Lock,
  Phone,
  Mail,
  UserCheck
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  
  // Form States
  const [role, setRole] = useState<"Farmer" | "Trader" | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    password: ""
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!role || !agreedToTerms) return;
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
    }, 800);
  };

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-floral-white flex flex-col lg:flex-row font-body">
      
      {/* LEFT COLUMN: Value Proposition & Marketing */}
      <div className="lg:w-5/12 bg-pitch-black text-white p-8 md:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-sage-green/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-golden-chestnut/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 group w-fit mb-16">
            <div className="p-2 rounded-xl bg-sage-green text-white group-hover:scale-105 transition-transform">
              <Sprout size={24} strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white font-heading">
              KisanSetu
            </span>
          </Link>

          <motion.div 
            initial="hidden" animate="show" 
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            className="space-y-10"
          >
            <motion.div variants={fadeUpVariant}>
              <h1 className="text-3xl md:text-4xl font-bold font-heading mb-4 leading-tight">
                The Next-Generation <br/><span className="text-sage-green">Agricultural Marketplace</span>
              </h1>
              <p className="text-white/70 font-medium leading-relaxed">
                KisanSetu bridges the gap between farmers and traders, creating a transparent, highly efficient, and secure ecosystem for agricultural commerce.
              </p>
            </motion.div>

            <div className="space-y-6">
              <motion.div variants={fadeUpVariant} className="flex gap-4">
                <div className="p-3 bg-white/5 rounded-xl h-fit text-sage-green border border-white/10 shrink-0">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-heading">Performance & Cost-Effective</h3>
                  <p className="text-sm text-white/60 mt-1 leading-relaxed">
                    Zero hidden middlemen fees. Direct negotiations mean higher margins for farmers and better procurement costs for traders.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={fadeUpVariant} className="flex gap-4">
                <div className="p-3 bg-white/5 rounded-xl h-fit text-sage-green border border-white/10 shrink-0">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-heading">Bank-Grade Security & 24/7 Uptime</h3>
                  <p className="text-sm text-white/60 mt-1 leading-relaxed">
                    Escrow-backed payments and strict KYC verification ensure every deal is safe. Cloud infrastructure guarantees 99.99% marketplace availability.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={fadeUpVariant} className="flex gap-4">
                <div className="p-3 bg-white/5 rounded-xl h-fit text-sage-green border border-white/10 shrink-0">
                  <Zap size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-heading">Beyond Existing Options</h3>
                  <p className="text-sm text-white/60 mt-1 leading-relaxed">
                    Unlike traditional Mandis, KisanSetu offers AI crop diagnostics, predictive risk engines, and live market benchmarks right from your phone.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="relative z-10 mt-12 pt-8 border-t border-white/10 text-xs text-white/40 font-bold uppercase tracking-wider">
          © 2026 KisanSetu Platform
        </div>
      </div>

      {/* RIGHT COLUMN: Registration Form */}
      <div className="lg:w-7/12 flex items-center justify-center p-8 md:p-12 lg:p-20 relative">
        <div className="w-full max-w-xl">
          
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div 
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-bold text-pitch-black font-heading mb-2">Create your account</h2>
                  <p className="text-golden-chestnut font-medium">Join thousands of verified users on KisanSetu.</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-6">
                  
                  {/* Role Selection */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-pitch-black uppercase tracking-wider">I am registering as a:</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        type="button"
                        onClick={() => setRole("Farmer")}
                        className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col gap-2 ${
                          role === "Farmer" ? "border-sage-green bg-sage-green/5" : "border-[#F0EBE1] bg-white hover:border-sage-green/30"
                        }`}
                      >
                        <Sprout size={24} className={role === "Farmer" ? "text-sage-green" : "text-golden-chestnut"} />
                        <span className={`font-bold ${role === "Farmer" ? "text-pitch-black" : "text-golden-chestnut"}`}>Farmer</span>
                      </button>
                      
                      <button 
                        type="button"
                        onClick={() => setRole("Trader")}
                        className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col gap-2 ${
                          role === "Trader" ? "border-pitch-black bg-pitch-black/5" : "border-[#F0EBE1] bg-white hover:border-pitch-black/30"
                        }`}
                      >
                        <Building size={24} className={role === "Trader" ? "text-pitch-black" : "text-golden-chestnut"} />
                        <span className={`font-bold ${role === "Trader" ? "text-pitch-black" : "text-golden-chestnut"}`}>Trader / Buyer</span>
                      </button>
                    </div>
                  </div>

                  {/* Input Fields */}
                  <div className="space-y-4">
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-golden-chestnut" size={18} />
                      <input 
                        type="tel" 
                        required
                        placeholder="Mobile Number" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-white border border-[#F0EBE1] text-pitch-black text-sm rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-sage-green focus:ring-2 focus:ring-sage-green/20 transition-all"
                      />
                    </div>

                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-golden-chestnut" size={18} />
                      <input 
                        type="email" 
                        required
                        placeholder="Email Address (Optional for Farmers)" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-white border border-[#F0EBE1] text-pitch-black text-sm rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-sage-green focus:ring-2 focus:ring-sage-green/20 transition-all"
                      />
                    </div>

                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-golden-chestnut" size={18} />
                      <input 
                        type={showPassword ? "text" : "password"} 
                        required
                        placeholder="Create Password" 
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className="w-full bg-white border border-[#F0EBE1] text-pitch-black text-sm rounded-xl py-3.5 pl-12 pr-12 outline-none focus:border-sage-green focus:ring-2 focus:ring-sage-green/20 transition-all"
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-golden-chestnut hover:text-pitch-black transition-colors"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Terms & Conditions */}
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center shrink-0 mt-0.5">
                      <input 
                        type="checkbox" 
                        className="peer sr-only"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                      />
                      <div className="w-5 h-5 border-2 border-[#F0EBE1] rounded bg-white peer-checked:bg-sage-green peer-checked:border-sage-green transition-all group-hover:border-sage-green/50" />
                      <CheckCircle2 size={14} className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity" strokeWidth={3} />
                    </div>
                    <span className="text-sm font-medium text-golden-chestnut leading-relaxed">
                      I agree to the <Link href="#" className="text-pitch-black font-bold hover:underline">Terms of Service</Link>, <Link href="#" className="text-pitch-black font-bold hover:underline">Privacy Policy</Link>, and consent to verification of my details.
                    </span>
                  </label>

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    disabled={!role || !agreedToTerms}
                    className="w-full py-4 bg-pitch-black text-white rounded-xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm disabled:opacity-50 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                  >
                    Create Account <ArrowRight size={18} />
                  </button>
                </form>

                <p className="text-center text-sm font-medium text-golden-chestnut">
                  Already have an account? <Link href="/login" className="text-sage-green font-bold hover:underline">Log in here</Link>
                </p>
              </motion.div>
            ) : (
              
              /* POST-SIGNUP MANDATORY PROFILE COMPLETION STATE */
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl border border-[#F0EBE1] shadow-xl p-8 md:p-12 text-center"
              >
                <div className="w-20 h-20 bg-sage-green/10 text-sage-green rounded-full flex items-center justify-center mx-auto mb-6">
                  <UserCheck size={40} />
                </div>
                <h2 className="text-2xl font-bold text-pitch-black font-heading mb-2">Account Created Successfully!</h2>
                <p className="text-golden-chestnut font-medium mb-8">
                  Welcome to KisanSetu. To ensure platform security and transparency, you must complete your profile before you can access the marketplace.
                </p>

                {role === "Trader" ? (
                  <div className="bg-floral-white border border-[#F0EBE1] rounded-2xl p-6 mb-8 text-left">
                    <h3 className="font-bold text-pitch-black flex items-center gap-2 mb-3">
                      <ShieldCheck size={18} className="text-orange-500" /> Mandatory KYC Required
                    </h3>
                    <p className="text-sm text-golden-chestnut mb-4">As a Trader, you need to provide your business credentials to begin bidding on crops.</p>
                    <ul className="text-sm font-bold text-pitch-black space-y-2">
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-sage-green" /> GSTIN / PAN Details</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-sage-green" /> APMC Trade License</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-sage-green" /> Bank Account Verification</li>
                    </ul>
                  </div>
                ) : (
                  <div className="bg-floral-white border border-[#F0EBE1] rounded-2xl p-6 mb-8 text-left">
                    <h3 className="font-bold text-pitch-black flex items-center gap-2 mb-3">
                      <Sprout size={18} className="text-sage-green" /> Complete Farm Profile
                    </h3>
                    <p className="text-sm text-golden-chestnut mb-4">Set up your farm details so we can match you with the right traders and government schemes.</p>
                    <ul className="text-sm font-bold text-pitch-black space-y-2">
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-sage-green" /> Land Area & Location</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-sage-green" /> Active Crop Cycles</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-sage-green" /> Soil & Irrigation Type</li>
                    </ul>
                  </div>
                )}

                <button 
                  onClick={() => router.push(role === "Trader" ? "/trader/verification" : "/farmer/profile")}
                  className="w-full py-4 bg-sage-green text-white rounded-xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm flex items-center justify-center gap-2"
                >
                  Complete Profile Now <ArrowRight size={18} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}