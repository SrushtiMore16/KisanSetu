// components/navbar.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sprout, Menu, X } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Add a subtle shadow and blur effect when the user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Marketplace", href: "#marketplace" },
    { name: "AI Diagnostics", href: "#ai" },
    { name: "About", href: "#about" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-floral-white/80 backdrop-blur-md shadow-sm py-3" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded-xl bg-sage-green/10 text-sage-green group-hover:bg-sage-green group-hover:text-white transition-colors">
            <Sprout size={24} strokeWidth={2.5} />
          </div>
          {/* Using the Pitch Black color and Times New Roman heading font */}
          <span className="text-2xl font-bold tracking-tight text-pitch-black font-heading">
            KisanSetu
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-golden-chestnut font-medium hover:text-sage-green transition-colors text-sm uppercase tracking-wider"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Authentication Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link 
            href="/login" 
            className="text-pitch-black font-semibold hover:text-sage-green transition-colors"
          >
            Log in
          </Link>
          <Link 
            href="/register" 
            className="px-5 py-2.5 bg-sage-green text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-sage-green/20 hover:-translate-y-0.5 transition-all"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-pitch-black p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-floral-white border-t border-[#F0EBE1] shadow-xl md:hidden flex flex-col"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-pitch-black hover:text-sage-green transition-colors border-b border-[#F0EBE1] pb-2"
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col gap-3 mt-4">
                <Link 
                  href="/login"
                  className="w-full py-3 text-center rounded-xl border-2 border-sage-green text-sage-green font-bold"
                >
                  Log in
                </Link>
                <Link 
                  href="/register"
                  className="w-full py-3 text-center rounded-xl bg-sage-green text-white font-bold shadow-md"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}