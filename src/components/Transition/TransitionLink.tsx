"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import gsap from "gsap";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export default function TransitionLink({ href, children, className }: Props) {
  const router = useRouter();
  const isTransitioning = useRef(false);

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isTransitioning.current) return;
    isTransitioning.current = true;

    const blocks = document.querySelectorAll(".transition-block");
    gsap.set(blocks, { visibility: "visible", scaleY: 0 });

    await new Promise<void>((resolve) => {
      gsap.to(blocks, {
        scaleY: 1,
        duration: 1,
        stagger: { each: 0.1, from: "start", grid: [2, 5] },
        ease: "power4.inOut",
        onComplete: resolve,
      });
    });

    router.push(href);
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
