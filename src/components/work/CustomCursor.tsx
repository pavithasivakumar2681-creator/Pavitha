/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

interface CustomCursorProps {
  isActive: boolean;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ isActive }) => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const prefersReduced = useReducedMotion();

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 26, stiffness: 360, mass: 0.4 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Detect touch / coarse pointer devices
    const checkTouch = () => {
      setIsTouchDevice(
        window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window
      );
    };
    checkTouch();

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // If touch device or reduced motion, hide the custom cursor completely
  if (isTouchDevice || prefersReduced) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      style={{
        left: smoothX,
        top: smoothY,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: isActive ? 1 : 0,
        opacity: isActive ? 1 : 0,
      }}
      transition={{
        scale: { type: 'spring', damping: 22, stiffness: 320 },
        opacity: { duration: 0.18 },
      }}
      className="fixed pointer-events-none z-50 w-[90px] h-[90px] rounded-full bg-[#111111] text-[#FBF8F4] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 shadow-none select-none"
    >
      <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-[#FBF8F4]">
        VIEW
      </span>
    </motion.div>
  );
};
