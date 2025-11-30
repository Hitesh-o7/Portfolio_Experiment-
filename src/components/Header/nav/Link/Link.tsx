"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { performTransitionAndNavigate } from "@/utils/transition";
import styles from "./Link.module.css";

type Props = {
  data: {
    title: string;
    href: string;
    index: number;
  };
  isActive: boolean;
  setSelectedIndicator: (href: string) => void;
};

export default function Link({ data, isActive, setSelectedIndicator }: Props) {
  const router = useRouter();
  const currentPath = window.location.pathname;

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // If we're already on the target page, just return
    if (currentPath === data.href) {
      return;
    }

    // Perform transition and navigate early for better performance
    await performTransitionAndNavigate(router, data.href);
  };

  return (
    <a
      href={data.href}
      className={`${styles.link} ${isActive ? styles.active : ""}`}
      onClick={handleClick}
      onMouseEnter={() => setSelectedIndicator(data.href)}
    >
      <span>{data.title}</span>
    </a>
  );
}
