"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { performTransition } from "@/utils/transition";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onMouseEnter?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
} & React.ComponentPropsWithoutRef<typeof Link>;

export default function TransitionLink({ href, children, className, style, onMouseEnter, onMouseLeave, ...otherProps }: Props) {
  const router = useRouter();
  const isTransitioning = useRef(false);

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isTransitioning.current) return;
    isTransitioning.current = true;

    // Start transition and navigate simultaneously for better performance
    const transitionPromise = performTransition();
    
    // Navigate when transition is 70% complete for faster perceived performance
    setTimeout(() => {
      router.push(href);
    }, 350); // 70% of 500ms = 350ms
    
    await transitionPromise;
    isTransitioning.current = false;
  };

  return (
    <Link 
      href={href} 
      onClick={handleClick} 
      className={className}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...otherProps}
    >
      {children}
    </Link>
  );
}
