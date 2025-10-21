"use client";
import styles from "./style.module.css";
import Image from "next/image";

export default function Work() {
    const workItems = [
        { src: "/Games/MainPage.png", alt: "Work Image 1", type: "image", name: "Crimson Oath"  },
        { src: "/Project1.webm", alt: "Work Video", type: "video", name: "Page startup" },  
        { src: "/2dArt/Cute.avif", alt: "Work Image 3", type: "image", name: "Cute 2D Art" },
        { src: "/wix.avif", alt: "Work Image 4", type: "image", name: "Portfolio Work" },
    ];

    return (
        <main className={styles.Main}>
            <div className={styles.title}>Work of Art</div>
            <div className={styles.work_container}>
                {workItems.map((work, index) => (
                    <div 
                        key={index} 
                        className={styles.card_wrapper}
                        onClick={() => {
                            if (work.name === "Crimson Oath") {
                                window.location.href = "/games/crimson-oath";
                            } else if (work.name === "Cute 2D Art") {
                                window.location.href = "/2d-gallery";
                            }
                        }}
                        style={{ cursor: (work.name === "Crimson Oath" || work.name === "Cute 2D Art") ? "pointer" : "default" }}
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
        </main>
    );
}
