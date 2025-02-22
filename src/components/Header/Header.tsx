'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './style.module.css';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import Nav from './nav/Nav';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Rounded from '../ui/RoundedButton/Roundend';
import Magnetic from '../ui/Magnetic/Magnetic';

export default function Header(): JSX.Element {
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
                    <p>Hitesh</p>
                </div>
                <Magnetic>
                    <div className={styles.logo}>
                        <p className={styles.copyright}>©</p>
                        <div className={styles.name}>
                            <p className={styles.codeBy}>Curated by</p>
                            <p className={styles.Hitesh}>Hitesh</p>
                            <p className={styles.Thakur}>&nbsp;&nbsp;Thakur</p>
                        </div>
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
