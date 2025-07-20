"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useAnimationContext } from "@/context/AnimationContext";
import Header from "@/components/Header/Header";
import About from "@/components/About/About";
import Work from "@/components/WorkArt/Work";
import Why from "@/components/Why/Why";
import Contact from "@/components/Contact/Contact";
import Preloader from "@/components/Preloader/Preloader";
import { SmoothCursor } from "@/components/ui/Cursor/smooth-cursor";
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const { currentBg, setCurrentBg, currentTextColor, setCurrentTextColor } =
    useAnimationContext();

  useEffect(() => {
    const sections = document.querySelectorAll("[data-bgcolor]");

    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => {
          setCurrentBg(section.getAttribute("data-bgcolor") || "rgba(255,255,255,0.9)");
          setCurrentTextColor(
            section.getAttribute("data-textcolor") || "rgba(0,0,0,0.9)"
          );
        },
        onEnterBack: () => {
          setCurrentBg(section.getAttribute("data-bgcolor") || "rgba(255,255,255,0.9)");
          setCurrentTextColor(
            section.getAttribute("data-textcolor") || "rgba(0,0,0,0.9)"
          );
        },
      });
    });

    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, [setCurrentBg, setCurrentTextColor]);

  return (
    <div
      className="transition-colors duration-700 min-h-screen touch-scroll-enabled"
      style={{ backgroundColor: currentBg, color: currentTextColor }}
    >
       <SmoothCursor />
      <section data-bgcolor="rgba(255,255,255,0.9)" data-textcolor="rgba(0,0,0,0.9)">
        <Header />
        <Preloader /> 
      </section>
      <section data-bgcolor="rgba(0,0,0,0.9)" data-textcolor="rgba(255,255,255,0.9)">
        <About />
      </section>
      <section data-bgcolor="rgba(255,255,255,0.9)" data-textcolor="rgba(0,0,0,0.9)">
        <Work />
      </section>
      <section data-bgcolor="rgba(0,0,0,0.9)" data-textcolor="rgba(255,255,255,0.9)">
        <Why />
        <Contact />
      </section>
    </div>
  );
}
