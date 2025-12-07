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
    setCurrentBg("rgba(255,255,255,0.9)");
    setCurrentTextColor("rgba(0,0,0,0.9)");
  }, [setCurrentBg, setCurrentTextColor]);

  return (
    <main data-scroll-container>
      <SmoothCursor />
      <Header />
      <GamesShowcase /> 
    </main>
  );
}


