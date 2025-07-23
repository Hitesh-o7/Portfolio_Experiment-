"use client";
import styles from "./style.module.css";
import TransitionLink from "@/components/Transition/TransitionLink";
import Image from "next/image"; 
import { glbProjects } from "@/data/glbProjects";

export default function GLBGallery() {
    return (
        <main className={styles.Main}>
            <div className={styles.title}>3D Showcase</div>
            <div className={styles.work_container}>
                {glbProjects.map((project) => (
                    <TransitionLink href={`/3d-showcase/${project.id}`} key={project.id}>
                        <div className={styles.card_wrapper}>
                            <div className={styles.card}>
                                <div className={styles.image_wrapper}>
                                    <Image
                                        src={project.previewImage}
                                        alt={project.name}
                                        fill
                                        className={styles.work_img}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        priority={project.featured}
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                            <div className={styles.title1}>
                                <span className={styles.dashed}>Project Name :</span> {project.name}
                            </div>
                        </div>
                    </TransitionLink>
                ))}
            </div>
        </main>
    );
} 