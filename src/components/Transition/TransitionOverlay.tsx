"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import styles from "./TransitionOverlay.module.css";

export default function TransitionOverlay() {
  const blocksRef = useRef<HTMLDivElement[]>([]);
  const pathname = usePathname();
  const isInitialMount = useRef(true);

  const animateOut = () => {
    return new Promise<void>((resolve) => {
      // Ensure blocks are visible and covering the screen before animating out
      gsap.set(blocksRef.current, { 
        scaleY: 1, 
        visibility: "visible",
        zIndex: 1000
      });
      
      // Start animation immediately - no delay for better performance
      gsap.to(blocksRef.current, {
        scaleY: 0,
        duration: 1,
        stagger: { each: 0.1, from: "start", grid: "auto" },
        ease: "power4.inOut",
        onComplete: resolve,
      });
    });
  };

  useEffect(() => {
    // On initial mount, set blocks to cover screen immediately
    if (isInitialMount.current) {
      gsap.set(blocksRef.current, { 
        scaleY: 1, 
        visibility: "visible",
        zIndex: 1000
      });
      isInitialMount.current = false;
    }
    
    // Animate out when pathname changes
    animateOut();
  }, [pathname]);

  return (
    <div className={styles.transition}>
      {[1, 2].map((row) => (
        <div
          key={row}
          className={`${styles.transitionRow} ${
            row === 1 ? styles.row1 : styles.row2
          }`}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={`${styles.block} transition-block`}
              ref={(el) => {
                if (el) {
                  const index = (row - 1) * 5 + i;
                  blocksRef.current[index] = el;
                  // Initialize each block as it's mounted
                  if (isInitialMount.current) {
                    gsap.set(el, { scaleY: 1, visibility: "visible" });
                  }
                }
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
