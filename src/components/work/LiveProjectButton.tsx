/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LiveProjectButtonProps {
  href: string;
  projectName?: string;
  className?: string;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({
  href,
  projectName = 'project',
  className = '',
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open live project for ${projectName} in a new tab`}
      className={`inline-flex items-center justify-center rounded-full border-2 border-black text-black font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-black/10 transition-colors duration-200 whitespace-nowrap active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${className}`}
    >
      <span>Live Project</span>
    </a>
  );
};
