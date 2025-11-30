"use client";
import styles from "./style.module.css";
import Image from "next/image";
import TransitionLink from "@/components/Transition/TransitionLink";
import { useRouter } from "next/navigation";
import { performTransitionAndNavigate } from "@/utils/transition";

export default function Work() {
    const router = useRouter();
    
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
            src: "/Project1.webm", 
            alt: "Page startup", 
            type: "video", 
            name: "Page startup",
            url: "/error" // or whatever URL you want for page startup
        },
        { 
            src: "/2dArt/Cute.avif", 
            alt: "Cute 2D Art", 
            type: "image", 
            name: "Cute 2D Art",
            url: "/2d-gallery"
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
                                await performTransitionAndNavigate(router, work.url);
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
                                        style={{ 
                                            width: "100%",
                                            height: "100%",
                                            display: "block",
                                        }}
                                    />
                                ) : (
                                    <Image
                                        src={work.src}
                                        alt={work.alt}
                                        className={styles.work_img}
                                        fill
                                        style={{ objectFit: "cover" }}
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
                        color: "#000",
                        backgroundColor: "transparent",
                        border: "2px solid #d7d7d7",
                        borderRadius: "8px",
                        cursor: "pointer",
                        textDecoration: "none",
                        display: "inline-block",
                        transition: "all 0.3s ease",
                        fontFamily: "'Reddit', sans-serif"
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#f5f5f5";
                        e.currentTarget.style.borderColor = "#000";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.borderColor = "#d7d7d7";
                    }}
                >
                    More Projects
                </TransitionLink>
            </div>
        </main>
    );
}
