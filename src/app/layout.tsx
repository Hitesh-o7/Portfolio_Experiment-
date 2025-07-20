"use client";

import type { Metadata } from "next";
import "./globals.css";
import { AnimationProvider } from "@/context/AnimationContext";
import TransitionOverlay from "@/components/Transition/TransitionOverlay";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <html lang="en">
      <body>
        <AnimationProvider>
          <TransitionOverlay />
          {children}
        </AnimationProvider>
      </body>
    </html>
  );
}
