// app/(auth)/login/page.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sprout, ShieldCheck, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

// Custom Google SVG Icon
const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

export default function LoginPage() {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        // This tells Supabase where to send the user AFTER they click their Google account
        redirectTo: `${window.location.origin}/auth/callback`,
      }
    });

    if (error) {
      setErrorMsg(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-floral-white flex items-center justify-center p-6 relative overflow-hidden font-body">
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
          
          <div className="relative z-10 flex items-center gap-3 mt-12 text-white/90 font-medium text-sm">
            <ShieldCheck size={20} />
            <span>Secured by Google Auth</span>
          </div>
        </div>

        {/* Right Side: Authentication Form */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center relative bg-white">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col h-full justify-center"
          >
            <div className="mb-10 text-center md:text-left">
              <h1 className="text-3xl font-bold text-pitch-black font-heading mb-3">Welcome Back</h1>
              <p className="text-golden-chestnut font-medium">Sign in to your account to continue trading securely.</p>
            </div>

            {errorMsg && (
              <p className="text-red-500 text-sm font-bold bg-red-500/10 p-3 rounded-lg border border-red-500/20 mb-6">
                {errorMsg}
              </p>
            )}

            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full py-4 bg-white border-2 border-[#F0EBE1] text-pitch-black rounded-xl font-bold text-lg hover:border-sage-green hover:shadow-md hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center justify-center"
            >
              {isLoading ? (
                <Loader2 className="animate-spin text-golden-chestnut" size={24} />
              ) : (
                <>
                  <GoogleIcon />
                  Continue with Google
                </>
              )}
            </button>

            <div className="mt-8 flex items-center justify-center">
              <div className="h-px bg-[#F0EBE1] flex-1" />
              <span className="px-4 text-sm font-bold text-golden-chestnut uppercase tracking-wider">New to KisanSetu?</span>
              <div className="h-px bg-[#F0EBE1] flex-1" />
            </div>

            <Link href="/register" className="mt-8 w-full py-4 bg-pitch-black text-white text-center rounded-xl font-bold text-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              Create an Account
            </Link>

          </motion.div>
        </div>
      </div>
    </div>
  );
}