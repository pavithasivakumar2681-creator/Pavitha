import React, { useRef, useState, useEffect } from 'react';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  tint?: 'pink' | 'blue' | 'peach' | 'sand' | 'neutral';
  delay?: number; // stagger delay in seconds
  liftAmount?: number; // default 10px (between 8 and 12px)
}

export const Card3D: React.FC<Card3DProps> = ({
  children,
  className = '',
  tint = 'neutral',
  delay = 0,
  liftAmount = 10,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<string>('perspective(1000px) translateY(0px) rotateX(0deg) rotateY(0deg)');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [canTilt, setCanTilt] = useState(true);

  // Check for reduced motion & touch device
  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setCanTilt(!isTouch && !isReduced);

    // Scroll reveal observer
    const el = cardRef.current;
    if (!el) return;

    if (isReduced) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canTilt || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

    // Max 8 degrees tilt toward the mouse
    const rotX = -y * 8;
    const rotY = x * 8;

    setTransform(`perspective(1000px) translateY(-${liftAmount}px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!canTilt) {
      setTransform(`perspective(1000px) translateY(-4px)`);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform('perspective(1000px) translateY(0px) rotateX(0deg) rotateY(0deg)');
  };

  // Palette backgrounds
  const gradientBg = {
    pink: 'linear-gradient(145deg, #FFFFFF 0%, rgba(246, 220, 203, 0.24) 30%, rgba(244, 201, 201, 0.35) 75%, rgba(232, 143, 160, 0.15) 100%)',
    blue: 'linear-gradient(145deg, #FFFFFF 0%, rgba(246, 220, 203, 0.18) 25%, rgba(169, 192, 218, 0.38) 75%, rgba(94, 131, 173, 0.18) 100%)',
    peach: 'linear-gradient(145deg, #FFFFFF 0%, rgba(246, 220, 203, 0.36) 45%, rgba(244, 201, 201, 0.22) 100%)',
    sand: 'linear-gradient(145deg, #FFFFFF 0%, #FAF8F5 45%, #F4EFEA 100%)',
    neutral: 'linear-gradient(145deg, #FFFFFF 0%, rgba(244, 201, 201, 0.18) 35%, rgba(169, 192, 218, 0.22) 80%, rgba(246, 220, 203, 0.15) 100%)',
  }[tint];

  // Resting and hovered multi-step shadows
  const restingShadow =
    '0 2px 4px -1px rgba(26, 26, 26, 0.04), 0 12px 24px -4px rgba(94, 131, 173, 0.09), 0 6px 16px -2px rgba(232, 143, 160, 0.07), inset 0 1.5px 1px rgba(255, 255, 255, 0.95)';
  
  const hoveredShadow =
    '0 4px 10px -2px rgba(26, 26, 26, 0.06), 0 28px 46px -6px rgba(94, 131, 173, 0.22), 0 16px 28px -4px rgba(232, 143, 160, 0.18), inset 0 1.5px 1px rgba(255, 255, 255, 1)';

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        background: gradientBg,
        transform,
        boxShadow: isHovered ? hoveredShadow : restingShadow,
        transition: isHovered
          ? 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease-out'
          : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease-out',
        willChange: 'transform, box-shadow',
        opacity: isVisible ? 1 : 0,
        transformOrigin: 'center center',
      }}
      className={`rounded-3xl border border-black/[0.06] relative overflow-hidden transition-opacity duration-700 ${
        isVisible ? 'translate-y-0' : 'translate-y-6'
      } ${className}`}
      style-delay={`${delay}s`}
    >
      {/* Subtle top edge highlight */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none opacity-80" />
      {children}
    </div>
  );
};
