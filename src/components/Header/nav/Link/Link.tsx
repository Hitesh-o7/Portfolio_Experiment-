"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { gsap } from "gsap";
import styles from "./Link.module.css";

type Props = {
  data: {
    title: string;
    href: string;
    index: number;
  };
  isActive: boolean;
  setSelectedIndicator: (href: string) => void;
};

export default function Link({ data, isActive, setSelectedIndicator }: Props) {
  const router = useRouter();
  const currentPath = window.location.pathname;

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // If we're already on the target page, just return
    if (currentPath === data.href) {
      return;
    }

    // GSAP block reveal animation (transition-out effect)
    const blocks = document.querySelectorAll(".transition-block");

    // Reset blocks to initial state
    blocks.forEach((block) => {
      block.setAttribute("style", "visibility: visible; transform: scaleY(0);");
    });

    // Start the transition-out effect
    await new Promise<void>((resolve) => {
      gsap.to(blocks, {
        scaleY: 1,
        duration: 1,
        stagger: { each: 0.1, from: "start" },
        ease: "power4.inOut",
        onComplete: resolve,
      });
    });

    // After the animation completes, navigate to the new page
    router.push(data.href);
  };

  return (
    <a
      href={data.href}
      className={`${styles.link} ${isActive ? styles.active : ""}`}
      onClick={handleClick}
      onMouseEnter={() => setSelectedIndicator(data.href)}
    >
      <span>{data.title}</span>
    </a>
  );
}
