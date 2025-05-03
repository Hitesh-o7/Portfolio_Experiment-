"use client";
import styles from "./style.module.css";
import Image from "next/image";

export default function Work() {
    const workItems = [
        { src: "/powell.jpg", alt: "Work Image 1", type: "image" },
        { src: "/Project1.mp4", alt: "Work Video", type: "video" },  
        { src: "/wix.jpg", alt: "Work Image 3", type: "image" },
        { src: "/wix.jpg", alt: "Work Image 4", type: "image" },
    ];

    return (
        <main className={styles.Main}>
            <div className={styles.title}>Work of Art</div>
            <div className={styles.work_container}>
                {workItems.map((work, index) => (
                    <div key={index} className={styles.card_wrapper}>
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
                            <span className={styles.dashed}>Project Name :</span> About Project
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
