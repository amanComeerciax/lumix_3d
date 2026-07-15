"use client";

import React, { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

interface NavbarProps {
  onSpecsClick: () => void;
  onNavigate: (section: "start" | "exploded" | "end") => void;
}

export default function Navbar({ onSpecsClick, onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "glass-nav py-3 h-14"
          : "bg-transparent py-6 h-20"
      } flex items-center justify-between px-6 md:px-12 select-none`}
    >
      {/* Brand logo & product title */}
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 rounded-full border border-electricCyan flex items-center justify-center text-electricCyan font-bold text-[10px]">
          L
        </div>
        <span className="text-white text-base tracking-[0.25em] font-extrabold uppercase hover:opacity-85 transition-opacity cursor-pointer" onClick={() => onNavigate("start")}>
          LUMIX
        </span>
        <div className="w-[1px] h-4 bg-white/20"></div>
        <span className="text-[11px] text-white/50 tracking-widest font-mono font-medium">
          NOVA ELITE
        </span>
      </div>

      {/* Center navigation links */}
      <nav className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.18em] text-white/60 font-semibold">
        <button
          onClick={() => onNavigate("start")}
          className="hover:text-white hover:opacity-100 opacity-80 transition-all duration-300 relative group py-1"
        >
          Assembly
          <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-electricCyan transition-all duration-300 group-hover:w-full"></span>
        </button>
        <button
          onClick={() => onNavigate("exploded")}
          className="hover:text-white hover:opacity-100 opacity-80 transition-all duration-300 relative group py-1"
        >
          Exploded View
          <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-electricCyan transition-all duration-300 group-hover:w-full"></span>
        </button>
        <button
          onClick={onSpecsClick}
          className="hover:text-white hover:opacity-100 opacity-80 transition-all duration-300 relative group py-1"
        >
          Specs
          <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-electricCyan transition-all duration-300 group-hover:w-full"></span>
        </button>
      </nav>

      {/* Right side CTA & Mobile Menu Toggle */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => onNavigate("end")}
          className="glow-button group flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white hover:border-electricCyan/50 hover:bg-white/10 transition-all duration-500"
        >
          <span className="text-[10px] uppercase font-bold tracking-widest text-white/95">
            Pre-order
          </span>
          <ArrowUpRight size={12} className="text-white/60 group-hover:text-electricCyan transition-colors" />
        </button>

        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="md:hidden text-white/80 hover:text-white transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 flex flex-col items-center gap-6 md:hidden overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? "max-h-64 py-8 opacity-100" : "max-h-0 py-0 opacity-0 border-transparent"
        }`}
      >
        <button onClick={() => { onNavigate("start"); setIsMobileMenuOpen(false); }} className="text-xs uppercase tracking-[0.2em] text-white/80 hover:text-white">Assembly</button>
        <button onClick={() => { onNavigate("exploded"); setIsMobileMenuOpen(false); }} className="text-xs uppercase tracking-[0.2em] text-white/80 hover:text-white">Exploded View</button>
        <button onClick={() => { onSpecsClick(); setIsMobileMenuOpen(false); }} className="text-xs uppercase tracking-[0.2em] text-white/80 hover:text-white">Specs</button>
      </div>
    </header>
  );
}
