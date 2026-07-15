import React from "react";
import { ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative w-full bg-black text-white pt-24 pb-10 px-6 lg:px-12 border-t border-white/5 overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-electricCyan/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-7xl mx-auto relative z-10">
        
        {/* Top Section: CTA & Newsletter */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-16 mb-24">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter leading-tight">
              Ready to feel <br className="hidden md:block" /> the sound?
            </h2>
            <p className="text-gray-400 text-lg max-w-md">
              Experience the next generation of wireless audio. Pre-order your Lumix Nova Elite today and get exclusive early access.
            </p>
          </div>
          
          <div className="w-full lg:w-auto flex flex-col items-start lg:items-end">
            <h4 className="text-sm font-bold uppercase tracking-widest text-electricCyan mb-4">
              Stay in the loop
            </h4>
            <div className="flex items-center w-full max-w-md border-b border-white/20 pb-2 transition-colors focus-within:border-white">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="bg-transparent border-none outline-none text-white w-full py-2 placeholder:text-gray-600 font-medium"
              />
              <button className="text-white hover:text-electricCyan transition-colors p-2">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Middle Section: Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-24 border-t border-white/10 pt-16">
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-lg mb-2">Products</h4>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Nova Elite</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Nova Pro</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Accessories</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Compare</a>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-lg mb-2">Support</h4>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Help Center</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Product Manuals</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Warranty</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Contact Us</a>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-lg mb-2">Company</h4>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">About Lumix</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Careers</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Press</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Sustainability</a>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-lg mb-2">Social</h4>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-electricCyan hover:text-black transition-all">
                {/* Twitter / X SVG */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-electricCyan hover:text-black transition-all">
                {/* Instagram SVG */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-electricCyan hover:text-black transition-all">
                {/* Youtube SVG */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-electricCyan hover:text-black transition-all">
                {/* Facebook SVG */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section: Legal */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 text-xs text-gray-600 font-medium">
          <p>© {new Date().getFullYear()} Lumix Audio Inc. All rights reserved.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Cookie Settings</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
