'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import styles from './Link.module.css';

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
  const [isHomePage, setIsHomePage] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // Using useEffect to check for the Home page based on pathname
  useEffect(() => {
    const currentPath = window.location.pathname; // Access the pathname via window.location
    if (currentPath === '/') {
      setIsHomePage(true); // This will mark the Home page
    }
    setIsFirstLoad(false); // Once the component is mounted, set first load to false
  }, []);

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // If it's the Home page, trigger the fade-in animation
    if (isHomePage && !isFirstLoad) {
      const blocks = document.querySelectorAll('.transition-block');
      gsap.set(blocks, { visibility: 'visible', scaleY: 0 });

      await new Promise<void>((resolve) => {
        gsap.to(blocks, {
          scaleY: 1,
          duration: 1,
          stagger: { each: 0.1, from: 'start' },
          ease: 'power4.inOut',
          onComplete: resolve,
        });
      });
    }

    // If it's not the Home page, trigger the fade-out animation
    if (!isHomePage && !isFirstLoad) {
      const blocks = document.querySelectorAll('.transition-block');
      gsap.set(blocks, { visibility: 'visible', scaleY: 0 });

      await new Promise<void>((resolve) => {
        gsap.to(blocks, {
          scaleY: 1,
          duration: 1,
          stagger: { each: 0.1, from: 'start' },
          ease: 'power4.inOut',
          onComplete: resolve,
        });
      });
    }

    // After the transition, navigate to the new page
    router.push(data.href);
  };

  return (
    <a
      href={data.href}
      className={`${styles.link} ${isActive ? styles.active : ''}`}
      onClick={handleClick}
      onMouseEnter={() => setSelectedIndicator(data.href)}
    >
      <span>{data.title}</span>
    </a>
  );
}
