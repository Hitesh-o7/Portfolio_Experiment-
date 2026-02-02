"use client";
import styles from "./style.module.css";
import Image from "next/image";
import TransitionLink from "@/components/Transition/TransitionLink";
import { useRouter } from "next/navigation";
import { performTransitionAndNavigate } from "@/utils/transition";
import { useAnimationContext } from "@/context/AnimationContext";

export default function Work() {
    const router = useRouter();
    const { currentTextColor } = useAnimationContext();
    
    const workItems = [
        { 
            src: "/Heart.avif", 
            alt: "Heart Project", 
            type: "image", 
            name: "Heart Project",
            url: "/work/heart"
        },
        { 
            src: "/Work/Sunsoft_Main.avif", 
            alt: "SunSoft", 
            type: "image", 
            name: "SunSoft",
            url: "/work/sunsoft"
        },
        { 
            src: "/Work/Soulscan.avif", 
            alt: "SoulScan SaaS Platform", 
            type: "image", 
            name: "SoulScan",
            url: "/work/soulscan"  
        },
        { 
            src: "/Work/Perfume%20Store%20Atlanta.avif", 
            alt: "Perfume Commerce Site", 
            type: "image", 
            name: "Perfume Store",
            url: "/work/perfume"
        },
    ];

    return (
        <main className={styles.Main}>
            <div className={styles.title}>WORK OF ART</div>
            <div className={styles.work_container}>
                {workItems.map((work, index) => (
                    <div 
                        key={index} 
                        className={`${styles.card_wrapper} ${styles.clickable}`}
                        onClick={async () => {
                            if (work.url && work.url !== "/error") {
                                const isExternalUrl = work.url.startsWith('http://') || work.url.startsWith('https://');
                                if (isExternalUrl) {
                                    window.open(work.url, '_blank', 'noopener,noreferrer');
                                } else {
                                    await performTransitionAndNavigate(router, work.url);
                                }
                            }
                        }}
                        style={{ cursor: work.url && work.url !== "/error" ? "pointer" : "default" }}
                    >
                        <div className={styles.card}>
                            <div className={styles.image_wrapper}>
                                {work.type === "video" ? (
                                    <video
                                        src={work.src}
                                        className={styles.work_img}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        preload="metadata"
                                        style={{ 
                                            width: "100%",
                                            height: "100%",
                                            display: "block",
                                            willChange: "auto",
                                            transform: "translateZ(0)", // Hardware acceleration for iPad
                                        }}
                                    />
                                ) : (
                                    <Image
                                        src={work.src}
                                        alt={work.alt}
                                        className={styles.work_img}
                                        fill
                                        style={{ 
                                            objectFit: "cover",
                                            willChange: "auto",
                                            transform: "translateZ(0)", // Hardware acceleration for iPad
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                        <div className={styles.title1}>
                            <span className={styles.dashed}>Project Name :</span> {work.name}
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ 
                display: "flex", 
                justifyContent: "center", 
                paddingBottom: "100px",
                paddingTop: "50px"
            }}>
                <TransitionLink 
                    href="/work"
                    className={styles.moreProjectsButton}
                    style={{
                        padding: "12px 32px",
                        fontSize: "1.1rem",
                        fontWeight: "600",
                        color: currentTextColor,
                        backgroundColor: "transparent", 
                        borderRadius: "8px",
                        cursor: "pointer",
                        textDecoration: "none",
                        display: "inline-block",
                        transition: "all 0.3s ease",
                        fontFamily: "'Reddit', sans-serif"
                    }} 
                >
                    More Projects
                </TransitionLink>
            </div>
        </main>
    );
}
