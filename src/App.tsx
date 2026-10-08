/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { useScroll, useMotionValueEvent } from 'motion/react';
import {
  PROJECTS,
  ABOUT_HEADLINE,
  ABOUT_PARAGRAPH,
  CONTACT_INFO,
  Project,
} from './data/portfolioData';
import { ProjectModal } from './components/ProjectModal';
import { TechnicalSkillCards } from './components/TechnicalSkillCards';
import { ExperienceRows } from './components/ExperienceRows';
import { ArrowUpRight } from 'lucide-react';

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);

  // Interaction tracking state (HERO SCENE)
  const [activeSide, setActiveSide] = useState<'left' | 'right' | 'center'>('center');
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0.5, y: 0.5 });
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Scroll scrub tracking for Section 04: ABOUT
  const aboutTrackRef = useRef<HTMLDivElement>(null);
  const [aboutProgress, setAboutProgress] = useState(0);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const rafIdRef = useRef<number | null>(null);

  // Selected project for case study modal
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Target timestamp seeker with seek-queue mechanism (HERO SCENE)
  const seekToTime = (time: number) => {
    const video = videoRef.current;
    if (!video || !video.duration || isNaN(video.duration)) return;

    const clampedTime = Math.max(0, Math.min(video.duration, time));
    targetTimeRef.current = clampedTime;

    if (!isSeekingRef.current) {
      isSeekingRef.current = true;
      video.currentTime = clampedTime;
    }
  };

  // The character has a smooth left-to-right gaze turn arc from 0.05s (left) to 1.15s (center) to 2.35s (right)
  const TURN_START = 0.05;
  const TURN_CENTER = 1.15;
  const TURN_END = 2.35;

  const handleSeeked = () => {
    const video = videoRef.current;
    if (!video) return;

    if (Math.abs(video.currentTime - targetTimeRef.current) > 0.03) {
      video.currentTime = targetTimeRef.current;
    } else {
      isSeekingRef.current = false;
    }
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.volume = 0;
      targetTimeRef.current = TURN_CENTER;
      video.currentTime = TURN_CENTER;
    }
  };

  // Cursor tracking on the interactive room (HERO SCENE)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 0.6) return;

      const normX = e.clientX / window.innerWidth;
      const normY = e.clientY / window.innerHeight;
      setCursorPos({ x: normX, y: normY });

      const video = videoRef.current;
      if (!video) return;

      if (normX < 0.44) {
        setActiveSide('left');
      } else if (normX > 0.56) {
        setActiveSide('right');
      } else {
        setActiveSide('center');
      }

      if (!hoveredNav) {
        const targetSec = TURN_START + normX * (TURN_END - TURN_START);
        seekToTime(targetSec);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [hoveredNav]);

  // Scroll scrub tracking across the 400vh wrapper for Section 04: ABOUT
  const { scrollYProgress } = useScroll({
    target: aboutTrackRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setAboutProgress(latest);
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const mediaHandler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', mediaHandler);

    const handleScroll = () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => {
        if (!aboutTrackRef.current) return;
        const rect = aboutTrackRef.current.getBoundingClientRect();
        const totalScrollable = rect.height - window.innerHeight;
        if (totalScrollable <= 0) return;
        const current = -rect.top;
        const progress = Math.min(Math.max(current / totalScrollable, 0), 1);
        setAboutProgress(progress);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      mediaQuery.removeEventListener('change', mediaHandler);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  const headlineWords = ABOUT_HEADLINE.split(' ');
  const paragraphWords = ABOUT_PARAGRAPH.split(' ');
  const totalWordCount = headlineWords.length + paragraphWords.length;

  // At p >= 0.85 all words are black; Resume button fades and slides in over p 0.85 to 0.95
  const buttonProgress = prefersReducedMotion
    ? 1
    : Math.min(Math.max((aboutProgress - 0.85) / 0.1, 0), 1);
  const buttonOpacity = buttonProgress;
  const buttonTranslateY = (1 - buttonProgress) * 16;

  const handleNavHover = (section: string | null) => {
    setHoveredNav(section);
    const video = videoRef.current;
    if (!video) return;

    if (section) {
      seekToTime(TURN_END);
      setActiveSide('right');
    } else {
      seekToTime(TURN_START + cursorPos.x * (TURN_END - TURN_START));
    }
  };

  const handleLeftHover = (isHovered: boolean) => {
    const video = videoRef.current;
    if (!video) return;

    if (isHovered) {
      seekToTime(TURN_START);
      setActiveSide('left');
    } else {
      seekToTime(TURN_START + cursorPos.x * (TURN_END - TURN_START));
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCopyEmail = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(CONTACT_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#FFFFFF] text-[#1A1A1A] antialiased selection:bg-neutral-200 selection:text-neutral-900">
      {/* ─────────────────────────────────────────────────────────────
          HERO SCENE: "The Interactive Room"
          PRESERVED INTACT: Layout, 3D character, animation logic
      ───────────────────────────────────────────────────────────── */}
      <section className="relative w-full h-screen overflow-hidden flex flex-col justify-between px-6 sm:px-10 md:px-12 lg:px-14 pt-6 sm:pt-10 md:pt-12 lg:pt-14 pb-3 sm:pb-4 md:pb-5 select-none bg-[#FFFFFF]">
        {/* ── CENTER: THE CHARACTER (Main Visual Focal Point) ── */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          <div
            className="relative w-full max-w-[540px] sm:max-w-[700px] md:max-w-[820px] lg:max-w-[920px] xl:max-w-[1000px] h-[78vh] sm:h-[80vh] md:h-[82vh] max-h-[840px] flex items-center justify-center -translate-y-2 sm:translate-y-0 md:translate-y-2 lg:translate-y-3 transition-transform duration-300 ease-out"
            style={{
              transform: `perspective(1000px) rotateY(${(cursorPos.x - 0.5) * 8}deg) rotateX(${-(cursorPos.y - 0.5) * 6}deg)`,
            }}
          >
            <video
              ref={videoRef}
              src="/character.mp4"
              muted
              playsInline
              preload="auto"
              onSeeked={handleSeeked}
              onLoadedMetadata={handleLoadedMetadata}
              className="w-full h-full object-contain pointer-events-none mix-blend-multiply"
              style={{
                clipPath: 'inset(0% 0% 1.2% 0%)',
                filter: 'contrast(1.06) brightness(1.02)',
                WebkitMaskImage: 'radial-gradient(ellipse 70% 80% at 50% 50%, black 45%, transparent 88%)',
                maskImage: 'radial-gradient(ellipse 70% 80% at 50% 50%, black 45%, transparent 88%)',
              }}
            />
          </div>
        </div>

        {/* ── MAIN SCENE LAYER: LEFT & RIGHT CORES ── */}
        <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start my-auto -translate-y-8 sm:-translate-y-9 md:-translate-y-9 pointer-events-none">
          {/* ──────────────── LEFT: HERO INTRODUCTION ──────────────── */}
          <div className="max-w-xs sm:max-w-sm pointer-events-auto transition-all duration-300 opacity-100">
            <div className="text-xs sm:text-[13px] font-mono font-semibold tracking-widest text-[#111111]/70 mb-2.5 uppercase leading-none">
              HELLO, I'M
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-[#111111] leading-tight mb-2.5">
              Pavitha
            </h1>

            <div className="text-sm sm:text-base font-semibold text-[#111111] mb-3 leading-snug">
              Software Developer & Creative Developer
            </div>

            <p className="text-sm sm:text-[15px] font-normal text-[#111111]/85 leading-relaxed mb-6 max-w-[290px] sm:max-w-sm">
              I build interactive digital experiences with code and creativity.
            </p>

            {/* Primary CTA */}
            <div>
              <button
                onClick={() => scrollToSection('projects')}
                onMouseEnter={() => handleLeftHover(true)}
                onMouseLeave={() => handleLeftHover(false)}
                className="group inline-flex items-center gap-2 px-5.5 py-2.5 sm:px-6 sm:py-3 bg-[#111111] text-white rounded-full text-xs sm:text-sm font-semibold hover:bg-black transition-all duration-200 cursor-pointer shadow-sm active:scale-95"
              >
                <span>VIEW MY WORK</span>
                <span className="transform transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          </div>

          {/* ──────────────── RIGHT: SCENE NAVIGATION (UPDATED 01 to 05) ──────────────── */}
          <div className="pointer-events-auto flex flex-col items-start md:items-end transition-all duration-300 opacity-100">
            <div className="text-xs sm:text-[13px] font-mono font-semibold tracking-widest text-[#111111]/70 mb-3 uppercase leading-none">
              EXPLORE
            </div>

            <nav className="flex flex-col gap-3 sm:gap-3.5 items-start md:items-end">
              {[
                { num: '01', label: 'ABOUT', id: 'about' },
                { num: '02', label: 'PROJECTS', id: 'projects' },
                { num: '03', label: 'EXPERIENCE', id: 'experience' },
                { num: '04', label: 'TECHNICAL SKILLS', id: 'skills' },
                { num: '05', label: 'CONTACT', id: 'contact' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  onMouseEnter={() => handleNavHover(item.id)}
                  onMouseLeave={() => handleNavHover(null)}
                  className="group flex items-center gap-3 text-left md:text-right cursor-pointer py-0.5 focus:outline-none"
                >
                  <span className="text-xs sm:text-sm font-mono font-bold text-[#111111]/55 group-hover:text-[#111111] transition-colors">
                    {item.num}
                  </span>
                  <span className="text-lg sm:text-xl lg:text-[22px] font-bold tracking-tight text-[#111111] group-hover:translate-x-1 transition-all duration-200">
                    {item.label}
                  </span>
                  <span className="text-base sm:text-lg text-[#111111] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 font-bold">
                    →
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* ── BOTTOM INFORMATION BAR ── */}
        <footer className="relative z-20 w-full pt-3 pb-1 select-none">
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 items-center gap-3 text-xs font-mono">
            {/* Left */}
            <div className="text-left text-[#111111]/60 font-medium tracking-wider">
              BASED IN INDIA
            </div>

            {/* Center */}
            <div className="text-center">
              <button
                onClick={() => scrollToSection('about')}
                className="group inline-flex items-center gap-1.5 text-[#111111]/60 hover:text-[#111111] transition-colors cursor-pointer font-medium"
              >
                <span className="inline-block transform transition-transform group-hover:translate-y-0.5">↓</span>
                <span className="tracking-wider">SCROLL TO EXPLORE</span>
              </button>
            </div>

            {/* Right: Social links */}
            <div className="flex items-center justify-start sm:justify-end gap-5">
              <a
                href={CONTACT_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#111111]/60 hover:text-[#111111] transition-colors tracking-wider font-medium"
              >
                GITHUB
              </a>
              <a
                href={CONTACT_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#111111]/60 hover:text-[#111111] transition-colors tracking-wider font-medium"
              >
                LINKEDIN
              </a>
              <button
                onClick={handleCopyEmail}
                className="text-[#111111]/60 hover:text-[#111111] transition-colors tracking-wider cursor-pointer font-medium"
              >
                {copiedEmail ? 'COPIED!' : 'EMAIL'}
              </button>
            </div>
          </div>
        </footer>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          CONTENT SECTIONS: CONTINUOUS PURE WHITE BACKGROUND
      ───────────────────────────────────────────────────────────── */}
      <div className="relative overflow-x-clip w-full bg-[#FFFFFF]">
        {/* ─────────────────────────────────────────────────────────────
            SECTION 01: ABOUT (Pinned Center Scroll Track: 400vh)
        ───────────────────────────────────────────────────────────── */}
        <section
          id="about"
          ref={aboutTrackRef}
          className="relative z-20 w-full bg-[#FFFFFF]"
          style={{ height: prefersReducedMotion ? 'auto' : '400vh' }}
        >
          {/* Sticky container: stays pinned at top: 0, 100vh height */}
          <div
            className={`${
              prefersReducedMotion
                ? 'relative min-h-screen py-20'
                : 'sticky top-0 h-screen'
            } w-full flex flex-col justify-between max-w-6xl mx-auto px-6 sm:px-10 md:px-16 pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-12 select-none bg-[#FFFFFF] overflow-x-clip`}
          >
            {/* Header: Number 01 ABOUT */}
            <div className="w-full">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#111111] uppercase flex items-baseline gap-3 sm:gap-4">
                <span className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold text-[#111111]/35">
                  01
                </span>
                <span>ABOUT</span>
              </h2>
            </div>

            {/* Centered text block: headline, paragraph, resume button placed below header */}
            <div className="w-full flex-1 flex flex-col items-center justify-center text-center my-auto px-2 sm:px-4">
              {/* Headline: clean, balanced size */}
              <h3
                style={{
                  fontSize: 'clamp(20px, 2.2vw, 32px)',
                  lineHeight: 1.25,
                  maxWidth: '760px',
                }}
                className="font-medium tracking-tight text-center mx-auto"
              >
                {headlineWords.map((word, index) => {
                  const globalIndex = index;
                  // Word 0 is already black at p = 0; remaining words mapped from 0 to 0.85
                  const threshold = (globalIndex / (totalWordCount - 1)) * 0.85;
                  const isDarkened =
                    prefersReducedMotion ||
                    globalIndex === 0 ||
                    aboutProgress >= threshold;

                  return (
                    <span
                      key={`h-${index}`}
                      className={`inline-block mr-[0.26em] transition-colors duration-150 ease-out ${
                        isDarkened ? 'text-[#111111]' : 'text-[#C4C4C4]'
                      }`}
                    >
                      {word}
                    </span>
                  );
                })}
              </h3>

              {/* Supporting Paragraph: clean size and spacing - one size larger as requested */}
              <p
                style={{
                  fontSize: 'clamp(15px, 1.25vw, 18px)',
                  lineHeight: 1.6,
                  maxWidth: '680px',
                  marginTop: '22px',
                }}
                className="font-normal text-center mx-auto text-[#111111]/80"
              >
                {paragraphWords.map((word, index) => {
                  const globalIndex = headlineWords.length + index;
                  const threshold = (globalIndex / (totalWordCount - 1)) * 0.85;
                  const isDarkened =
                    prefersReducedMotion ||
                    aboutProgress >= threshold;

                  return (
                    <span
                      key={`p-${index}`}
                      className={`inline-block mr-[0.24em] transition-colors duration-150 ease-out ${
                        isDarkened ? 'text-[#111111]' : 'text-[#C4C4C4]'
                      }`}
                    >
                      {word}
                    </span>
                  );
                })}
              </p>

              {/* Resume Button: centered, fades and slides in over p 0.85 to 0.95 */}
              <div
                style={{
                  marginTop: '24px',
                  opacity: prefersReducedMotion ? 1 : buttonOpacity,
                  transform: prefersReducedMotion ? 'none' : `translateY(${buttonTranslateY}px)`,
                  pointerEvents: (prefersReducedMotion || aboutProgress >= 0.85) ? 'auto' : 'none',
                }}
                className="flex justify-center transition-all duration-200"
              >
                {/* TODO: replace "#" with resume link */}
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-7 py-3 sm:px-8 sm:py-3.5 rounded-full bg-[#111111] text-white text-sm sm:text-base font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:bg-black active:scale-95 cursor-pointer"
                >
                  Resume
                </a>
              </div>
            </div>

            {/* Bottom balancing space */}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 02: PROJECTS (Clean Side-by-Side Dual-Grid Layout)
        ───────────────────────────────────────────────────────────── */}
        <section
          id="projects"
          className="relative z-20 w-full bg-[#FFFFFF]"
        >
          <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-16 py-20 sm:py-28">
            {/* Header: Strictly Minimal & Confident "02 PROJECTS" */}
            <div className="mb-12 sm:mb-16">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#111111] uppercase flex items-baseline gap-3 sm:gap-4">
                <span className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold text-[#111111]/35">
                  02
                </span>
                <span>PROJECTS</span>
              </h2>
            </div>

            {/* Dual-Grid 2-Column Side-by-Side Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 lg:gap-14">
              {PROJECTS.map((project) => (
                <div key={project.id} className="group flex flex-col">
                  {/* Top Image Container: 16:10 Aspect Ratio, Overflow Hidden */}
                  <div
                    onClick={() => setSelectedProject(project)}
                    className="relative w-full aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#F4F4F4] border border-black/[0.08] cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 group"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                      loading="lazy"
                    />

                    {/* Subtle hover overlay affordance */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                      <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 px-4 py-2 rounded-full bg-white/95 text-xs font-semibold text-[#111111] shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0">
                        <span>View Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                  {/* Clean Minimal Title & Details button - ONLY project title kept */}
                  <div className="pt-5 flex items-center justify-between">
                    <h3
                      onClick={() => setSelectedProject(project)}
                      className="text-xl sm:text-2xl font-bold text-[#111111] tracking-tight hover:text-black transition-colors cursor-pointer"
                    >
                      {project.title}
                    </h3>

                    <div className="flex items-center gap-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-[#111111]/70 hover:text-[#111111] transition-colors"
                        >
                          <span>Live</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#111111] text-white text-xs font-medium hover:bg-black/85 transition-all cursor-pointer shadow-xs active:scale-95"
                      >
                        <span>Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 03: EXPERIENCE
        ───────────────────────────────────────────────────────────── */}
        <section
          id="experience"
          className="relative z-20 w-full bg-[#FFFFFF]"
        >
          <div
            className="mx-auto px-6 sm:px-10 md:px-12 py-16 sm:py-20 md:py-24"
            style={{ width: 'min(92vw, 1240px)' }}
          >
            {/* Header: Matches Projects & About numbered label style - 03 EXPERIENCE only */}
            <div className="mb-12 sm:mb-16">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#111111] uppercase flex items-baseline gap-3 sm:gap-4">
                <span className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold text-[#111111]/35">
                  03
                </span>
                <span>EXPERIENCE</span>
              </h2>
            </div>

            {/* Full-width list of rows separated by thin 1px light gray (#E5E5E5) divider lines */}
            <ExperienceRows />
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 04: TECHNICAL SKILLS (Capabilities)
        ───────────────────────────────────────────────────────────── */}
        <section
          id="skills"
          className="relative z-10 w-full py-12 sm:py-14 md:py-16 px-6 sm:px-10 md:px-16 max-w-6xl mx-auto"
        >
          {/* Header: Matches Projects & About numbered label style: "04 TECHNICAL SKILLS" */}
          <div className="mb-8 sm:mb-10">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#111111] uppercase flex items-baseline gap-3 sm:gap-4">
              <span className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold text-[#111111]/35">
                04
              </span>
              <span>TECHNICAL SKILLS</span>
            </h2>
          </div>

          <TechnicalSkillCards prefersReducedMotion={prefersReducedMotion} />
        </section>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 05: LET'S CONNECT
        ───────────────────────────────────────────────────────────── */}
        <section
          id="contact"
          className="relative z-20 w-full bg-[#FFFFFF]"
        >
          <div className="w-full flex flex-col justify-between max-w-6xl mx-auto px-6 sm:px-10 md:px-16 py-20 sm:py-24 md:py-28 select-none bg-[#FFFFFF]">
            {/* Header: Matches About heading style with 05 LET'S CONNECT */}
            <div className="w-full mb-12 sm:mb-16">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#111111] uppercase flex items-baseline gap-3 sm:gap-4">
                <span className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold text-[#111111]/35">
                  05
                </span>
                <span>LET'S CONNECT</span>
              </h2>
            </div>

            {/* Centered text & icons block */}
            <div className="w-full flex flex-col items-center justify-center text-center mx-auto px-2 sm:px-4">
              {/* Main Line: same large centered medium-weight style, solid black, wrapping into 3 balanced lines */}
              <h3
                style={{
                  fontSize: 'clamp(20px, 2.2vw, 32px)',
                  lineHeight: 1.35,
                  maxWidth: '820px',
                }}
                className="font-medium tracking-tight text-center mx-auto text-[#111111]"
              >
                I'm actively seeking software engineering and AI engineer roles across Japan and India. Reach out directly through email or connect on LinkedIn and GitHub.
              </h3>

              {/* Centered row of exactly three monochrome logo icons: Email, GitHub, LinkedIn */}
              <div
                style={{ marginTop: '40px' }}
                className="flex items-center justify-center gap-10 sm:gap-12"
              >
                {/* Email */}
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  aria-label="Send email to pavithasivakumar2681@gmail.com"
                  className="text-[#111111] hover:text-[#555555] transition-all duration-200 hover:-translate-y-1 inline-flex items-center justify-center p-1.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] rounded"
                >
                  <svg
                    className="w-7 h-7 sm:w-8 sm:h-8"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </a>

                {/* GitHub */}
                <a
                  href={CONTACT_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Pavitha on GitHub"
                  className="text-[#111111] hover:text-[#555555] transition-all duration-200 hover:-translate-y-1 inline-flex items-center justify-center p-1.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] rounded"
                >
                  <svg
                    className="w-7 h-7 sm:w-8 sm:h-8"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href={CONTACT_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Pavitha on LinkedIn"
                  className="text-[#111111] hover:text-[#555555] transition-all duration-200 hover:-translate-y-1 inline-flex items-center justify-center p-1.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] rounded"
                >
                  <svg
                    className="w-7 h-7 sm:w-8 sm:h-8"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 0 0 1.54-1.53c0-.85-.69-1.54-1.54-1.54a1.54 1.54 0 0 0-1.54 1.54c0 .84.69 1.53 1.54 1.53m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="relative z-10 w-full py-12 px-6 sm:px-10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-[#1A1A1A]/60 max-w-6xl mx-auto">
          <div>© 2026 Pavitha Sivakumar</div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-[#1A1A1A] hover:text-[#111111] transition-colors cursor-pointer inline-flex items-center gap-1.5"
          >
            <span>Back to Top</span>
            <span>↑</span>
          </button>
        </footer>
      </div>

      {/* ── CASE STUDY MODAL ── */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
