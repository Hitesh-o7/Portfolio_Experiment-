"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header/Header";
import { SmoothCursor } from "@/components/ui/Cursor/smooth-cursor";
import Contact from "@/components/Contact/Contact";
import Image from "next/image";
import Link from "next/link";
import { useAnimationContext } from "@/context/AnimationContext";

export default function SunsoftProjectPage() {
  const { setCurrentBg, setCurrentTextColor, currentBg } = useAnimationContext();
  const [isMobile, setIsMobile] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
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
      <div className="max-w-full mt-32 mx-auto px-4 sm:px-[8%] md:px-[12%] lg:px-[5%] pt-6">
        <Link href="/work" className="text-sm text-gray-600 hover:text-black hover:underline underline-offset-4">
          ← Back to all projects
        </Link>
      </div>
      <section className="max-w-full mx-auto -mt-[15%] px-4 sm:px-[8%] md:px-[12%] lg:px-[15%] py-8 sm:py-[10%] md:py-[15%] lg:py-[20%]">
        <div className="flex flex-col gap-4 h-full">
          <div className="flex flex-col gap-4 h-full justify-center items-center mb-10 relative max-md:mt-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl text-black font-bold mb-[-1rem] sm:mb-[-1.5rem] md:mb-[-2rem] lg:mb-[-2.5rem] max-md:mt-8 relative z-0">SunSoft</h1>
            <div className="w-full bg-gray-100 rounded-lg overflow-hidden relative z-10">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                </div>
              )}
              <Image 
                src="/Work/Sunsoft_Main.avif" 
                alt="SunSoft Project" 
                width={1920}
                height={1080}
                className={`w-full h-auto object-contain rounded-xl transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 80vw"
                priority={true}
                quality={75}
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
                  console.error('Image failed to load:', e);
                  setImageLoaded(true); // Hide loader even on error
                }}
              />
            </div>
          </div>
        </div>
      </section>
      <Contact textColor="rgba(0,0,0,0.9)" theme="light" />
    </main>
  );
}