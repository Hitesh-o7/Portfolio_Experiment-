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
import { isTouchDevice, isIPad } from "@/utils/touchDevice";
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const { currentBg, setCurrentBg, currentTextColor, setCurrentTextColor } =
    useAnimationContext();

  useEffect(() => {
    // Detect if device is iPad or touch device
    const touchDevice = isTouchDevice();
    const iPad = isIPad();
    
    const sections = document.querySelectorAll("[data-bgcolor]");

    // For iPad and touch devices, use a simpler approach with native scroll events
    if (iPad || (touchDevice && window.innerWidth < 1024)) {
      let currentSection: Element | null = null;
      
      const handleScroll = () => {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        
        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          const sectionTop = rect.top + window.scrollY;
          const sectionBottom = sectionTop + rect.height;
          
          if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
            if (currentSection !== section) {
              currentSection = section;
              setCurrentBg(section.getAttribute("data-bgcolor") || "rgba(255,255,255,0.9)");
              setCurrentTextColor(
                section.getAttribute("data-textcolor") || "rgba(0,0,0,0.9)"
              );
            }
          }
        });
      };
      
      // Throttle scroll events for better performance
      let ticking = false;
      const throttledScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
          });
          ticking = true;
        }
      };
      
      window.addEventListener("scroll", throttledScroll, { passive: true });
      handleScroll(); // Initial check
      
      return () => {
        window.removeEventListener("scroll", throttledScroll);
      };
    } else {
      // Use ScrollTrigger for desktop
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
    }
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
      <section data-bgcolor="rgba(16,16,16,0.9)" data-textcolor="rgba(255,255,255,0.9)">
        <About />
      </section>
      <section data-bgcolor="rgba(255,255,255,0.9)" data-textcolor="rgba(0,0,0,0.9)">
        <Work />
      </section>
      <section data-bgcolor="rgba(16,16,16,0.9)" data-textcolor="rgba(255,255,255,0.9)">
        <Why />
        <Contact 
          backgroundColor="rgba(0, 0, 0, 0)" 
          textColor="rgba(255,255,255,0.9)"
          theme="dark"
        />
      </section>
    </div>
  );
}
