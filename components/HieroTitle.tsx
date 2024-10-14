import React from 'react';

type HieroTitleProps = {
  size?: 'small' | 'medium' | 'large';
};

const HieroTitle: React.FC<HieroTitleProps> = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6 border-2 sm:border-4 p-1 sm:p-2 shadow-[4px_4px_0_0_#ef4444] sm:shadow-[8px_8px_0_0_#ef4444]',
    medium: 'text-5xl sm:text-6xl md:text-7xl mb-6 sm:mb-8 border-3 sm:border-6 p-2 sm:p-3 shadow-[6px_6px_0_0_#ef4444] sm:shadow-[12px_12px_0_0_#ef4444]',
    large: 'text-5xl sm:text-7xl md:text-9xl mb-6 sm:mb-12 border-4 sm:border-8 p-2 sm:p-4 shadow-[8px_8px_0_0_#ef4444] sm:shadow-[16px_16px_0_0_#ef4444]',
  };

  return (
    <h1 className={`${sizeClasses[size]} font-black text-center uppercase tracking-tighter transform -skew-x-12 rotate-2 border-black bg-black relative transition-all duration-300 hover:rotate-0 hover:skew-x-0 hover:scale-105 hover:shadow-[0px_0px_0px_4px_rgba(255,255,255,1),0px_0px_0px_8px_rgba(0,0,0,1)] hover:translate-x-2 hover:translate-y-2`}>
      <span className="text-white relative z-10">Hiero</span>
      <span className="absolute inset-0 bg-gradient-to-r from-teal-200  via-cyan-300 to-emerald-200 opacity-20 mix-blend-overlay"></span>
    </h1>
  );
};

export default HieroTitle;
