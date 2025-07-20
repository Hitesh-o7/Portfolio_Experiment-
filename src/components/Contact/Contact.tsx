'use client';
import styles from './style.module.css'; 
import { useRef } from 'react';
import { useScroll, motion, useTransform, useSpring } from 'framer-motion';  

export default function Contact() {
    const container = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end end"] // original offset
    });

    // Keep the original y range, but use a spring for smoothness
    const yRaw = useTransform(scrollYProgress, [0, 1], [-100, 0]);
    const y = useSpring(yRaw, { stiffness: 80, damping: 20, mass: 0.5 });

    return (
        <motion.div style={{ y }} ref={container} className={styles.contact}>
            <div className={styles.body}>
                <div className="flex flex-col w-full items-center justify-center">
                    <h1 className="text-lg font-bold">hitesh.design7@gmail.com</h1> 
                    <div className="flex flex-row gap-4 mt-6">
                        <a href="https://www.linkedin.com/in/hitesh-thakur07/" target="_blank" rel="noopener noreferrer">
                            <img src="/linkedin.svg" alt="LinkedIn" className="w-6 h-6" />
                        </a>
                        <a href="https://www.artstation.com/hiteshthakur2" target="_blank" rel="noopener noreferrer">
                            <img src="/artstation.svg" alt="Instagram" className="w-6 h-6" />
                        </a>
                        <a href="https://github.com/Hitesh-o7" target="_blank" rel="noopener noreferrer" className="scale-[1.4] transition-all duration-300">
                            <img src="/github.svg" alt="GitHub" className="w-6 h-6" />
                        </a>
                    </div>
                </div>
                <div className={styles.logoBottomRight}>
                    <img src="/BottomLogo.svg" alt="Logo" className="w-20 h-20" />
                </div>
            </div>
        </motion.div>
    );
}
