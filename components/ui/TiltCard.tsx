"use client";

import React, { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  /** Max tilt angle in degrees — lower for subtle, higher for dramatic */
  tiltDegree?: number;
  /** Spotlight glow color on hover */
  spotlightColor?: string;
  /** Inner content Z-translate for parallax depth (px) */
  contentZ?: number;
  /** Disable tilt on touch devices for performance */
  disableOnMobile?: boolean;
}

/**
 * A reusable 3D tilt card with mouse-tracking spotlight and parallax depth.
 * Combines the best of Magic UI's ParallaxTiltCard + ReactBits' SpotlightCard.
 * Touch devices get a simple scale effect instead of tilt.
 */
export function TiltCard({
  children,
  className = '',
  tiltDegree = 8,
  spotlightColor = 'rgba(45, 197, 244, 0.12)',
  contentZ = 30,
  disableOnMobile = true,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [spotlightOpacity, setSpotlightOpacity] = useState(0);

  // Motion values for smooth tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [`${tiltDegree}deg`, `-${tiltDegree}deg`]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [`-${tiltDegree}deg`, `${tiltDegree}deg`]
  );

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
    setSpotlightPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, [x, y]);

  const handleMouseEnter = useCallback(() => {
    setSpotlightOpacity(1);
  }, []);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setSpotlightOpacity(0);
  }, [x, y]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{
        scale: 1.02,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Spotlight radial glow overlay */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-500 z-[1]"
        style={{
          opacity: spotlightOpacity,
          background: `radial-gradient(500px circle at ${spotlightPos.x}px ${spotlightPos.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />

      {/* Border glow that follows cursor */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-500 z-[1]"
        style={{
          opacity: spotlightOpacity * 0.7,
          background: `radial-gradient(250px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(18,227,153,0.35), transparent 40%)`,
          WebkitMaskImage: 'linear-gradient(black, black)',
          maskImage: 'linear-gradient(black, black)',
        }}
      />

      {/* Inner content with parallax Z-depth */}
      <motion.div
        className="relative z-10 h-full"
        style={{
          transform: `translateZ(${contentZ}px)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
