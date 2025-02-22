import React from 'react';
import styles from './style.module.css';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { slide, scale } from '../../animation';

interface LinkProps {
  data: {
    title: string;
    href: string;
    index: number;
  };
  isActive: boolean;
  setSelectedIndicator: (href: string) => void;
}

export default function Links({ data, isActive, setSelectedIndicator }: LinkProps): JSX.Element {
  const { title, href, index } = data;

  return (
    <motion.div
      className={styles.link}
      onMouseEnter={() => setSelectedIndicator(href)}
      custom={index}
      variants={slide}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <motion.div variants={scale} animate={isActive ? 'open' : 'closed'} className={styles.indicator}></motion.div>
      <Link href={href}>{title}</Link>
    </motion.div>
  );
}
