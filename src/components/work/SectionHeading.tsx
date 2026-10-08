/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FadeIn } from './FadeIn';
import { AnimatedText } from './AnimatedText';

export const SectionHeading: React.FC = () => {
  return (
    <div className="w-full mb-8 sm:mb-12 md:mb-14">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-black/10">
        <div>
          {/* Monospace category indicator */}
          <FadeIn delay={0} y={10}>
            <div className="text-xs font-mono uppercase tracking-widest text-black/50 mb-1">
              01 · PORTFOLIO
            </div>
          </FadeIn>

          {/* Heading: "Project" (singular) using .hero-heading gradient */}
          <FadeIn delay={0.08} y={15}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight hero-heading leading-tight select-none">
              Project
            </h2>
          </FadeIn>
        </div>

        {/* Animated character-by-character scroll reveal text */}
        <div className="max-w-sm sm:max-w-md pb-1">
          <AnimatedText
            text="Interactive web applications engineered with code, motion, and structural clarity."
            className="text-xs sm:text-sm font-mono text-black leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
};
