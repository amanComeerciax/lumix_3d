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
  const img2Ref = useRef<HTMLImageElement>(null);
  const img3Ref = useRef<HTMLImageElement>(null);
  const img4Ref = useRef<HTMLImageElement>(null);
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

  // Sticky Morph Scroll Animation
  useEffect(() => {
    if (isLoading) return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    if (!storyWrapperRef.current || !stickyMorphRef.current || !img1Ref.current || !img2Ref.current || !img3Ref.current || !img4Ref.current) return;

    // Reset initial state for all images and container
    gsap.set(stickyMorphRef.current, { opacity: 0, y: 150, scale: 0.8, x: 0, rotation: 0, willChange: "transform, opacity" });
    gsap.set(img1Ref.current, { opacity: 1 });
    gsap.set(img2Ref.current, { opacity: 0 });
    gsap.set(img3Ref.current, { opacity: 0 });
    gsap.set(img4Ref.current, { opacity: 0 });

    // Phase 1: Fade in at FeaturesSection
    gsap.to(stickyMorphRef.current, {
      scrollTrigger: {
        trigger: storyWrapperRef.current,
        start: "top 70%",
        end: "top 30%",
        scrub: 2,
      },
      opacity: 1,
      y: 0,
      scale: 1.2,
      ease: "power2.out",
    });

    // Helper: Create morph transition - smooth movement + crossfade
    const createMorphTransition = (
      triggerEl: string,
      targetX: () => number,
      targetScale: number,
      targetRotation: number,
      fadeOutImg: HTMLImageElement | null,
      fadeInImg: HTMLImageElement | null
    ) => {
      // Movement completes early so headphone is in position before section is visible
      gsap.to(stickyMorphRef.current, {
        scrollTrigger: { trigger: triggerEl, start: "top bottom", end: "40% bottom", scrub: 1 },
        x: targetX,
        scale: targetScale,
        rotation: targetRotation,
        ease: "power2.inOut"
      });

      // Quick crossfade in the first 30%
      gsap.to(fadeOutImg, { 
        scrollTrigger: { trigger: triggerEl, start: "top bottom", end: "25% bottom", scrub: 1 },
        opacity: 0,
        ease: "power1.inOut"
      });
      gsap.to(fadeInImg, { 
        scrollTrigger: { trigger: triggerEl, start: "top bottom", end: "25% bottom", scrub: 1 },
        opacity: 1,
        ease: "power1.inOut"
      });
    };

    // Phase 2: SplitSection (Move Right)
    createMorphTransition(
      "#split-section",
      () => window.innerWidth < 768 ? 0 : Math.min(window.innerWidth * 0.35, 500),
      0.95, 8,
      img1Ref.current, img2Ref.current
    );

    // Phase 3: NumberedSection (Move Left)
    createMorphTransition(
      "#numbered-section",
      () => window.innerWidth < 768 ? 0 : -Math.min(window.innerWidth * 0.35, 500),
      1.0, -8,
      img2Ref.current, img3Ref.current
    );

    // Phase 4: DiagramSection (Move Right)
    createMorphTransition(
      "#diagram-section",
      () => window.innerWidth < 768 ? 0 : Math.min(window.innerWidth * 0.35, 500),
      1, 5,
      img3Ref.current, img4Ref.current
    );




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
              autoPlay
              preload="auto"
            />
            <video
              ref={video2Ref}
              className="absolute inset-0 w-full h-full object-contain md:object-cover object-center transition-opacity duration-300 opacity-0 video-mask"
              src="/images/end-smooth.mp4"
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
              <div ref={stickyMorphRef} className="relative w-full max-w-[450px] aspect-square flex items-center justify-center -mt-20">
                
                <div className="relative w-full h-full animate-float">
              <img 
                ref={img1Ref}
                src="/images/headphone_features_transparent.png"
                alt="Headphone"
                className="absolute inset-0 w-full h-full object-contain"
              />
              
              <img 
                ref={img2Ref}
                src="/images/headphone_split_transparent.png"
                alt="Headphone Side"
                className="absolute inset-0 w-full h-full object-contain"
              />
              
              <img 
                ref={img3Ref}
                src="/images/numbered_headphone_transparent.png"
                alt="Headphone Angle"
                className="absolute inset-0 w-full h-full object-contain"
              />
              
                <img 
                  ref={img4Ref}
                  src="/images/headphone_diagram_transparent.png"
                  alt="Headphone Diagram"
                  className="absolute inset-0 w-full h-full object-cover scale-[1.1]"
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
