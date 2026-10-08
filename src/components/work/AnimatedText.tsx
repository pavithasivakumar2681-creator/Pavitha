/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue, useReducedMotion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

interface CharProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
  prefersReduced: boolean | null;
}

const AnimatedCharacter: React.FC<CharProps> = ({
  char,
  progress,
  range,
  prefersReduced,
}) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  if (char === ' ') {
    return <span className="inline-block">&nbsp;</span>;
  }

  return (
    <span className="relative inline-block">
      {/* Invisible placeholder for natural layout and sizing */}
      <span className="opacity-0 select-none pointer-events-none" aria-hidden="true">
        {char}
      </span>
      {/* Absolute positioned animated span transitioning from 0.2 to 1 opacity */}
      <motion.span
        style={{ opacity: prefersReduced ? 1 : opacity }}
        className="absolute inset-0"
        aria-hidden="true"
      >
        {char}
      </motion.span>
    </span>
  );
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
}) => {
  const elementRef = useRef<HTMLParagraphElement>(null);
  const prefersReduced = useReducedMotion();

  // Scroll tracking on the paragraph element with offset ['start 0.8', 'end 0.2']
  const { scrollYProgress } = useScroll({
    target: elementRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const totalChars = text.length;
  const words = text.split(' ');

  let globalCharIndex = 0;

  return (
    <p
      ref={elementRef}
      className={`relative select-none text-black ${className}`}
      aria-label={text}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline">
        {words.map((word, wordIndex) => {
          const wordChars = word.split('');
          const wordElements = (
            <span key={wordIndex} className="inline-block whitespace-nowrap">
              {wordChars.map((char) => {
                const index = globalCharIndex++;
                const start = totalChars > 0 ? index / totalChars : 0;
                const end = totalChars > 0 ? (index + 1) / totalChars : 1;

                return (
                  <AnimatedCharacter
                    key={index}
                    char={char}
                    progress={scrollYProgress}
                    range={[start, end]}
                    prefersReduced={prefersReduced}
                  />
                );
              })}
            </span>
          );

          // Append space character after word (except last word)
          if (wordIndex < words.length - 1) {
            const spaceIndex = globalCharIndex++;
            const start = totalChars > 0 ? spaceIndex / totalChars : 0;
            const end = totalChars > 0 ? (spaceIndex + 1) / totalChars : 1;

            return (
              <React.Fragment key={wordIndex}>
                {wordElements}
                <AnimatedCharacter
                  char=" "
                  progress={scrollYProgress}
                  range={[start, end]}
                  prefersReduced={prefersReduced}
                />
              </React.Fragment>
            );
          }

          return wordElements;
        })}
      </span>
    </p>
  );
};
