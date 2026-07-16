"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Activity, Headphones, BatteryFull } from "lucide-react";

export default function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
      }
    });

    // Animate text elements sliding up from below
    tl.fromTo(
      elementsRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      }
    );
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  return (
    <section ref={containerRef} className="relative min-h-screen bg-black flex flex-col items-center justify-center py-16 px-4 sm:px-6 overflow-hidden border-t border-white/5">
      <h2 
        ref={addToRefs}
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-12 sm:mb-16 md:mb-24 text-center z-10"
      >
        Sound Around The World
      </h2>
      
      <div className="relative w-full max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-8 md:gap-4">
        
        {/* Left Feature */}
        <div ref={addToRefs} className="flex flex-col items-center md:items-start text-center md:text-left z-10 order-2 md:order-1">
           <div className="w-12 h-12 sm:w-14 sm:h-14 border border-white/20 flex items-center justify-center mb-4 sm:mb-6">
             <Activity className="text-white opacity-80" size={24} />
           </div>
           <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Classic Design</h3>
           <p className="text-xs sm:text-sm text-gray-400 mb-4 sm:mb-6 font-medium leading-relaxed max-w-[250px]">
             Lorem ipsum dolor sit amet consectetur. Scelerisque nam sit amet.
           </p>
           <div className="w-full max-w-[200px] sm:max-w-[280px] h-px bg-white/40"></div>
        </div>

        {/* Center Image Placeholder */}
        <div className="flex justify-center z-10 order-1 md:order-2 my-6 md:my-0">
           <div className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[450px] md:h-[450px] pointer-events-none">
             {/* Sticky morphed image goes here */}
           </div>
        </div>
        
        {/* Right Feature */}
        <div ref={addToRefs} className="flex flex-col items-center md:items-end text-center md:text-right z-10 order-3">
           <div className="w-12 h-12 sm:w-14 sm:h-14 border border-white/20 flex items-center justify-center mb-4 sm:mb-6">
             <Headphones className="text-white opacity-80" size={24} />
           </div>
           <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Wireless Headphone</h3>
           <p className="text-xs sm:text-sm text-gray-400 mb-4 sm:mb-6 font-medium leading-relaxed max-w-[250px]">
             Lorem ipsum dolor sit amet consectetur. Scelerisque nam sit amet.
           </p>
           <div className="w-full max-w-[200px] sm:max-w-[280px] h-px bg-white/40"></div>
        </div>
        
      </div>
      
      {/* Bottom Feature */}
      <div className="w-full max-w-6xl mx-auto flex justify-center mt-8 sm:mt-12 md:-mt-12 z-10">
         <div ref={addToRefs} className="w-full md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left pl-0 md:pl-16 md:border-l border-white/40">
           <div className="w-12 h-12 sm:w-14 sm:h-14 border border-white/20 flex items-center justify-center mb-4 sm:mb-6">
             <BatteryFull className="text-white opacity-80" size={24} />
           </div>
           <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Battery Backup</h3>
           <p className="text-xs sm:text-sm text-gray-400 mb-4 sm:mb-6 font-medium leading-relaxed max-w-[250px]">
             Lorem ipsum dolor sit amet consectetur. Scelerisque nam sit amet.
           </p>
           <div className="w-full max-w-[200px] sm:max-w-[280px] h-px bg-white/40 md:hidden"></div>
         </div>
      </div>
    </section>
  );
}
