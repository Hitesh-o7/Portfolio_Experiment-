"use client";

import { useEffect } from "react";
import Header from "@/components/Header/Header";
import { SmoothCursor } from "@/components/ui/Cursor/smooth-cursor";
import GamesShowcase from "@/components/GamesShowcase/GamesShowcase";
import { useAnimationContext } from "@/context/AnimationContext";
import Contact from "@/components/Contact/Contact";


export default function GamesPage() {
  const { setCurrentBg, setCurrentTextColor } = useAnimationContext();

  useEffect(() => {
    // Set white background context for proper header theming
    // Only update if values are different to prevent infinite loops
    setCurrentBg((prev) => {
      const newBg = "rgba(255,255,255,0.9)";
      return prev !== newBg ? newBg : prev;
    });
    setCurrentTextColor((prev) => {
      const newTextColor = "rgba(0,0,0,0.9)";
      return prev !== newTextColor ? newTextColor : prev;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty deps - only run once on mount

  return (
    <main data-scroll-container>
      <SmoothCursor />
      <Header />
      <GamesShowcase /> 
    </main>
  );
}


