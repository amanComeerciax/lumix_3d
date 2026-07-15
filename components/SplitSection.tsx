"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SplitSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

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
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    ).fromTo(
      imageRef.current,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power4.out" },
      "-=0.5"
    );
  }, []);

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden bg-black pt-24 md:pt-32 pb-40">
      
      {/* Top Black Bar with Title */}
      <div className="relative w-full bg-black py-12 px-6 lg:px-24 z-20">
        <h2 className="text-4xl md:text-5xl font-bold text-white max-w-6xl mx-auto">
          Why Choose Lumix
        </h2>
      </div>

      {/* Main Split Content Area */}
      <div className="relative w-full bg-white py-16 md:py-24">
        
        <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between min-h-[400px] px-6 lg:px-24">
          
          {/* Text Content (Left) */}
          <div ref={textRef} className="w-full md:w-1/2 text-black pr-0 md:pr-10">
            <h3 className="text-6xl md:text-8xl font-bold mb-4 tracking-tighter">
              01
            </h3>
            <h4 className="text-2xl font-bold mb-6">
              Designed By Professinal
            </h4>
            <p className="text-gray-600 text-sm font-medium mb-10 max-w-md leading-relaxed">
              Lorem ipsum dolor sit amet consectetur. Eget est nunc tellus sagittis. 
              Proin morbi elementum scelerisque lorem justo consectetur sit
              sollicitudin nibh. Non no
            </p>
            <button className="bg-black text-white px-10 py-4 text-sm font-semibold hover:bg-black/80 transition-colors">
              Explore More
            </button>
          </div>

          {/* Overlapping Image (Right) */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end -mt-20 md:-mt-48 -mb-20 md:-mb-48 relative z-20">
            <div className="relative w-full max-w-[450px] aspect-square rounded-full overflow-hidden">
              <img 
                ref={imageRef}
                src="/images/headphone_split.png" 
                alt="Headphone Side" 
                className="w-full h-full object-cover scale-[1.05]" 
              />
            </div>
          </div>

        </div>
      </div>
      
    </section>
  );
}
