"use client";

import React, { useEffect } from "react";
import { X, Headphones, ShieldAlert, Battery, Cpu, Layers, Leaf } from "lucide-react";

interface SpecsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SpecsDrawer({ isOpen, onClose }: SpecsDrawerProps) {
  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const specCategories = [
    {
      title: "Audio Performance",
      icon: Headphones,
      specs: [
        { label: "Driver Unit", value: "40mm Carbon Fiber Composite Dome (Lumix Custom V2)" },
        { label: "Frequency Range", value: "4Hz - 48,000Hz (Hi-Res Audio Wireless)" },
        { label: "Impedance", value: "48 Ω (passive), 16 Ω (active via wire)" },
        { label: "Upscaling Engine", value: "DSEE Extreme AI Audio Enhancement" },
      ],
    },
    {
      title: "Acoustic Intelligence & ANC",
      icon: Cpu,
      specs: [
        { label: "Processor Core", value: "Dual Integrated V2 + QN2 HD Noise Cancelling Chips" },
        { label: "Microphone Array", value: "12 Omnidirectional Mics with beamforming & AI filter" },
        { label: "Adaptive ANC", value: "Real-time atmospheric & environment auto-calibration" },
        { label: "Wind Reduction", value: "Acoustic mesh structures and digital vortex suppression" },
      ],
    },
    {
      title: "Battery & Charging",
      icon: Battery,
      specs: [
        { label: "Playback (ANC On)", value: "Up to 38 hours continuous" },
        { label: "Playback (ANC Off)", value: "Up to 45 hours continuous" },
        { label: "Charging Port", value: "USB Type-C (Power Delivery compatible)" },
        { label: "Fast Charge Speed", value: "3 minutes charging provides up to 5 hours playback" },
      ],
    },
    {
      title: "Connectivity & Codecs",
      icon: Layers,
      specs: [
        { label: "Bluetooth Version", value: "Bluetooth 5.4 Class 1 (Extreme Stability Link)" },
        { label: "Supported Codecs", value: "LDAC, AAC, SBC, LC3 (LE Audio ready)" },
        { label: "Multipoint Connection", value: "Yes (seamless connection up to 3 devices simultaneously)" },
        { label: "Spatial Mapping", value: "360 Reality Audio with dynamic head tracking" },
      ],
    },
    {
      title: "Sustainability & Design",
      icon: Leaf,
      specs: [
        { label: "Sliders & Frame", value: "Recycled structural magnesium alloy" },
        { label: "Earpad Cushions", value: "High-density thermal-dissipating vegan leather" },
        { label: "Total Product Weight", value: "242 grams (optimized weight distribution)" },
        { label: "Eco Commitments", value: "100% plastic-free packaging, verified circular economy materials" },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-500 ease-out-expo cursor-crosshair"
      ></div>

      {/* Drawer Body */}
      <div
        className="relative w-full max-w-xl h-full bg-secondaryDark/95 border-l border-white/10 backdrop-blur-2xl flex flex-col shadow-2xl z-10 animate-fade-in-up"
        style={{
          animationDuration: "400ms",
          animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)"
        }}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-white/5">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.25em] text-electricCyan">
              Detailed Specifications
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight mt-1">
              Engineering Specs
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 hover:border-white/40 hover:bg-white/5 text-white/70 hover:text-white transition-all duration-300"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable specs wrapper */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-10 custom-scrollbar">
          {specCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div key={index} className="space-y-4">
                {/* Category Header */}
                <div className="flex items-center gap-3 border-b border-white/5 pb-2">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-electricCyan shadow-[0_0_15px_rgba(0,214,255,0.05)] border border-white/5">
                    <IconComponent size={16} />
                  </div>
                  <h3 className="text-xs uppercase font-bold tracking-widest text-white/90">
                    {category.title}
                  </h3>
                </div>

                {/* Specs List */}
                <dl className="grid grid-cols-1 gap-y-3.5 gap-x-4 py-2">
                  {category.specs.map((spec, sIndex) => (
                    <div key={sIndex} className="flex flex-col sm:grid sm:grid-cols-3 sm:items-baseline border-b border-white/[0.02] pb-3 sm:pb-2 last:border-0 last:pb-0">
                      <dt className="text-[10px] sm:text-xs text-white/40 font-mono tracking-wider sm:col-span-1 mb-1 sm:mb-0">
                        {spec.label}
                      </dt>
                      <dd className="text-xs text-white/85 leading-relaxed font-light sm:col-span-2 sm:pl-4">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            );
          })}
        </div>

        {/* Bottom footer tag */}
        <div className="px-8 py-5 border-t border-white/5 bg-black/40 flex justify-between items-center text-[10px] text-white/30 font-mono uppercase tracking-wider">
          <span>Lumix Audio Inc © {new Date().getFullYear()}</span>
          <span className="flex items-center gap-1.5 text-electricCyan/80">
            <ShieldAlert size={12} />
            Confidential Pre-Release Data
          </span>
        </div>
      </div>
    </div>
  );
}
