"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import styles from "./TransitionOverlay.module.css";

export default function TransitionOverlay() {
  const blocksRef = useRef<HTMLDivElement[]>([]);
  const pathname = usePathname();

  const animateOut = () => {
    return new Promise<void>((resolve) => {
      gsap.set(blocksRef.current, { scaleY: 1 });
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
                if (el) blocksRef.current[(row - 1) * 5 + i] = el;
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
