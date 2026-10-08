/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PROJECTS_DATA } from '../../data/projectsData';
import { SectionHeading } from './SectionHeading';
import { ProjectCard } from './ProjectCard';

export const ProjectsSection: React.FC = () => {
  return (
    <section
      id="projects"
      style={{ overflowX: 'clip' }}
      className="relative z-10 w-full bg-white text-black rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] border-t-2 border-[#D7E2EA] -mt-10 sm:-mt-12 md:-mt-14 px-6 sm:px-10 md:px-16 pt-14 sm:pt-18 md:pt-20 pb-16 sm:pb-24"
    >
      {/* Width matched to landing page standard (max-w-6xl) */}
      <div className="max-w-6xl mx-auto w-full">
        {/* Heading: "Project" using .hero-heading gradient + AnimatedText */}
        <SectionHeading />

        {/* 4 Sticky-Stacking Project Cards scaled to match landing page */}
        <div className="w-full flex flex-col space-y-6 sm:space-y-8 md:space-y-12">
          {PROJECTS_DATA.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              totalCards={PROJECTS_DATA.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
