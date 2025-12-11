'use client';

import React from 'react';

type Props = {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
};

export default function AnimatedCard({ title, subtitle, children, className = '', icon }: Props) {
  return (
    <div className={`card-premium animated-card ${className}`}>
      <div className="flex items-start gap-4">
        {icon ? (
          <div className="icon bg-gradient-gold-blue text-white flex-shrink-0">
            {icon}
          </div>
        ) : null}

        <div className="flex-1">
          {title ? <p className="text-white font-bold text-lg">{title}</p> : null}
          {subtitle ? <p className="text-sm text-gray-300">{subtitle}</p> : null}
          {children ? <div className="mt-3 text-gray-300">{children}</div> : null}
        </div>
      </div>
    </div>
  );
}
