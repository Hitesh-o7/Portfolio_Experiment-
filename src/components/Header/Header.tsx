'use client';
import React from 'react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './style.module.css';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import Nav from './nav/Nav';
import gsap from 'gsap'; 
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Rounded from '../ui/RoundedButton/Roundend';
import Magnetic from '../ui/Magnetic/Magnetic';
import Image from 'next/image';
import Link from 'next/link';
import { useAnimationContext } from '@/context/AnimationContext';

export default function Header() {
    const header = useRef<HTMLDivElement | null>(null);
    const [isActive, setIsActive] = useState<boolean>(false);
    const pathname = usePathname();
    const button = useRef<HTMLDivElement | null>(null);
    const { currentBg } = useAnimationContext();

    // Function to determine if background is dark
    const isDarkBackground = (bgColor: string): boolean => {
        if (!bgColor) return false;
        
        // Extract RGB values from rgba string
        const match = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (!match) return false;
        
        const [, r, g, b] = match.map(Number);
        
        // Calculate relative luminance
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        
        return luminance < 0.5;
    };

    const isBackgroundDark = isDarkBackground(currentBg || '');

    useEffect(() => {
        setIsActive(false);
    }, [pathname]);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        if (button.current) {
            gsap.to(button.current, {
                scrollTrigger: {
                    trigger: document.documentElement,
                    start: "top top",
                    end: window.innerHeight,
                     onLeave: () => {
                        gsap.to(button.current, { scale: 1, duration: 0.25, ease: "power1.out" });
                    },
                    onEnterBack: () => {
                        gsap.to(button.current, { scale: 1, duration: 0.25, ease: "power1.out" });
                        setIsActive(false);
                    }
                }
            });
        }
    }, []);

    return (
        <>
            {/* Fixed Logo */}
            <div 
                className={`${styles.fixedLogo} ${isBackgroundDark ? styles.darkBg : styles.lightBg}`}
                style={{
                    '--bg-color': currentBg || 'rgba(255,255,255,0.9)'
                } as React.CSSProperties & { '--bg-color': string }}
            >
                <Magnetic>
                    <Link href="/" className={styles.logoContainer}>
                        <Image 
                            src="/BlackMain.svg" 
                            alt="Logo" 
                            width={180}
                            height={180}
                            className={`${styles.logoImage} ${isBackgroundDark ? styles.invertLogo : ''}`}
                            priority
                            style={{ objectFit: 'contain' }}
                        />
                    </Link>
                </Magnetic>
            </div>

            {/* Original header - keeping for spacing but hiding logo */}
            <div ref={header} className={styles.header}> 
                {/* Logo moved to fixed position above */}
            </div>  

            <div ref={button} className={styles.headerButtonContainer}>
                <Rounded onClick={() => setIsActive(!isActive)} className={styles.button}>
                    <div className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}></div>
                </Rounded>
            </div>
            <AnimatePresence mode="wait">
                {isActive && <Nav />}
            </AnimatePresence>
        </>
    ); 
}
