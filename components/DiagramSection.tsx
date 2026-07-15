"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function DiagramSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

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
    );
  }, []);

  return (
    <section id="diagram-section" ref={containerRef} className="w-full h-screen bg-black py-24 px-6 lg:px-24 flex items-center justify-center">
      <div className="max-w-[1440px] w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        
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

        {/* Right Image Placeholder */}
        <div className="w-full md:w-1/2 relative min-h-[500px] flex justify-center items-center mt-10 md:mt-0 pointer-events-none">
          
          <div className="w-full max-w-[450px] aspect-square">
             {/* Sticky morphed image goes here */}
          </div>

        </div>

      </div>
    </section>
  );
}
