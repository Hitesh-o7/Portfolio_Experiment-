"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header/Header";
import { SmoothCursor } from "@/components/ui/Cursor/smooth-cursor";
import Contact from "@/components/Contact/Contact";
import Image from "next/image";
import { useAnimationContext } from "@/context/AnimationContext";

export default function HeartProjectPage() {
  const { setCurrentBg, setCurrentTextColor, currentBg } = useAnimationContext();
  const [isMobile, setIsMobile] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Check if device is mobile/tablet
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setCurrentBg("rgba(255,255,255,0.9)");
    setCurrentTextColor("rgba(0,0,0,0.9)");
  }, [setCurrentBg, setCurrentTextColor]);

  return (
    <main 
      data-scroll-container 
      className="min-h-screen bg-white"
      style={{ backgroundColor: currentBg || 'rgba(255,255,255,0.9)' }}
    >
      {!isMobile && <SmoothCursor />}
      <Header />
      <section className="max-w-full mx-auto px-4 sm:px-[8%] md:px-[12%] lg:px-[15%] py-8 sm:py-[10%] md:py-[15%] lg:py-[20%]">
        <div className="flex flex-col gap-4 h-full">
          <div className="flex flex-col gap-4 h-full justify-center items-center mb-10 relative max-md:mt-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl text-black font-bold mb-[-1rem] sm:mb-[-1.5rem] md:mb-[-2rem] lg:mb-[-2.5rem] max-md:mt-8 relative z-0">Heartivity</h1>
            <div className="w-full bg-gray-100 rounded-lg overflow-hidden relative z-10">
              {!imageLoaded && !imageError && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center z-0">
                  <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                </div>
              )}
              {!imageError ? (
                <Image 
                  src="/projects/Testing.png" 
                  alt="Heart Project" 
                  width={2000}
                  height={4000}
                  className={`w-full h-auto object-contain rounded-xl transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 80vw"
                  priority={!isMobile}
                  loading={isMobile ? "lazy" : "eager"}
                  quality={90}
                  onLoad={() => {
                    setImageLoaded(true);
                    // Force garbage collection hint for mobile devices
                    if (isMobile && 'gc' in window) {
                      try {
                        // @ts-expect-error - gc() is a non-standard API for garbage collection
                        window.gc();
                      } catch { 
                      }
                    }
                  }}
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-96 bg-gray-200 rounded-xl flex items-center justify-center">
                  <p className="text-gray-500">Image failed to load</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Contact textColor="rgba(0,0,0,0.9)" theme="light" />
    </main>
  );
}

