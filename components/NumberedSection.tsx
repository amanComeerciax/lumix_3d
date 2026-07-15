"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function NumberedSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
      }
    });

    tl.fromTo(
      textRef.current,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  return (
    <section id="numbered-section" ref={containerRef} className="w-full min-h-screen flex items-center justify-center bg-black py-10 px-6 lg:px-24 border-t border-white/5">
      <div className="max-w-[1440px] w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
        
        {/* Left Image Placeholder */}
        <div className="w-full md:w-1/2 flex justify-center items-center h-[400px] md:h-[500px] pointer-events-none">
           {/* Sticky morphed image goes here */}
        </div>

        {/* Right Text */}
        <div ref={textRef} className="w-full md:w-1/2 text-white pl-0 md:pl-10 flex md:justify-end">
          <div className="w-full max-w-md flex flex-col items-start md:items-end text-left md:text-right">
            <h3 className="text-6xl md:text-8xl font-bold mb-4 tracking-tighter text-white/20">
              02
            </h3>
            <h4 className="text-3xl md:text-5xl font-bold mb-8 max-w-md">
              The sound movement can reach the soul
            </h4>
            <p className="text-gray-400 text-base leading-relaxed max-w-md mb-10">
              Lorem ipsum dolor sit amet consectetur. Eget est nunc tellus sagittis. 
              Proin morbi elementum scelerisque lorem justo consectetur sit sollicitudin nibh. 
              Non no elementum scelerisque lorem justo
            </p>
            <button className="bg-white text-black font-semibold py-3 px-8 text-sm uppercase tracking-wider hover:bg-gray-200 transition-colors">
              Explore More
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
