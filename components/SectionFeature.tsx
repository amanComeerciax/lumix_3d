"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionFeatureProps {
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  align?: "left" | "right";
}

export default function SectionFeature({ title, subtitle, description, imageSrc, align = "left" }: SectionFeatureProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect on the background image
      gsap.fromTo(
        imageRef.current,
        { yPercent: -15, scale: 1.1 },
        {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Text reveal animation
      gsap.fromTo(
        textRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%", // When top of section hits 60% of viewport
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert(); // Cleanup GSAP on unmount
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden bg-black flex items-center">
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          ref={imageRef}
          src={imageSrc}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        {/* Gradient Overlay for Text Contrast */}
        <div className={`absolute inset-0 bg-gradient-to-${align === "left" ? "r" : "l"} from-black via-black/60 to-transparent`}></div>
      </div>

      {/* Content */}
      <div className={`relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex ${align === "right" ? "justify-end text-right" : "justify-start text-left"}`}>
        <div ref={textRef} className="max-w-xl">
          <h3 className="text-electricCyan text-[11px] uppercase tracking-[0.25em] font-bold mb-4">
            {subtitle}
          </h3>
          <h2 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter leading-tight mb-6">
            {title}
          </h2>
          <p className="text-lg text-white/80 font-normal leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
