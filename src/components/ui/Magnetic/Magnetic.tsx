import React, { useEffect, useRef, ReactElement } from 'react';
import gsap from 'gsap';

interface MagneticProps {
  children: ReactElement<HTMLDivElement> & React.RefAttributes<HTMLDivElement>;
}

export default function Magnetic({ children }: MagneticProps){
  const magnetic = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!magnetic.current) return;

    const currentMagnetic = magnetic.current;
    const xTo = gsap.quickTo(currentMagnetic, 'x', {
      duration: 1,
      ease: 'elastic.out(1, 0.3)',
    });
    const yTo = gsap.quickTo(currentMagnetic, 'y', {
      duration: 1,
      ease: 'elastic.out(1, 0.3)',
    });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = currentMagnetic.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.35);
      yTo(y * 0.35);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    currentMagnetic.addEventListener('mousemove', handleMouseMove);
    currentMagnetic.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      currentMagnetic.removeEventListener('mousemove', handleMouseMove);
      currentMagnetic.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [children]);

  return (
    <div ref={magnetic}>
      {children}
    </div>
  );
}
