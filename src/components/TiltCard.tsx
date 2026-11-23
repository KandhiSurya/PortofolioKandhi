'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import styles from './TiltCard.module.css';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
  scale?: number;
  style?: React.CSSProperties;
}

export default function TiltCard({
  children,
  className = '',
  maxTilt = 7,
  glare = true,
  scale = 1.015,
  style = {},
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({ opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device to avoid unwanted tilt on mobile tap
    if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
      setIsTouch(true);
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouch || !cardRef.current) return;

      // Check if animations are paused via data-motion attribute
      if (document.documentElement.getAttribute('data-motion') === 'paused') {
        return;
      }

      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt angles (-maxTilt to +maxTilt)
      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      setTransform(
        `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, 1)`
      );

      if (glare) {
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        setGlareStyle({
          opacity: 1,
          background: `radial-gradient(circle 350px at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 70%)`,
        });
      }
    },
    [isTouch, maxTilt, scale, glare]
  );

  const handleMouseEnter = () => {
    if (isTouch) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (isTouch) return;
    setIsHovered(false);
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlareStyle({ opacity: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${styles.tiltCard} ${className}`}
      style={{
        ...style,
        transform: transform || undefined,
        transition: isHovered
          ? 'transform 0.08s ease-out'
          : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div className={styles.tiltInner}>{children}</div>

      {glare && !isTouch && (
        <div
          className={styles.glareOverlay}
          style={{
            ...glareStyle,
            transition: isHovered ? 'opacity 0.2s ease-out' : 'opacity 0.5s ease-out',
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
