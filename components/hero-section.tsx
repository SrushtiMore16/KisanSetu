// components/hero-section.tsx
"use client";

import { useEffect, useRef } from "react";
import { createTimeline, stagger } from "animejs";

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      const tl = createTimeline({ 
        defaults: { ease: "easeOutExpo", duration: 1200 } 
      });

      tl.add(".hero-heading-line", {
        translateY: ["100%", "0%"],
        opacity: [0, 1],
        delay: stagger(200),
      })
      .add(".hero-subtitle", {
        translateY: [20, 0],
        opacity: [0, 1],
      }, "-=800")
      .add(".hero-action-btn", {
        scale: [0.9, 1],
        opacity: [0, 1],
      }, "-=800")
      .add(".hero-image-bg", {
        scale: [1.05, 1],
        opacity: [0, 1],
        duration: 2500,
        ease: "easeOutSine",
      }, 0);
    }
  }, []);

  return (
    <section 
      ref={heroRef} 
      className="relative min-h-[90vh] flex items-center w-full bg-floral-white overflow-hidden"
    >
      {/* Right-aligned dissolving image */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[65%] z-0 pointer-events-none">
        <div 
          className="hero-image-bg absolute inset-0 w-full h-full opacity-0"
          style={{
            backgroundImage: "url('/HeroRight.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center 30%", // Adjusts focal point slightly higher
            /* 
              UI/UX Improvement: Replaced linear-gradient with an elliptical radial-gradient. 
              This anchors the solid image to the right-center and organically fades it out 
              towards the left, top, and bottom, removing any harsh straight edges at the footer.
            */
            WebkitMaskImage: "radial-gradient(ellipse 110% 100% at 100% 45%, black 25%, transparent 85%)",
            maskImage: "radial-gradient(ellipse 110% 100% at 100% 45%, black 25%, transparent 85%)",
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center">
        
        {/* Left-Aligned Text Content */}
        {/* Increased width to lg:w-[60%] to allow larger text to flow better */}
        <div className="w-full lg:w-[60%] flex flex-col items-start text-left gap-8 pt-24 lg:pt-0">
          
          {/* Increased font sizes significantly: text-[4rem] to text-[6.5rem] with tighter tracking/leading */}
          <h1 className="text-[4rem] md:text-[5.5rem] lg:text-[6.5rem] font-bold tracking-tighter leading-[1.05] text-pitch-black">
            <span className="overflow-hidden inline-block pb-2">
              <span className="hero-heading-line inline-block opacity-0">
                Empowering Farmers,
              </span>
            </span>
            <br />
            <span className="overflow-hidden inline-block pb-2 text-sage-green">
              <span className="hero-heading-line inline-block opacity-0">
                Connecting Markets.
              </span>
            </span>
          </h1>

          {/* Increased subtitle size to text-2xl and expanded max-width to balance the large heading */}
          <p className="hero-subtitle text-xl md:text-2xl font-medium text-golden-chestnut max-w-xl opacity-0">
            Manage your crop lifecycle, get AI-powered diagnostics, and negotiate directly with traders in one seamless platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto">
            {/* Replaced split buttons with a single, highly prominent CTA button */}
            <button className="hero-action-btn opacity-0 px-10 py-5 text-white rounded-2xl font-bold text-lg hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 w-full sm:w-auto shadow-xl shadow-sage-green/30 bg-sage-green">
              Explore KisanSetu
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}