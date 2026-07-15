"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function DiagramSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
      }
    });

    tl.fromTo(
      textRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    ).fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
      "-=0.4"
    );
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-black py-24 px-6 lg:px-24">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Left Text */}
        <div ref={textRef} className="w-full md:w-1/2 text-white">
          <h3 className="text-7xl font-bold mb-4 tracking-tighter">
            03
          </h3>
          <h4 className="text-3xl font-bold mb-8 max-w-sm">
            Musical Sound, Stylish Quality
          </h4>
          <p className="text-gray-400 text-sm font-medium mb-10 max-w-sm leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. Eget est nunc tellus sagittis. 
            Proin morbi elementum scelerisque lorem justo
          </p>
          <button className="bg-white text-black px-8 py-3 text-sm font-semibold hover:bg-gray-200 transition-colors">
            Explore More
          </button>
        </div>

        {/* Right Image with Diagram Overlay */}
        <div ref={imageRef} className="w-full md:w-1/2 relative min-h-[500px] flex justify-center items-center mt-10 md:mt-0">
          
          <img 
            src="/images/headphone_diagram.png" 
            alt="Headphone Details" 
            className="w-full max-w-[450px] object-cover scale-[1.1] relative z-10" 
          />

          {/* SVG Diagram Overlay (Absolute) */}
          <svg className="absolute inset-0 w-full h-full z-20 pointer-events-none" viewBox="0 0 500 500">
            {/* Foldable Hinges Line */}
            <circle cx="280" cy="180" r="4" fill="white" />
            <path d="M 280 180 L 350 220 L 420 220" stroke="white" strokeWidth="1.5" fill="none" />
            <text x="430" y="215" fill="white" fontSize="12" fontWeight="bold">Foldable</text>
            <text x="430" y="230" fill="white" fontSize="12" fontWeight="bold">hinges</text>

            {/* Adjustable Headband Line */}
            <circle cx="230" cy="270" r="4" fill="white" />
            <path d="M 230 270 L 320 270 L 400 270" stroke="white" strokeWidth="1.5" fill="none" />
            <text x="410" y="265" fill="white" fontSize="12" fontWeight="bold">Adjustable</text>
            <text x="410" y="280" fill="white" fontSize="12" fontWeight="bold">headband</text>

            {/* 3.5mm jack Line */}
            <circle cx="260" cy="400" r="4" fill="white" />
            <path d="M 260 400 L 340 330 L 400 330" stroke="white" strokeWidth="1.5" fill="none" />
            <text x="410" y="325" fill="white" fontSize="12" fontWeight="bold">3.5 mm jack</text>
            <text x="410" y="340" fill="white" fontSize="12" fontWeight="bold">connectors</text>
          </svg>

        </div>

      </div>
    </section>
  );
}
