"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, ContactShadows, Float } from "@react-three/drei";

function Model() {
  // Load the model from public directory
  const { scene } = useGLTF("/images/headphone-model.glb");
  
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <primitive object={scene} scale={2} position={[0, -0.5, 0]} />
    </Float>
  );
}

export default function ModelViewer() {
  return (
    <section className="relative w-full min-h-screen bg-[#050505] overflow-hidden flex items-center border-t border-white/5 py-10">
      
      <div className="w-full h-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 lg:px-12 relative z-10">
        
        {/* Left Text Description */}
        <div className="w-full md:w-5/12 flex flex-col items-start justify-center text-left z-20 mb-12 md:mb-0 pointer-events-none">
          <p className="text-electricCyan text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-4 md:mb-6 animate-pulse">
            Interactive 360° View
          </p>
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 md:mb-8 tracking-tighter leading-tight">
            Experience <br/> in 3D
          </h2>
          <p className="text-gray-400 text-base md:text-lg font-medium leading-relaxed max-w-md mb-8 md:mb-10">
            Immerse yourself in the breathtaking design of the Lumix Nova Elite. 
            Interact with the model to rotate and explore every intricate detail 
            and premium material from any angle.
          </p>
          <div className="flex items-center gap-4 text-xs md:text-sm text-gray-500 font-semibold uppercase tracking-wider">
            <span className="w-8 h-px bg-gray-600"></span>
            Drag to rotate 360°
          </div>
        </div>

        {/* Right 3D Canvas */}
        <div className="w-full md:w-7/12 h-[50vh] md:h-[80vh] relative cursor-grab active:cursor-grabbing pointer-events-auto">
          <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
            <Suspense fallback={null}>
              {/* Cinematic Lighting Setup */}
              <Environment preset="studio" />
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" />
              <directionalLight position={[-5, -10, -5]} intensity={0.5} color="#00D6FF" />
              
              <Model />
              
              <ContactShadows position={[0, -2.5, 0]} opacity={0.6} scale={15} blur={2.5} far={4} color="#000000" />
              <OrbitControls 
                enablePan={false} 
                enableZoom={false} 
                minPolarAngle={Math.PI / 4} 
                maxPolarAngle={Math.PI / 1.5}
                autoRotate={true}
                autoRotateSpeed={0.5}
              />
            </Suspense>
          </Canvas>
        </div>

      </div>

    </section>
  );
}

// Preload the model
useGLTF.preload("/images/headphone-model.glb");
