// app/(auth)/login/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sprout, ArrowRight, ArrowLeft, ShieldCheck, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Handle phone submission
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 1000);
  };

  // Handle OTP submission
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (otpCode.length < 6) return;

    setIsLoading(true);
    // Simulate verification
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/farmer/dashboard"; // Route based on user role post-login
    }, 1500);
  };

  // Premium UX: Auto-advance OTP inputs
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if a number is entered
    if (value !== "" && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace to move to previous input
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      otpRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-floral-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Ambient Background */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[150px] -z-10 opacity-40 bg-sage-green" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full blur-[120px] -z-10 opacity-30 bg-golden-chestnut" />

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl shadow-pitch-black/5 overflow-hidden flex flex-col md:flex-row border border-[#F0EBE1] z-10 min-h-[600px]">
        
        {/* Left Side: Branding & Visual */}
        <div className="hidden md:flex md:w-1/2 relative bg-sage-green p-12 flex-col justify-between overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: "url('/HeroRight.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            mixBlendMode: "multiply"
          }} />
          
          <div className="relative z-10 flex items-center gap-2">
            <div className="p-2 rounded-xl bg-white/20 text-white backdrop-blur-sm">
              <Sprout size={28} strokeWidth={2.5} />
            </div>
            <span className="text-3xl font-bold tracking-tight text-white font-heading">
              KisanSetu
            </span>
          </div>

          <div className="relative z-10 text-white mt-12">
            <h2 className="text-4xl font-bold font-heading mb-4 leading-tight">
              Grow together, <br /> Trade smarter.
            </h2>
            <p className="text-white/80 font-medium text-lg max-w-sm">
              Join thousands of verified farmers and buyers building the future of agriculture.
            </p>
          </div>
          
          {/* Decorative elements */}
          <div className="relative z-10 flex items-center gap-3 mt-12 text-white/90 font-medium text-sm">
            <ShieldCheck size={20} />
            <span>Secure, encrypted transactions</span>
          </div>
        </div>

        {/* Right Side: Authentication Form */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center relative bg-white">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: PHONE NUMBER */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col h-full justify-center"
              >
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-pitch-black font-heading mb-2">Get Started</h1>
                  <p className="text-golden-chestnut font-medium">Enter your mobile number to securely log in or create a new account.</p>
                </div>

                <form onSubmit={handleSendOtp} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="text-sm font-bold text-pitch-black uppercase tracking-wider">
                      Mobile Number
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-4 text-pitch-black font-bold">+91</span>
                      <input
                        id="phone"
                        type="tel"
                        maxLength={10}
                        placeholder="00000 00000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        className="w-full bg-floral-white border-2 border-[#F0EBE1] text-pitch-black font-medium text-lg rounded-xl py-4 pl-14 pr-4 outline-none focus:border-sage-green focus:bg-white transition-all placeholder:text-golden-chestnut/40"
                        autoFocus
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={phone.length < 10 || isLoading}
                    className="w-full py-4 bg-sage-green text-white rounded-xl font-bold text-lg hover:-translate-y-1 hover:shadow-lg hover:shadow-sage-green/25 transition-all duration-300 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center justify-center gap-2 mt-4"
                  >
                    {isLoading ? <Loader2 className="animate-spin" /> : "Send OTP"}
                    {!isLoading && <ArrowRight size={20} />}
                  </button>
                </form>
              </motion.div>
            )}

            {/* STEP 2: OTP VERIFICATION */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col h-full justify-center"
              >
                <button 
                  onClick={() => setStep(1)}
                  className="w-fit mb-6 text-golden-chestnut hover:text-sage-green flex items-center gap-1 font-medium transition-colors"
                >
                  <ArrowLeft size={16} /> Back
                </button>

                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-pitch-black font-heading mb-2">Verify Number</h1>
                  <p className="text-golden-chestnut font-medium">
                    We've sent a 6-digit verification code to <br />
                    <span className="font-bold text-pitch-black">+91 {phone.slice(0,5)} {phone.slice(5)}</span>
                  </p>
                </div>

                <form onSubmit={handleVerifyOtp} className="flex flex-col gap-8">
                  <div className="flex justify-between gap-2 sm:gap-4">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        // @ts-expect-error - React 19 ref assignment
                        ref={(el) => (otpRefs.current[index] = el)}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold text-pitch-black bg-floral-white border-2 border-[#F0EBE1] rounded-xl outline-none focus:border-sage-green focus:bg-white transition-all focus:-translate-y-1 focus:shadow-md"
                      />
                    ))}
                  </div>

                  <button
                    type="submit"
                    disabled={otp.join("").length < 6 || isLoading}
                    className="w-full py-4 bg-pitch-black text-white rounded-xl font-bold text-lg hover:-translate-y-1 hover:shadow-lg hover:shadow-pitch-black/25 transition-all duration-300 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center justify-center gap-2"
                  >
                    {isLoading ? <Loader2 className="animate-spin" /> : "Verify & Continue"}
                  </button>
                </form>

                <div className="flex justify-center mt-8 text-sm font-medium text-golden-chestnut">
                  Didn't receive the code? 
                  <button className="ml-1 text-sage-green font-bold hover:underline">Resend OTP</button>
                </div>
              </motion.div>
            )}
            
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}