/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ProjectItem } from '../../data/projectsData';
import { LiveProjectButton } from './LiveProjectButton';
import { FadeIn } from './FadeIn';

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  totalCards: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  totalCards,
}) => {
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // Scroll tracking for sticky stacking scale effect
  const { scrollYProgress } = useScroll({
    target: cardContainerRef,
    offset: ['start start', 'end start'],
  });

  // Scale calculation: targetScale = 1 - (totalCards - 1 - index) * 0.03
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const isLastCard = index === totalCards - 1;

  const cardScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, isLastCard ? 1 : targetScale]
  );

  const cardOpacity = useTransform(
    scrollYProgress,
    [0, 0.75, 1],
    [1, 0.95, isLastCard ? 1 : 0.75]
  );

  // Fallback states for images
  const [imgErr1, setImgErr1] = useState(false);
  const [imgErr2, setImgErr2] = useState(false);
  const [imgErr3, setImgErr3] = useState(false);

  // Each card offset by top: ${index * 28}px
  const desktopTop = 96 + index * 24;
  const mobileTop = 64 + index * 12;

  return (
    <div
      ref={cardContainerRef}
      className="relative w-full h-[74vh] min-h-[480px] sm:min-h-[530px] md:min-h-[580px] flex items-start justify-center"
    >
      <motion.article
        style={{
          top: typeof window !== 'undefined' && window.innerWidth < 768 ? `${mobileTop}px` : `${desktopTop}px`,
          scale: prefersReduced ? 1 : cardScale,
          opacity: prefersReduced ? 1 : cardOpacity,
        }}
        className="sticky w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-white p-4 sm:p-5 md:p-7 flex flex-col justify-between overflow-hidden shadow-sm"
      >
        {/* ── TOP ROW: NUMBER, CATEGORY, PROJECT NAME, & GHOST BUTTON ── */}
        <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-3 mb-3 sm:mb-4 md:mb-5">
          <div className="flex flex-col sm:flex-row sm:items-end gap-2.5 sm:gap-5">
            {/* Number (huge) */}
            <FadeIn delay={0.05} y={15}>
              <span
                className="font-black leading-none tracking-tighter text-black select-none block"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 84px)' }}
              >
                {project.number}
              </span>
            </FadeIn>

            <div className="pb-1">
              {/* Category label */}
              <FadeIn delay={0.1} y={12}>
                <div className="font-mono text-xs sm:text-sm uppercase tracking-wider text-black/50 mb-0.5">
                  {project.category}
                </div>
              </FadeIn>

              {/* Project name */}
              <FadeIn delay={0.15} y={12}>
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight text-black leading-tight">
                  {project.name}
                </h3>
              </FadeIn>
            </div>
          </div>

          {/* "Live Project" Ghost Button */}
          <FadeIn delay={0.2} y={12} className="shrink-0 self-start sm:self-end pt-1 sm:pt-0">
            <LiveProjectButton href={project.liveUrl} projectName={project.name} />
          </FadeIn>
        </div>

        {/* ── BOTTOM ROW: TWO-COLUMN IMAGE GRID ── */}
        <div className="w-full flex flex-col md:flex-row gap-3 sm:gap-4 items-stretch">
          {/* Left Column (40% width): 2 stacked images */}
          <div className="w-full md:w-[40%] flex flex-col gap-2.5 sm:gap-3.5 justify-between">
            {/* Left Top Image */}
            <div
              style={{ height: 'clamp(120px, 14vw, 190px)' }}
              className="relative w-full overflow-hidden rounded-[32px] sm:rounded-[40px] md:rounded-[48px] bg-[#EEF2F6] border border-[#D7E2EA]/60"
            >
              {!imgErr1 ? (
                <img
                  src={project.col1Image1}
                  alt={project.altCol1Image1 || `${project.name} preview 1`}
                  onError={() => setImgErr1(true)}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-3 bg-[#EEF2F6] text-black/70">
                  <span className="font-mono text-xs uppercase tracking-wider font-semibold">
                    {project.name} · Preview 1
                  </span>
                </div>
              )}
            </div>

            {/* Left Bottom Image */}
            <div
              style={{ height: 'clamp(140px, 17vw, 250px)' }}
              className="relative w-full overflow-hidden rounded-[32px] sm:rounded-[40px] md:rounded-[48px] bg-[#EEF2F6] border border-[#D7E2EA]/60"
            >
              {!imgErr2 ? (
                <img
                  src={project.col1Image2}
                  alt={project.altCol1Image2 || `${project.name} preview 2`}
                  onError={() => setImgErr2(true)}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-3 bg-[#EEF2F6] text-black/70">
                  <span className="font-mono text-xs uppercase tracking-wider font-semibold">
                    {project.name} · Preview 2
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column (60% width): 1 tall image filling left column height */}
          <div className="w-full md:w-[60%] flex flex-col">
            <div className="relative w-full h-[200px] sm:h-[260px] md:h-full min-h-full overflow-hidden rounded-[32px] sm:rounded-[40px] md:rounded-[48px] bg-[#EEF2F6] border border-[#D7E2EA]/60">
              {!imgErr3 ? (
                <img
                  src={project.col2Image}
                  alt={project.altCol2Image || `${project.name} full preview`}
                  onError={() => setImgErr3(true)}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-[#EEF2F6] text-black/70">
                  <span className="font-mono text-xs uppercase tracking-wider font-semibold">
                    {project.name} · Showcase
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
};
