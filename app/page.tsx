"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
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
    if (!video) return;

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
        progress += 5;
        if (progress > 90) clearInterval(interval);
        else setLoadProgress(progress);
      }, 100);

      video.addEventListener("loadeddata", () => {
        clearInterval(interval);
        handleLoadedData();
      });

      return () => {
        clearInterval(interval);
        video.removeEventListener("loadeddata", handleLoadedData);
      };
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
  }, [isLoading]);

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
      <div ref={heroContainerRef} className="relative min-h-[600vh]">
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
              preload="auto"
            />
            <video
              ref={video2Ref}
              className="absolute inset-0 w-full h-full object-contain md:object-cover object-center transition-opacity duration-300 opacity-0 video-mask"
              src="/images/end-smooth.mp4"
              playsInline
              muted
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
        <FeaturesSection />
        <SplitSection />
        <NumberedSection />
        <DiagramSection />
        <ModelViewer />
        <Footer />
      </div>

      {/* Spec Sheet slide-out Drawer */}
      <SpecsDrawer
        isOpen={isSpecsOpen}
        onClose={() => setIsSpecsOpen(false)}
      />
    </main>
  );
}
