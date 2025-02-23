"use client"; 
import styles from "./style.module.css";
import Image from "next/image";

export default function Work() {
     

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
