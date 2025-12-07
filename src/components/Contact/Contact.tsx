'use client';
import styles from './style.module.css'; 
import { useRef } from 'react';
import { useScroll, motion, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';  

interface ContactProps {
    backgroundColor?: string;
    textColor?: string;
    theme?: 'light' | 'dark';
}

export default function Contact({ 
    backgroundColor = 'transparent', 
    textColor = 'rgba(255,255,255,0.9)',
    theme = 'dark'
}: ContactProps) {
    const container = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end end"] 
    });
 
    const yRaw = useTransform(scrollYProgress, [0, 1], [-100, 0]);
    const y = useSpring(yRaw, { stiffness: 80, damping: 20, mass: 0.5 });

    return (
        <motion.div 
            style={{ 
                y, 
                backgroundColor: backgroundColor,
                color: textColor 
            }} 
            ref={container} 
            className={`${styles.contact} ${theme === 'light' ? styles.lightTheme : styles.darkTheme}`}
        >
            <div className={styles.body}>
                <div className="flex flex-col w-full items-center justify-center">
                    <a 
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=hitesh.design7@gmail.com" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-bold hover:text-blue-500 hover:scale-105 transition-all duration-300 cursor-pointer" 
                        style={{ color: textColor }}
                    >
                        hitesh.design7@gmail.com
                    </a> 
                    <div className="flex flex-row gap-4 mt-6">
                        <a href="https://www.linkedin.com/in/hitesh-thakur07/" target="_blank" rel="noopener noreferrer">
                            <Image src="/linkedin.svg" alt="LinkedIn" width={24} height={24} className={`w-6 h-6 ${styles.socialIcon}`} />
                        </a>
                        <a href="https://www.artstation.com/hiteshthakur2" target="_blank" rel="noopener noreferrer">
                            <Image src="/artstation.svg" alt="Instagram" width={24} height={24} className={`w-6 h-6 ${styles.socialIcon}`} />
                        </a>
                        <a href="https://github.com/Hitesh-o7" target="_blank" rel="noopener noreferrer" className="scale-[1.4] transition-all duration-300">
                            <Image src="/github.svg" alt="GitHub" width={24} height={24} className={`w-6 h-6 ${styles.socialIcon}`} />
                        </a>
                    </div>
                </div>
                <div className={styles.logoBottomRight}>
                    <Image 
                      src="/GreenLogo.svg" 
                      alt="" 
                      aria-hidden="true"
                      width={80} 
                      height={80} 
                      className={`w-20 h-20 ${styles.logoIcon}`} 
                    />
                </div>
            </div>
        </motion.div>
    );
}
