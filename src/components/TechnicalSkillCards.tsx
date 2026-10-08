import React, { useRef, useState, useEffect } from 'react';
import { TECHNICAL_SKILL_CARDS, TechnicalSkillCard } from '../data/portfolioData';

interface TechnicalSkillCardsProps {
  prefersReducedMotion?: boolean;
}

interface SingleCardProps {
  card: TechnicalSkillCard;
  index: number;
  prefersReducedMotion: boolean;
}

const SingleSkillCard: React.FC<SingleCardProps> = ({
  card,
  index,
  prefersReducedMotion,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const staggerDelay = index * 80;

  return (
    <div
      ref={cardRef}
      style={{
        transitionDelay: isVisible ? '0ms' : `${staggerDelay}ms`,
      }}
      className={`h-full bg-[#404040] border-2 border-[#404040] rounded-[24px] p-5 sm:p-6 flex flex-col justify-start text-white transition-all duration-300 ease-out select-none ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${
        prefersReducedMotion
          ? ''
          : 'hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30 motion-reduce:transform-none motion-reduce:shadow-none'
      }`}
    >
      {/* TODO: AI Tools card placeholder chips and groupings */}
      <div className="space-y-4">
        {card.groups.map((group, gIdx) => (
          <div key={gIdx} className="w-full">
            {/* Group Sub-heading in uppercase white with thin divider */}
            <div className="pb-2 mb-3 border-b border-white/15">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFFFFF]">
                {group.title}
              </h3>
            </div>

            {/* Pill-shaped chips: solid white background, black text, no border, fully rounded, compact 14px font */}
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center rounded-full bg-[#FFFFFF] text-[#111111] px-3.5 py-1.5 text-[14px] font-semibold tracking-tight leading-normal"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const TechnicalSkillCards: React.FC<TechnicalSkillCardsProps> = ({
  prefersReducedMotion = false,
}) => {
  const educationRef = useRef<HTMLDivElement>(null);
  const [isEducationVisible, setIsEducationVisible] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsEducationVisible(true);
      return;
    }

    const el = educationRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsEducationVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <div className="w-full">
      {/* Row of 4 shorter equal-height black cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {TECHNICAL_SKILL_CARDS.map((card, idx) => (
          <SingleSkillCard
            key={card.id}
            card={card}
            index={idx}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </div>

      {/* Simplified, compact full-width Education card directly below with ~16px gap */}
      <div
        ref={educationRef}
        style={{
          transitionDelay: isEducationVisible ? '0ms' : '320ms',
        }}
        className={`w-full mt-4 bg-[#404040] border-2 border-[#404040] rounded-[24px] p-5 text-white transition-all duration-300 ease-out select-none ${
          isEducationVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        } ${
          prefersReducedMotion
            ? ''
            : 'hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30 motion-reduce:transform-none motion-reduce:shadow-none'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex flex-col">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-white/50 mb-0.5">
              EDUCATION
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
              B.E. Computer Science and Engineering
            </h3>
            <p className="text-xs sm:text-sm font-medium text-white/70 mt-0.5">
              Hindusthan College of Engineering and Technology, Coimbatore
            </p>
          </div>

          <div className="self-start sm:self-center shrink-0">
            <span className="inline-flex items-center rounded-full bg-white text-[#111111] px-3.5 py-1 text-xs font-mono font-bold">
              2024 - 2028
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
