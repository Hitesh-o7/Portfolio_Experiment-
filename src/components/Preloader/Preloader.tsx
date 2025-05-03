 
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import styles from "./Preloader.module.css";
import Lanyard from "../Card/Lanyard";

// Register CustomEase
if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
}

const Preloader = () => {
  const counterRef = useRef<HTMLSpanElement>(null);  

  useEffect(() => {
    const customEase = CustomEase.create("custom", ".87,0,.13,1");

    gsap.set(`.${styles.videoContainer}`, {
      scale: 0,
      rotation: -20,
    });

    gsap.to(`.${styles.hero}`, {
      clipPath: "polygon(0% 45%, 25% 45%, 25% 55%, 0% 55%)",
      duration: 1.5,
      ease: customEase,
      delay: 1,
    });

    gsap.to(`.${styles.hero}`, {
      clipPath: "polygon(0% 45%, 100% 45%, 100% 55%, 0% 55%)",
      duration: 2,
      ease: customEase,
      delay: 3,
      onStart: () => {
        gsap.to(`.${styles.progressBar}`, {
          width: "100vw",
          duration: 2,
          ease: customEase,
        });

        gsap.to(counterRef.current, {
          innerHTML: 100,
          duration: 2,
          ease: customEase,
          snap: { innerHTML: 1 },
        });
      },
    });

    gsap.to(`.${styles.hero}`, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1,
      ease: customEase,
      delay: 5,
      onStart: () => {
        gsap.to(`.${styles.videoContainer}`, {
          scale: 1,
          rotation: 0,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.25,
          ease: customEase,
        });
      },
    });

    gsap.to(`.${styles.progressBar}`, {
      opacity: 0,
      duration: 0.3,
      delay: 5.5,
    });

    gsap.to(`.${styles.logo}`, {
      left: "0%",
      transform: "translateX(0%)",
      duration: 1.25,
      ease: customEase,
      onStart: () => {
        gsap.to(`.${styles.charAnimOut} h1`, {
          y: "100%",
          duration: 1,
          stagger: -0.075,
          ease: customEase,
        });
        gsap.to(`.${styles.charAnimIn} h1`, {
          x: "-1200%",
          duration: 1,
          ease: customEase,
          delay: 0.25,
        });
      }, 
    });

    gsap.to([`.${styles.header} span`, `.${styles.coordinates} span`], {
      y: "0%",
      duration: 1,
      stagger: 0.125,
      ease: "power3.out",
      delay: 5.75,
    });
  }, []);

  return (
    <div className={styles.hero}>
      <div className="h-full w-full  ">
      <div className={styles.progressBar}>
        <p>LOADING</p>
        <p>
          /<span ref={counterRef}>0</span>
        </p> 
      </div>
      </div>
      <div className={styles.header}>
        <h1>
          <span>Creative</span>
        </h1>
        <h1>
          <span>Designer</span>
        </h1>
        <h1>
          <span>Developer</span>
        </h1>
        <p>
          <span>( Hitesh Thakur )</span>
        </p>
      </div><div className={styles.lanyardAbsolute}>
        <Lanyard position={[0, 0, 18]} gravity={[0, -40, 0]} />
      </div>
 
    </div>
  );
};

export default Preloader;
