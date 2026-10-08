/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const SectionEnd: React.FC = () => {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={{
        y: prefersReduced ? 0 : 50,
        opacity: prefersReduced ? 1 : 0.95,
      }}
      whileInView={{
        y: 0,
        opacity: 1,
      }}
      viewport={{
        once: true,
        margin: '80px',
        amount: 0,
      }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      aria-hidden="true"
      className="w-full bg-[#111111] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] min-h-[160px] sm:min-h-[220px] md:min-h-[260px] -mt-8 sm:-mt-10 md:-mt-12 relative z-20 border-t border-[#111111]"
    >
      {/* Empty rounded-top block ready for upcoming portfolio sections */}
    </motion.div>
  );
};
