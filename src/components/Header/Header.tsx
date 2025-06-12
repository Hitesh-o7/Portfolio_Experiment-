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

export default function Header() {
    const header = useRef<HTMLDivElement | null>(null);
    const [isActive, setIsActive] = useState<boolean>(false);
    const pathname = usePathname();
    const button = useRef<HTMLDivElement | null>(null);

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
            <div ref={header} className={styles.header}>
                <div className={styles.testLogo}>
                    
                </div>
                <Magnetic> 
                    <div className={styles.logo}>
                    <Image 
                        src="/Black_Logo.png" 
                        alt="Logo" 
                        width={180}
                        height={180}
                        className="w-auto h-10 md:h-16"
                        priority
                        style={{ objectFit: 'contain' }}
                    />
                    </div>
                </Magnetic>
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
