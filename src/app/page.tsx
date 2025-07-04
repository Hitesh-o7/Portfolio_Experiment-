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
          setCurrentBg(section.getAttribute("data-bgcolor") || "#ffffff");
          setCurrentTextColor(
            section.getAttribute("data-textcolor") || "#000000"
          );
        },
        onEnterBack: () => {
          setCurrentBg(section.getAttribute("data-bgcolor") || "#ffffff");
          setCurrentTextColor(
            section.getAttribute("data-textcolor") || "#000000"
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
      <section data-bgcolor="#ffffff" data-textcolor="#000000">
        <Header />
        <Preloader /> 
      </section>
      <section data-bgcolor="#000000" data-textcolor="#ffffff">
        <About />
      </section>
      <section data-bgcolor="#ffffff" data-textcolor="#000000">
        <Work />
      </section>
      <section data-bgcolor="#000000" data-textcolor="#ffffff">
        <Why />
        <Contact />
      </section>
    </div>
  );
}
