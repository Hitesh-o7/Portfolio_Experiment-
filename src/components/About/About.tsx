"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const aboutRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!aboutRef.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.animate-element').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              end: 'bottom 15%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Top image scroll-scrubbed reveal (top -> bottom)
      const cover = aboutRef.current?.querySelector<HTMLElement>('.reveal-scrub .reveal-cover');
      if (cover) {
        gsap.set(cover, { yPercent: 0 });
        gsap.to(cover, {
          yPercent: 101,
          ease: 'none',
          scrollTrigger: {
            trigger: cover.parentElement as Element,
            start: 'top 80%',
            end: 'top 20%',
            scrub: true,
            toggleActions: 'play none none reverse',
          },
        });
      }
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  // Disable copy, selection, context menu and browser find on this page
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMeta = e.ctrlKey || e.metaKey;
      const key = e.key.toLowerCase();
      if (isMeta && (key === 'f' || key === 'c' || key === 'x')) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const preventDefault = (e: Event) => {
      e.preventDefault();
    };

    document.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('copy', preventDefault, true);
    document.addEventListener('cut', preventDefault, true);
    document.addEventListener('contextmenu', preventDefault, true);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('copy', preventDefault, true);
      document.removeEventListener('cut', preventDefault, true);
      document.removeEventListener('contextmenu', preventDefault, true);
    };
  }, []);

  return (
    <main 
      ref={aboutRef} 
      className="bg-transparent text-inherit font-['reddit',sans-serif] p-0 m-0 relative select-none"
      onContextMenu={(e) => e.preventDefault()}
      onCopy={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    > 
      {/* First Section - Profile */}
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 mt-[5%] py-8 sm:py-12 md:py-16 lg:py-20">
        <h1 className="animate-element text-sm sm:text-base md:text-lg lg:text-xl font-NeueBold tracking-[0.2em] mb-8 sm:mb-12 md:mb-16 text-center md:text-left text-inherit">
          ABOUT ME
        </h1>
        
        <div className="flex justify-center lg:justify-start lg:ml-[25%] mb-12 sm:mb-16 md:mb-20">
          <div className="flex flex-col items-start gap-6 sm:gap-8 w-full max-w-md lg:max-w-full">
            <div className="animate-element">
              <Image 
                src="/MEME.avif" 
                alt="Profile" 
                width={280} 
                height={350}
                className="w-48 h-60 sm:w-56 sm:h-70 md:w-64 md:h-80 lg:w-72 lg:h-90 xl:w-80 xl:h-96 rounded-lg object-cover"
                draggable={false}
              />
            </div>
            
            <div className="text-left flex flex-col gap-0 w-full">
              <h2 className="animate-element text-base sm:text-lg md:text-xl font-normal tracking-[0.2em] text-inherit">
                HELLO!
              </h2>
              <h2 className="animate-element text-base sm:text-lg md:text-xl font-normal tracking-[0.2em] text-inherit">
                I'M HITESH THAKUR
              </h2>
              
              <div className="animate-element mt-8 sm:mt-12 md:mt-16 lg:mt-20 my-6">
                <div className="flex items-center gap-3 justify-start">
                  <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-2xl text-zinc-400 font-normal tracking-[0.2em] text-inherit">
                    MY EXPERIENCE
                  </span>
                  <span className="text-sm sm:text-base md:text-lg text-inherit">↘</span>
                </div>
              </div>
              
              <p className="animate-element text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed tracking-wide text-left max-w-xl text-inherit px-0">
                A SENIOR UX/UI DESIGNER WITH OVER 1<br className="hidden sm:block" />
                <span className="sm:hidden"> </span>YEARS OF EXPERIENCE IN CREATING DIGITAL<br className="hidden sm:block" />
                <span className="sm:hidden"> </span>PRODUCTS FOR INTERNATIONAL COMPANIES.
              </p>
            </div>
          </div>
        </div>
        
        <hr className="w-full h-px bg-white/20 border-none" />
      </div>

      {/* Second Section - Philosophy */}
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-8 sm:py-12 md:py-16 lg:py-20 mb-40 min-[520px]:mb-0">
        <div className="grid grid-cols-1 gap-8 sm:gap-12 md:gap-16 lg:gap-24">
          {/* Large Text */}
          <div className="animate-element">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-7xl font-normal leading-tight tracking-wide text-inherit text-center lg:text-left">
              IT'S NOT JUST A<br />
              PROFESSION - IT'S A WAY<br />
              OF THINKING.
            </h2>
          </div>
          
          {/* Content */}
          <div className="flex flex-col justify-between h-full space-y-8 sm:space-y-12">
            <div className="animate-element">
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-2xl leading-relaxed tracking-wide text-inherit text-center lg:text-left lg:ml-[40%]">
                MY WORK IS PART OF MY LIFESTYLE. AS<br className="hidden sm:block" />
                <span className="sm:hidden"> </span>A UX/UI DESIGNER, I AM CONSTANTLY<br className="hidden sm:block" />
                <span className="sm:hidden"> </span>OBSERVING THE WORLD: I NOTICE HOW<br className="hidden sm:block" />
                <span className="sm:hidden"> </span>PEOPLE INTERACT WITH SPACE,<br className="hidden sm:block" />
                <span className="sm:hidden"> </span>TECHNOLOGY, OBJECTS.
              </p>
            </div>
            
            <div className="animate-element text-center lg:text-left lg:ml-[40%] mb-4 sm:mb-8">
              <div className="flex items-center gap-3 justify-center lg:justify-start mb-4 sm:mb-8">
                <span className="text-xs sm:text-sm font-normal tracking-wide text-inherit">
                  MY PHILOSOPHY
                </span>
                <span className="text-sm sm:text-base text-inherit">↘</span>
              </div>
            </div>
            
            <div className="animate-element text-center lg:text-left lg:ml-[60%]">
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-2xl leading-relaxed tracking-wide text-inherit">
                I VALUE CLARITY, MEANING, AND<br className="hidden sm:block" />
                <span className="sm:hidden"> </span>FUNCTIONALITY — BOTH IN DESIGN AND IN<br className="hidden sm:block" />
                <span className="sm:hidden"> </span>LIFE. I AM CLOSE TO THE IDEA OF<br className="hidden sm:block" />
                <span className="sm:hidden"> </span>CONSCIOUS MINIMALISM: LEAVING ONLY WHAT<br className="hidden sm:block" />
                <span className="sm:hidden"> </span>MAKES SENSE AND WORKS FOR RESULTS.<br className="hidden sm:block" />
                <span className="sm:hidden"> </span>I LOVE SIMPLE INTERFACES WITH DEEP<br className="hidden sm:block" />
                <span className="sm:hidden"> </span>MEANING — AS WELL AS SIMPLE THINGS THAT<br className="hidden sm:block" />
                <span className="sm:hidden"> </span>BRING TRUE PLEASURE.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Third Section - Lifestyle */}
      <div className="hidden min-[520px]:block w-full px-4 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-12 md:py-16 lg:py-20 mb-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* Left Column - Images and Contact */}
          <div className="flex flex-col w-full items-center lg:items-end gap-8 sm:gap-12 order-2 lg:order-1">
            {/* Two Images */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-end w-full max-w-md lg:max-w-none">
              <div className="animate-element flex-1 max-w-[200px] mx-auto sm:mx-0">
                <Image 
                  src="/About1.avif" 
                  alt="Lifestyle 1" 
                  width={200} 
                  height={280}
                  className="w-full h-64  object-cover rounded-lg"
                  draggable={false}
                />
              </div> 
              <div className="animate-element flex-1 max-w-[200px] mx-auto sm:mx-0">
                <Image 
                  src="/About2.avif" 
                  alt="Lifestyle 2" 
                  width={200} 
                  height={280}
                  className="w-full h-56 sm:h-72 md:h-80 lg:h-[300px] object-cover rounded-lg"
                  draggable={false}
                />  
              </div>
            </div>
            
            {/* Contact Section */}
            <div className="animate-element flex justify-center lg:justify-start">
              <div className="flex items-center gap-3">
                <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-normal tracking-wide text-inherit border-b border-white/50 pb-1">
                  LETS CONTACT
                </span>
                <span className="text-lg sm:text-xl md:text-2xl text-inherit">↗</span>
              </div>
            </div>
          </div>
          
          {/* Right Column - Lifestyle Content */}
          <div className="flex flex-col gap-8 sm:gap-12 items-center lg:items-end text-center lg:text-right order-1 lg:order-2">
            <div className="animate-element">
              <div className="flex items-center gap-3 mb-6 sm:mb-8 justify-center lg:justify-end">
                <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-2xl text-zinc-400 font-normal tracking-wide text-inherit">
                  MY LIFESTYLE
                </span>
                <span className="text-sm sm:text-base text-inherit">↘</span>
              </div>
            </div>
            
            <div className="animate-element mb-8 sm:mb-12">
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-2xl leading-relaxed tracking-wide text-inherit">
                I LOOK FOR AESTHETICS EVERYWHERE:<br className="hidden sm:block" />
                <span className="sm:hidden"> </span>IN THE FORMS OF NATURE, IN THE<br className="hidden sm:block" />
                <span className="sm:hidden"> </span>DETAILS OF ARCHITECTURE, IN THE<br className="hidden sm:block" />
                <span className="sm:hidden"> </span>COLORS OF CITY STREETS, AND EVEN<br className="hidden sm:block" />
                <span className="sm:hidden"> </span>IN THE SIMPLE THINGS OF EVERYDAY<br className="hidden sm:block" />
                <span className="sm:hidden"> </span>LIFE. IT'S NOT JUST A HOBBY -<br className="hidden sm:block" />
                <span className="sm:hidden"> </span>IT'S A WAY OF SEEING THE WORLD.
              </p>
            </div>
            
            <div className="animate-element">
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-2xl leading-relaxed tracking-wide text-inherit">
                EVERY PROJECT FOR ME IS MORE THAN<br className="hidden sm:block" />
                <span className="sm:hidden"> </span>A TASK. IT'S A STORY THAT I HELP<br className="hidden sm:block" />
                <span className="sm:hidden"> </span>TELL THROUGH DESIGN.<br className="hidden sm:block" />
                <span className="sm:hidden"> </span>I BELIEVE THAT A GOOD INTERFACE<br className="hidden sm:block" />
                <span className="sm:hidden"> </span>IS NOT JUST ABOUT COLORS AND<br className="hidden sm:block" />
                <span className="sm:hidden"> </span>FONTS, BUT ABOUT THE FEELINGS IT<br className="hidden sm:block" />
                <span className="sm:hidden"> </span>EVOKES.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
