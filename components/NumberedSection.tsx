"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function NumberedSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

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
      imageRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    ).fromTo(
      textRef.current,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    );
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-black py-24 px-6 lg:px-24 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
        
        {/* Left Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <img 
            ref={imageRef}
            src="/images/numbered_headphone.png" 
            alt="Headphone Details" 
            className="w-full max-w-[500px] object-contain scale-[1.1]" 
          />
        </div>

        {/* Right Text */}
        <div ref={textRef} className="w-full md:w-1/2 text-white pl-0 md:pl-10">
          <h3 className="text-7xl font-bold mb-4 tracking-tighter">
            02
          </h3>
          <h4 className="text-3xl font-bold mb-8 max-w-md">
            The sound movement can reach the soul
          </h4>
          <p className="text-gray-400 text-sm font-medium mb-10 max-w-md leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. Eget est nunc tellus sagittis. 
            Proin morbi elementum scelerisque lorem justo consectetur sit
            sollicitudin nibh. Non no elementum scelerisque lorem justo
          </p>
          <button className="bg-white text-black px-8 py-3 text-sm font-semibold hover:bg-gray-200 transition-colors">
            Explore More
          </button>
        </div>

      </div>
    </section>
  );
}
