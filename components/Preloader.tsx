"use client";

import React, { useEffect, useState } from "react";
import { Cpu, Wifi, Radio, AudioLines } from "lucide-react";

interface PreloaderProps {
  progress: number;
  active: boolean;
}

export default function Preloader({ progress, active }: PreloaderProps) {
  const [shouldRender, setShouldRender] = useState(active);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (!active) {
      setFade(true);
      const timer = setTimeout(() => setShouldRender(false), 800);
      return () => clearTimeout(timer);
    } else {
      setShouldRender(true);
      setFade(false);
    }
  }, [active]);

  // High-end engineering subtexts based on percentage
  const getSubtext = () => {
    if (progress < 25) return { text: "Initializing Neural Core V2 Interface...", icon: Cpu };
    if (progress < 50) return { text: "Calibrating 40mm Composite Transducers...", icon: AudioLines };
    if (progress < 75) return { text: "Mapping Multi-Microphone Feedback Arrays...", icon: Radio };
    if (progress < 99) return { text: "Establishing Ultra-LDAC Wireless Protocol...", icon: Wifi };
    return { text: "System Optimized. Ready for Audio Silence.", icon: Cpu };
  };

  if (!shouldRender) return null;

  const ActiveIcon = getSubtext().icon;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-all duration-700 ease-out-expo ${
        fade ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
      style={{
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)"
      }}
    >
      {/* Background Radial Glow */}
      <div className="absolute inset-0 radial-bg-glow opacity-60 animate-pulse-slow"></div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-40"></div>

      {/* Content wrapper */}
      <div className="relative flex flex-col items-center max-w-md w-full px-8 text-center select-none">
        
        {/* Lumix Flagship Tag */}
        <div className="overflow-hidden mb-6">
          <p className="text-electricCyan font-mono text-xs md:text-sm tracking-[0.3em] uppercase">
            Lumix Acoustics Engineering
          </p>
        </div>

        {/* Outer Circular Glow Loading */}
        <div className="relative w-36 h-36 flex items-center justify-center mb-10">
          <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="44"
              className="stroke-white/5"
              strokeWidth="1.5"
              fill="transparent"
            />
            {/* Animated progress circle */}
            <circle
              cx="50"
              cy="50"
              r="44"
              className="stroke-electricCyan transition-all duration-300"
              strokeWidth="2"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 44}
              strokeDashoffset={2 * Math.PI * 44 * (1 - progress / 100)}
              strokeLinecap="round"
              style={{
                filter: "drop-shadow(0px 0px 8px #00D6FF)"
              }}
            />
          </svg>

          {/* Central progress value */}
          <div className="flex flex-col items-center justify-center">
            <span className="text-4xl font-extrabold tracking-tighter text-white font-mono">
              {progress}
              <span className="text-xl text-white/55">%</span>
            </span>
          </div>
        </div>

        {/* Text Area */}
        <div className="h-16 flex flex-col items-center justify-start">
          <div className="flex items-center gap-2 mb-2 text-electricCyan text-stroke-glow text-sm font-semibold tracking-wider transition-all duration-300">
            <ActiveIcon size={16} className="animate-pulse" />
            <span className="uppercase text-[11px] tracking-widest">
              Diagnostic Status
            </span>
          </div>
          <p className="text-xs text-white/60 tracking-wide font-light max-w-[280px]">
            {getSubtext().text}
          </p>
        </div>

        {/* Bottom load bar */}
        <div className="w-full h-[1px] bg-white/5 rounded-full overflow-hidden mt-8 relative">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-electricCyan transition-all duration-300 shadow-[0_0_10px_#00D6FF]"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        {/* Security / Corporate stamp */}
        <span className="text-[9px] uppercase tracking-[0.25em] text-white/25 mt-16 font-mono">
          Model Code: NOVA ELITE // Rev 1.0.0
        </span>
      </div>
    </div>
  );
}
