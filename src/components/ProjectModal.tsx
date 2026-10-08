import React, { useEffect } from 'react';
import { Project } from '../data/portfolioData';
import { ArrowUpRight, Github } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-md transition-opacity duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white text-[#111111] rounded-3xl overflow-hidden border border-black/[0.08] transition-all duration-300 max-h-[92vh] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 sm:p-8 border-b border-black/[0.06] bg-[#FFFFFF]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#111111]/50 font-semibold mb-1 uppercase tracking-wider">
              <span>PROJECT {project.number}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm font-medium text-[#111111]/70 mt-1 max-w-lg">
              {project.subtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#111111]/60 hover:text-[#111111] hover:bg-black/5 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="2" y1="2" x2="12" y2="12" />
              <line x1="12" y1="2" x2="12" y2="12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Project Image Preview */}
          <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#F0F0F0] border border-black/[0.08] shadow-xs">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#111111]/50 mb-2.5">
              Project Overview
            </h3>
            <p className="text-sm sm:text-base text-[#111111]/85 leading-relaxed">
              {project.description}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#111111]/50 mb-2.5">
              Technologies & Frameworks
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md px-2.5 py-1 text-xs font-mono bg-[#F4F4F4] text-[#222222] border border-black/[0.04]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between p-6 border-t border-black/[0.06] bg-[#FFFFFF]">
          <span className="text-xs text-[#111111]/50 font-mono">
            Pavitha Sivakumar · Portfolio
          </span>
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium bg-[#111111] text-white rounded-full transition-all hover:bg-black/85"
              >
                <span>{project.liveLabel || 'Live Preview'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium border border-black/20 rounded-full hover:bg-[#111111] hover:text-white transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Source</span>
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium border border-black/10 rounded-full hover:bg-black/5 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
