"use client";

import { useLayoutEffect } from "react";
import Header from "@/components/Header/Header";
import { SmoothCursor } from "@/components/ui/Cursor/smooth-cursor";
import Contact from "@/components/Contact/Contact";
import Image from "next/image";
import { useAnimationContext } from "@/context/AnimationContext";

export default function FunkyProjectPage() {
  const { setCurrentBg, setCurrentTextColor, currentBg } = useAnimationContext();

  useLayoutEffect(() => {
    setCurrentBg("rgba(255,255,255,0.9)");
    setCurrentTextColor("rgba(0,0,0,0.9)");
  }, [setCurrentBg, setCurrentTextColor]);

  return (
    <main 
      data-scroll-container 
      className="min-h-screen bg-white"
      style={{ backgroundColor: currentBg || 'rgba(255,255,255,0.9)' }}
    >
      <SmoothCursor />
      <Header />
      <section className="max-w-full  mx-auto px-[15%] py-[20%]">
        <div className="flex flex-col gap-4 h-full">
          <div className="flex flex-col gap-4 h-full justify-center items-center mb-10 relative max-md:mt-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl text-black font-bold mb-[-1rem] sm:mb-[-1.5rem] md:mb-[-2rem] lg:mb-[-2.5rem] max-md:mt-8 relative z-0">Funo</h1>
            <div className="w-full bg-gray-100 rounded-lg overflow-hidden relative z-10">
              <Image 
                src="/work/funo_Main.png" 
                alt="JobSeek Project" 
                width={2000}
                height={4000}
                className="w-full h-auto object-contain rounded-xl" 
                sizes="100vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>
      <Contact textColor="rgba(0,0,0,0.9)" theme="light" />
    </main>
  );
}