"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { AnimationProvider } from "@/context/AnimationContext";
import TransitionOverlay from "@/components/Transition/TransitionOverlay";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    <AnimationProvider>
      <TransitionOverlay />
      {children}
      <Analytics />
      <SpeedInsights />
    </AnimationProvider>
  );
}
