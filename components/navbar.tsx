// components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sprout, Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Define the navigation links here
const navLinks = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/#features" }, // Newly added Features link
  { name: "Marketplace", href: "/market" },
  { name: "About Us", href: "/about" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Handle sticky navbar frosted glass effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-body ${
        isScrolled ? "bg-floral-white/90 backdrop-blur-md border-b border-[#F0EBE1] py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group z-50">
          <div className="p-2 rounded-xl bg-sage-green text-white group-hover:scale-105 transition-transform">
            <Sprout size={24} strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-bold tracking-tight text-pitch-black font-heading">
            KisanSetu
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href === '/#features' && pathname === '/');
            
            return (
              <Link 
                key={link.name} 
                href={link.href}
                className="relative text-sm font-bold group"
              >
                <span className={`transition-colors ${isActive ? "text-sage-green" : "text-golden-chestnut group-hover:text-pitch-black"}`}>
                  {link.name}
                </span>
                
                {/* Hover Underline Animation */}
                <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-sage-green transition-all group-hover:w-full rounded-full" />
              </Link>
            )
          })}
        </nav>

        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link 
            href="/login" 
            className="text-sm font-bold text-pitch-black hover:text-sage-green transition-colors"
          >
            Log In
          </Link>
          <Link 
            href="/register" 
            className="flex items-center gap-2 px-6 py-2.5 bg-pitch-black text-white rounded-xl text-sm font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all group"
          >
            Get Started <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-pitch-black z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-[#F0EBE1] shadow-lg p-6 flex flex-col gap-6 md:hidden"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-bold text-pitch-black hover:text-sage-green transition-colors pb-2 border-b border-[#F0EBE1]/50"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-3 pt-2">
              <Link 
                href="/login" 
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 text-center rounded-xl border border-[#F0EBE1] text-pitch-black font-bold text-sm"
              >
                Log In
              </Link>
              <Link 
                href="/register" 
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 text-center rounded-xl bg-pitch-black text-white font-bold text-sm"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}