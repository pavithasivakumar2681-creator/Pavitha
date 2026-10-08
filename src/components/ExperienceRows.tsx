import React, { useState } from 'react';
import {
  INTERNSHIP_EXPERIENCE,
  CERTIFICATION_EXPERIENCE,
  LANGUAGE_TRAINING,
} from '../data/portfolioData';

interface ExperienceRowItem {
  id: string;
  title: string;
  tags: string[];
  renderContent: () => React.ReactNode;
}

export const ExperienceRows: React.FC = () => {
  // All rows closed by default on page load; only expand when clicked
  const [openRows, setOpenRows] = useState<Record<string, boolean>>({});

  const toggleRow = (id: string) => {
    setOpenRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const rows: ExperienceRowItem[] = [
    {
      id: 'internship',
      title: 'Software Development Internship',
      tags: ['VIMIX Technologies', 'Aug 2026 - Sep 2026'],
      renderContent: () => (
        <div className="pt-2 pb-8 text-[#222222] max-w-4xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="text-base sm:text-lg font-bold text-[#111111]">
              {INTERNSHIP_EXPERIENCE.role}
              <span className="font-normal text-[#555555] ml-2">
                · {INTERNSHIP_EXPERIENCE.company}
              </span>
            </div>
            <a
              href="/certificates/Vimix-Internship-Certificate.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border border-black/20 text-[#111111] hover:bg-[#111111] hover:text-white transition-all duration-200 cursor-pointer self-start sm:self-auto shrink-0"
            >
              <span>View</span>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          <ul className="space-y-2 mt-3">
            {INTERNSHIP_EXPERIENCE.bullets.map((bullet, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-sm sm:text-[15px] text-[#333333] leading-relaxed"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#111111] mt-2 shrink-0" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      id: 'certification',
      title: 'Cloud Computing Certification',
      tags: ['NPTEL', 'Elite + topper top 2%'],
      renderContent: () => (
        <div className="pt-2 pb-8 text-[#222222] max-w-4xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
            <div className="text-base sm:text-lg font-bold text-[#111111]">
              {CERTIFICATION_EXPERIENCE.title}
              <span className="font-normal text-[#555555] ml-2">
                · {CERTIFICATION_EXPERIENCE.issuer}
              </span>
            </div>
            <a
              href="/certificates/NPTEL-Cloud-Computing-Certificate.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border border-black/20 text-[#111111] hover:bg-[#111111] hover:text-white transition-all duration-200 cursor-pointer self-start sm:self-auto shrink-0"
            >
              <span>View</span>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          <div className="text-xs sm:text-sm font-semibold text-[#111111] mb-2">
            ★ {CERTIFICATION_EXPERIENCE.credential}
          </div>

          <p className="text-sm sm:text-[15px] text-[#444444] leading-relaxed">
            Rigorous national examination and 12-week coursework covering cloud architecture, distributed systems, virtualization, and scalability administered by NPTEL, finishing in the top 2% nationwide with a 90% aggregate score.
          </p>
        </div>
      ),
    },
    {
      id: 'hackathons',
      title: 'Smart India Hackathons',
      tags: ['CrimeNet', 'Udaan Mitra'],
      renderContent: () => (
        <div className="pt-2 pb-8 text-[#222222] max-w-4xl space-y-6">
          {/* CrimeNet */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
              <div className="text-sm sm:text-base font-bold text-[#111111]">
                CrimeNet
                <span className="font-normal text-[#555555] ml-2">
                  · Team Block Guard, PS 26189
                </span>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <a
                  href="/certificates/SIH-CrimeNet-Certificate.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border border-black/20 text-[#111111] hover:bg-[#111111] hover:text-white transition-all duration-200 cursor-pointer"
                >
                  <span>View</span>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <a
                  href="https://github.com/pavithasivakumar2681-creator/CrimeNet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border border-black/20 text-[#111111] hover:bg-[#111111] hover:text-white transition-all duration-200 cursor-pointer"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>Git</span>
                </a>
              </div>
            </div>
            <p className="text-sm sm:text-[15px] text-[#444444] leading-relaxed">
              Engineered an AI-powered Criminal Network Analysis System within a 6-member team. Developed algorithms to ingest, parse, and unify highly fragmented crime records (FIRs, CDRs, and financial data). Transformed unstructured data points into an interactive, dynamic network graph, allowing investigators to instantly map illicit connections and hidden node hubs.
            </p>
          </div>

          {/* Udaan Mithra */}
          <div className="pt-5 border-t border-[#EAEAEA]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
              <div className="text-sm sm:text-base font-bold text-[#111111]">
                Udaan Mithra
                <span className="font-normal text-[#555555] ml-2">
                  · Selection Stage Qualified
                </span>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <a
                  href="/certificates/SIH-UdaanMithra-Certificate.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border border-black/20 text-[#111111] hover:bg-[#111111] hover:text-white transition-all duration-200 cursor-pointer"
                >
                  <span>View</span>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <a
                  href="https://github.com/pavithasivakumar2681-creator/Udaan-Mithra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border border-black/20 text-[#111111] hover:bg-[#111111] hover:text-white transition-all duration-200 cursor-pointer"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>Git</span>
                </a>
              </div>
            </div>
            <p className="text-sm sm:text-[15px] text-[#444444] leading-relaxed">
              An offline-first, multilingual education platform designed to bridge the rural digital divide in low-connectivity regions. Built a highly responsive user experience using React and JavaScript, integrated with a lightweight Supabase sync layer to ensure offline data preservation and automated synchronization.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'language',
      title: 'Japanese Language Training',
      tags: ['JLPT N5 prep', 'In progress'],
      renderContent: () => (
        <div className="pt-2 pb-8 text-[#222222] max-w-4xl">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
            <div className="text-base sm:text-lg font-bold text-[#111111]">
              {LANGUAGE_TRAINING.title}
            </div>
            <div className="text-xs sm:text-sm font-mono text-[#777777]">
              {LANGUAGE_TRAINING.status}
            </div>
          </div>

          <div className="text-xs sm:text-sm font-medium text-[#111111] mb-2">
            Target: {LANGUAGE_TRAINING.target}
          </div>

          <p className="text-sm sm:text-[15px] text-[#444444] leading-relaxed">
            Structured language and cultural communication training focusing on grammar, kanji, and conversational technical vocabulary in active preparation for software engineering opportunities in Japan.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full border-t border-[#E5E5E5]">
      {rows.map((row) => {
        const isOpen = !!openRows[row.id];

        return (
          <div
            key={row.id}
            className="border-b border-[#E5E5E5] group transition-colors duration-200"
          >
            {/* Clickable Row Header:
                Desktop (>= 1100px):
                  - flex row: title on left, tags flush right, '+' toggle circle far right
                  - Title: flex: 1 1 auto; clamp(22px, 2.1vw, 28px); weight 400-500; line-height: 1.2
                  - Tags: flex: 0 0 auto; 14px; #777; whitespace-nowrap; text-align: right; bullet dots (•)
                  - Toggle: flex: 0 0 40px; 40px circle
                Narrower screens (< 1100px):
                  - Tags move below title, left-aligned, never squeezing title area
            */}
            <button
              type="button"
              onClick={() => toggleRow(row.id)}
              aria-expanded={isOpen}
              className="w-full text-left cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
            >
              {/* DESKTOP LAYOUT (>= 1100px): Pure Flex Row */}
              <div className="experience-row-header-desktop">
                {/* Title: flex: 1 1 auto, never cropped, no ellipsis */}
                <h3
                  style={{
                    flex: '1 1 auto',
                    fontSize: 'clamp(22px, 2.1vw, 28px)',
                    fontWeight: 500,
                    lineHeight: 1.2,
                  }}
                  className="text-[#111111] tracking-tight text-left m-0 pr-4 transition-transform duration-200 group-hover:translate-x-1"
                >
                  {row.title}
                </h3>

                {/* Tags: flex: 0 0 auto, flush right, bullet dots */}
                <div
                  style={{
                    flex: '0 0 auto',
                    fontSize: '14px',
                    color: '#777777',
                    whiteSpace: 'nowrap',
                    textAlign: 'right',
                  }}
                  className="flex items-center gap-2"
                >
                  {row.tags.map((tag, tIdx) => (
                    <React.Fragment key={tIdx}>
                      <span>{tag}</span>
                      {tIdx < row.tags.length - 1 && (
                        <span className="text-[#999999]">•</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Toggle '+' circle: flex: 0 0 40px */}
                <div
                  style={{ flex: '0 0 40px' }}
                  className="flex items-center justify-center shrink-0"
                >
                  <div
                    className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? 'border-[#111111] text-[#111111] rotate-45'
                        : 'border-[#D5D5D5] text-[#777777] group-hover:border-[#111111] group-hover:text-[#111111]'
                    }`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* MOBILE & TABLET LAYOUT (< 1100px): Tags below title, left-aligned */}
              <div className="experience-row-header-mobile">
                <div className="flex items-start justify-between gap-4">
                  {/* Title on left, never cropped */}
                  <h3
                    style={{
                      flex: '1 1 auto',
                      fontSize: 'clamp(20px, 2.3vw, 26px)',
                      fontWeight: 500,
                      lineHeight: 1.2,
                    }}
                    className="text-[#111111] tracking-tight text-left m-0 transition-transform duration-200 group-hover:translate-x-1"
                  >
                    {row.title}
                  </h3>

                  {/* Toggle '+' circle on far right */}
                  <div
                    style={{ flex: '0 0 40px' }}
                    className="flex items-center justify-center shrink-0 pt-0.5"
                  >
                    <div
                      className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isOpen
                          ? 'border-[#111111] text-[#111111] rotate-45'
                          : 'border-[#D5D5D5] text-[#777777] group-hover:border-[#111111] group-hover:text-[#111111]'
                      }`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.8}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Tags below title, left-aligned */}
                <div className="text-[13px] sm:text-[14px] text-[#777777] text-left flex flex-wrap items-center gap-x-2 gap-y-1">
                  {row.tags.map((tag, tIdx) => (
                    <React.Fragment key={tIdx}>
                      <span>{tag}</span>
                      {tIdx < row.tags.length - 1 && (
                        <span className="text-[#999999]">•</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </button>

            {/* Smooth CSS Grid Accordion Container */}
            <div
              className="grid transition-all duration-300 ease-in-out"
              style={{
                gridTemplateRows: isOpen ? '1fr' : '0fr',
              }}
            >
              <div className="overflow-hidden">
                {row.renderContent()}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
