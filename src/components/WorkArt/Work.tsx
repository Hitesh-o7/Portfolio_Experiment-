"use client";
import { useState, useEffect } from "react";
import styles from "./style.module.css";
import Image from "next/image";

export default function Work() {
    const [bgColor, setBgColor] = useState<string>("");

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setBgColor("");
            } else {
                setBgColor("black");
            }
        };
 
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <main className={styles.Main}>
            <div className={styles.title}>Work of Art</div>
            <div
                className={styles.work_container}
                
            >
                {[
                    { src: "/powell.jpg", alt: "Work Image 1" },
                    { src: "/wix.jpg", alt: "Work Image 2" },
                    { src: "/wix.jpg", alt: "Work Image 3" },
                    { src: "/wix.jpg", alt: "Work Image 4" },
                ].map((work, index) => (
                    <div key={index} className={styles.card_wrapper}>
                        <div className={styles.card}>
                            <div className={styles.image_wrapper}>
                                <Image
                                    src={work.src}
                                    alt={work.alt}
                                    className={styles.work_img}
                                    fill
                                    style={{ objectFit: "cover" }}
                                />
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
