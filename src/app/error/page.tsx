"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header/Header";
import { SmoothCursor } from "@/components/ui/Cursor/smooth-cursor";
import Contact from "@/components/Contact/Contact";
import { useAnimationContext } from "@/context/AnimationContext";
import { Glitchy404 } from "@/components/ui/glitchy";

export default function ErrorPage() {
  const { setCurrentBg, setCurrentTextColor } = useAnimationContext();

  useEffect(() => {
    // Set dark background context for proper header theming
    setCurrentBg("rgba(0,0,0,0.9)");
    setCurrentTextColor("rgba(255,255,255,0.9)");
  }, [setCurrentBg, setCurrentTextColor]);

  return (
    <main data-scroll-container className="min-h-screen bg-black text-white">
      <SmoothCursor />
      <Header />
      
      {/* Error Section with Glitchy 404 */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="text-center">
          <div className="mb-8">
            <Glitchy404 />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-mono">
            Something went wrong
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. 
            Let&apos;s get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-3 bg-white text-black rounded-md hover:bg-gray-200 transition-colors duration-300 font-medium"
            >
              Go Home
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 border border-white text-white rounded-md hover:bg-white hover:text-black transition-colors duration-300 font-medium"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <Contact 
        backgroundColor="rgba(0, 0, 0, 0.9)" 
        textColor="rgba(255,255,255,0.9)"
        theme="dark"
      />
    </main>
  );
}
