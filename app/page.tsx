"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";
import SpecsDrawer from "@/components/SpecsDrawer";
import { ChevronDown } from "lucide-react";
import FeaturesSection from "@/components/FeaturesSection";
import SplitSection from "@/components/SplitSection";
import NumberedSection from "@/components/NumberedSection";
import DiagramSection from "@/components/DiagramSection";
import ModelViewer from "@/components/ModelViewer";
import Footer from "@/components/Footer";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const stickyContainerRef = useRef<HTMLDivElement>(null);
  const storyWrapperRef = useRef<HTMLDivElement>(null);
  const stickyMorphRef = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLImageElement>(null);
  const morphGlowRef = useRef<HTMLDivElement>(null);
  
  const bgColor1Ref = useRef<string>("#000");
  const bgColor2Ref = useRef<string>("#000");
  
  // Loading states
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  
  // Refs for animation loop
  const scrollTargetRef = useRef(0);
  const scrollCurrentRef = useRef(0);
  const animationFrameIdRef = useRef<number | null>(null);

  // Refs for direct DOM scroll updates
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // Dynamic Background Color Extraction
  useEffect(() => {
    const extractColor = (video: HTMLVideoElement, targetRef: React.MutableRefObject<string>) => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = 1;
        canvas.height = 1;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;
        // Sample a pixel slightly inside the top-left corner
        ctx.drawImage(video, 10, 10, 1, 1, 0, 0, 1, 1);
        const data = ctx.getImageData(0, 0, 1, 1).data;
        const r = data[0];
        const g = data[1];
        const b = data[2];
        targetRef.current = `rgb(${r}, ${g}, ${b})`;
      } catch (e) {
        console.warn("Could not extract video color:", e);
      }
    };

    const v1 = videoRef.current;
    const v2 = video2Ref.current;

    const onData1 = () => extractColor(v1!, bgColor1Ref);
    const onData2 = () => extractColor(v2!, bgColor2Ref);

    if (v1) {
      v1.addEventListener("loadeddata", onData1);
      if (v1.readyState >= 3) onData1();
    }
    if (v2) {
      v2.addEventListener("loadeddata", onData2);
      if (v2.readyState >= 3) onData2();
    }

    return () => {
      v1?.removeEventListener("loadeddata", onData1);
      v2?.removeEventListener("loadeddata", onData2);
    };
  }, []);

  // Video Loading Logic
  useEffect(() => {
    const video = videoRef.current;
    const video2 = video2Ref.current;
    if (!video || !video2) return;

    // Force pause videos to prevent them from actually playing on mobile
    // We only use autoPlay in the HTML tag to force iOS to download the frames
    video.pause();
    video2.pause();

    const handleLoadedData = () => {
      setLoadProgress(100);
      setTimeout(() => {
        setIsLoading(false);
      }, 600);
    };

    if (video.readyState >= 3) {
      handleLoadedData();
    } else {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 10) + 5;
        if (progress > 99) {
          progress = 99;
          setLoadProgress(99);
          clearInterval(interval);
        } else {
          setLoadProgress(progress);
        }
      }, 100);

      // Fallback: Force finish loader after 3.5 seconds to prevent getting stuck
      const fallbackTimer = setTimeout(() => {
        clearInterval(interval);
        handleLoadedData();
      }, 3500);

      const onVideoLoad = () => {
        clearInterval(interval);
        clearTimeout(fallbackTimer);
        handleLoadedData();
      };

      video.addEventListener("loadeddata", onVideoLoad);
      video.addEventListener("canplay", onVideoLoad);

      return () => {
        clearInterval(interval);
        clearTimeout(fallbackTimer);
        video.removeEventListener("loadeddata", onVideoLoad);
        video.removeEventListener("canplay", onVideoLoad);
      };
    }
  }, []);

  const updateVideoScrub = useCallback((progress: number) => {
    if (!videoRef.current || !video2Ref.current) return;

    if (progress <= 0.50) {
      // Phase 1: First Video
      videoRef.current.style.opacity = "1";
      video2Ref.current.style.opacity = "0";
      if (stickyContainerRef.current) stickyContainerRef.current.style.backgroundColor = bgColor1Ref.current;
      
      const dur = videoRef.current.duration || 0;
      if (dur > 0) {
        const phaseProgress = progress / 0.50;
        const time = Math.max(0, Math.min(dur, phaseProgress * dur));
        videoRef.current.currentTime = time;
      }
    } else {
      // Phase 2: Second Video
      videoRef.current.style.opacity = "0";
      video2Ref.current.style.opacity = "1";
      if (stickyContainerRef.current) stickyContainerRef.current.style.backgroundColor = bgColor2Ref.current;
      
      const dur = video2Ref.current.duration || 0;
      if (dur > 0) {
        const phaseProgress = (progress - 0.50) / 0.50;
        const time = Math.max(0, Math.min(dur, phaseProgress * dur));
        video2Ref.current.currentTime = time;
      }
    }
  }, []);

  const updateDOMStyles = useCallback((progress: number) => {
    if (scrollIndicatorRef.current) {
      const show = progress < 0.05;
      scrollIndicatorRef.current.style.opacity = show ? "0.8" : "0";
      scrollIndicatorRef.current.style.transform = `translate(-50%, ${show ? 0 : 20}px)`;
    }
  }, []);

  // Passive scroll listener
  useEffect(() => {
    if (isLoading) return;

    const updateAnimation = () => {
      const diff = scrollTargetRef.current - scrollCurrentRef.current;
      
      if (Math.abs(diff) < 0.0001) {
        scrollCurrentRef.current = scrollTargetRef.current;
        updateVideoScrub(scrollCurrentRef.current);
        updateDOMStyles(scrollCurrentRef.current);
        animationFrameIdRef.current = null;
        return;
      }

      scrollCurrentRef.current += diff * 0.08;
      updateVideoScrub(scrollCurrentRef.current);
      updateDOMStyles(scrollCurrentRef.current);

      animationFrameIdRef.current = requestAnimationFrame(updateAnimation);
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      
      // We only want to track progress for the 700vh hero section
      const heroHeight = (heroContainerRef.current?.clientHeight || 0) - window.innerHeight;
      const progress = heroHeight > 0 ? scrollTop / heroHeight : 0;
      
      // Cap progress at 1.0 so when we scroll into GSAP sections, the video stays at the last frame
      scrollTargetRef.current = Math.min(1.0, progress);
      
      if (animationFrameIdRef.current === null) {
        animationFrameIdRef.current = requestAnimationFrame(updateAnimation);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial position

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [isLoading, updateVideoScrub, updateDOMStyles]);

  // Sticky Morph Scroll Animation - Single ScrollTrigger approach
  useEffect(() => {
    if (isLoading) return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    if (!storyWrapperRef.current || !stickyMorphRef.current || !img1Ref.current) return;

    const morph = stickyMorphRef.current;

    // Set initial state
    gsap.set(morph, { opacity: 0, y: 100, scale: 0.8, x: 0, rotation: 0, willChange: "transform, opacity" });

    // Smooth each incoming scroll value instead of applying it directly. This
    // gives the product a small, controlled sense of inertia in both scroll
    // directions.
    const setX = gsap.quickTo(morph, "x", { duration: 0.65, ease: "power3.out" });
    const setY = gsap.quickTo(morph, "y", { duration: 0.65, ease: "power3.out" });
    const setScale = gsap.quickTo(morph, "scale", { duration: 0.6, ease: "power3.out" });
    const setRotation = gsap.quickTo(morph, "rotation", { duration: 0.7, ease: "power3.out" });
    const setOpacity = gsap.quickTo(morph, "opacity", { duration: 0.35, ease: "power2.out" });

    // Helper: smooth interpolation
    const lerp = (a: number, b: number, t: number) => a + (b - a) * Math.max(0, Math.min(1, t));
    // Helper: eased interpolation  
    const ease = (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    const getOffset = () => window.innerWidth < 768 ? 0 : Math.min(window.innerWidth * 0.28, 400);

    const trigger = ScrollTrigger.create({
      trigger: storyWrapperRef.current,
      start: "top bottom",
      end: "bottom bottom",
      scrub: 0,
      onUpdate: (self) => {
        const p = self.progress; // 0 to 1 across entire storyWrapper
        const offset = getOffset();

        // A single product render moves between the content blocks. Changing
        // the source image during scroll made the headphone look like it was
        // being replaced rather than moving.
        // Phase 1 (0-0.12): Fade in centered
        // Phase 2 (0.12-0.35): Stay centered in FeaturesSection  
        // Phase 3 (0.35-0.50): Move right for SplitSection (01)
        // Phase 4 (0.50-0.65): Move left for NumberedSection (02)
        // Phase 5 (0.65-0.80): Move right for DiagramSection (03)
        // Phase 6 (0.85-1.0): Fade out

        let x = 0, scale = 1, rotation = 0, opacity = 1, y = 0;

        if (p < 0.10) {
          // Phase 1: Fade in from below, centered
          const t = ease(p / 0.10);
          opacity = lerp(0, 1, t);
          y = lerp(100, 0, t);
          scale = lerp(0.8, 1, t);
          x = 0;
        } else if (p < 0.25) {
          // Phase 2: Stay centered in FeaturesSection
          opacity = 1;
          y = 0;
          scale = 1;
          x = 0;
        } else if (p < 0.40) {
          // Phase 3: Move right for SplitSection
          const t = ease((p - 0.25) / 0.15);
          x = lerp(0, offset, t);
          scale = lerp(1, 0.95, t);
          rotation = lerp(0, 8, t);
        } else if (p < 0.55) {
          // Hold at SplitSection position
          x = offset;
          scale = 0.95;
          rotation = 8;
        } else if (p < 0.70) {
          // Phase 4: Move left for NumberedSection
          const t = ease((p - 0.55) / 0.15);
          x = lerp(offset, -offset, t);
          scale = lerp(0.95, 1, t);
          rotation = lerp(8, -8, t);
        } else if (p < 0.78) {
          // Hold at NumberedSection position
          x = -offset;
          scale = 1;
          rotation = -8;
        } else if (p < 0.88) {
          // Phase 5: Move right for DiagramSection
          const t = ease((p - 0.78) / 0.10);
          x = lerp(-offset, offset, t);
          scale = 1;
          rotation = lerp(-8, 5, t);
        } else if (p < 0.99) {
          // Hold at DiagramSection position - stay visible!
          x = offset;
          scale = 1;
          rotation = 5;
        } else {
          // Keep the product visible in its final position after the story.
          x = offset;
          scale = 1;
          rotation = 5;
          opacity = 1;
          y = 0;
        }

        setX(x);
        setY(y);
        setScale(scale);
        setRotation(rotation);
        setOpacity(opacity);
      }
    });

    return () => {
      trigger.kill();
      gsap.killTweensOf(morph);
    };
  }, [isLoading]);



  // Navigate to sections smoothly
  const handleNavigate = (section: "start" | "exploded" | "end") => {
    const heroHeight = (heroContainerRef.current?.clientHeight || 0) - window.innerHeight;

    let targetTop = 0;
    switch (section) {
      case "start":
        targetTop = 0;
        break;
      case "exploded":
        targetTop = heroHeight * 0.50;
        break;
      case "end":
        targetTop = heroHeight;
        break;
    }

    window.scrollTo({
      top: targetTop,
      behavior: "smooth",
    });
  };

  return (
    <main className="bg-black text-white selection:bg-electricCyan/30 selection:text-white">
      {/* Preloader */}
      <Preloader progress={loadProgress} active={isLoading} />

      {/* Navigation */}
      {!isLoading && (
        <Navbar
          onSpecsClick={() => setIsSpecsOpen(true)}
          onNavigate={handleNavigate}
        />
      )}

      {/* Scrubber Hero Section */}
      <div ref={heroContainerRef} className="relative min-h-[400vh] sm:min-h-[500vh] md:min-h-[600vh]">
        {/* Sticky Video Container */}
        <div ref={stickyContainerRef} className="sticky top-0 left-0 w-screen h-[100dvh] overflow-hidden bg-black transition-colors duration-700 ease-out z-10 flex items-center justify-center">
          
          {/* Main Videos */}
          <div className="absolute inset-0 w-full h-full z-10 flex items-center justify-center">
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-contain md:object-cover object-center transition-opacity duration-300 video-mask"
              src="/images/hero-smooth.mp4"
              playsInline
              muted
              autoPlay
              preload="auto"
            />
            <video
              ref={video2Ref}
              className="absolute inset-0 w-full h-full object-contain md:object-cover object-center transition-opacity duration-300 opacity-0 video-mask"
              src="/images/Exploded_headphone_animation_1080p_202607171232_processed.mp4"
              playsInline
              muted
              autoPlay
              preload="auto"
            />
          </div>

          {/* Floating Scroll Indicator */}
          <div
            ref={scrollIndicatorRef}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-80 pointer-events-none transition-all duration-700 z-20"
          >
            <span className="text-[9px] uppercase tracking-[0.25em] text-white/40 font-semibold">
              Scroll to explore
            </span>
            <ChevronDown size={14} className="text-electricCyan animate-bounce" />
          </div>
        </div>
      </div>

      {/* New Storytelling Sections */}
      <div className="relative z-20 bg-black">
        
        {/* Wrapper for the 4 animated sections */}
        <div ref={storyWrapperRef} className="relative w-full">
          
          {/* Native Sticky Morph Container */}
          <div className="absolute inset-0 pointer-events-none z-50">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden transition-opacity duration-75">
              <div ref={stickyMorphRef} className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] flex items-center justify-center md:-mt-20">
                
                <div className="relative w-full h-full">
                  <img
                    ref={img1Ref}
                    src="/images/premium-headphone-v1.png"
                    alt="Headphone"
                    className="absolute inset-0 w-full h-full object-contain"
                  />
              {/* Glow Flash Overlay */}
              <div ref={morphGlowRef} className="absolute inset-0 rounded-full bg-cyan-400/50 blur-3xl opacity-0 pointer-events-none" />
              </div>
              
            </div>
          </div>
          </div>
          <FeaturesSection />
          <SplitSection />
          <NumberedSection />
          <DiagramSection />
        </div>
      </div>

      <ModelViewer />
      <Footer />

      {/* Spec Sheet slide-out Drawer */}
      <SpecsDrawer
        isOpen={isSpecsOpen}
        onClose={() => setIsSpecsOpen(false)}
      />
    </main>
  );
}
