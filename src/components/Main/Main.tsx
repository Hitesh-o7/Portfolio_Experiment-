// Import the necessary components
"use client";
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import Image from 'next/image';
import styles from './style.module.css'; 
const MainPage: React.FC = () => {
    return (
        <ParallaxProvider> 
            <main className={styles.MainPag}>
                {/* Left Side Content */}
                <div className={styles.left}>
                    <div className={styles.top}>
                        <div className={styles.hover_container}>
                            <div className={styles.green_dot}></div>
                            <span className={styles.text}>Contact</span>
                        </div>
                    </div>
                    <div className={styles.middle}>
                        <p>Web Design & custom Figma development</p>
                    </div>
                    <div className={styles.bottom}>
                        <p>
                            Designer & Figma expert
                            Helping you build beautiful and
                            scalable website experiences
                        </p>
                    </div>
                </div>

                {/* Right Side with Parallax Effect */}
                <div className={styles.right}>
                    <div className={styles.overflow_hidden}>
                        <div className={styles.image_div}>
                            <Parallax speed={-30}>
                                <Image
                                    src="/aboutimg.jpg"
                                    alt="Self Image"
                                    width={800} // Match your height from SCSS
                                    height={800} // Match your height from SCSS
                                    layout="intrinsic" // Ensures proper aspect ratio
                                />
                            </Parallax>
                        </div>
                    </div>
                </div>
            </main>
        </ParallaxProvider>
    );
}

export default MainPage;
