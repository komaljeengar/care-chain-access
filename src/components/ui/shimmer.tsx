import React from 'react';
import { cn } from '@/lib/utils';

interface ShimmerProps {
  className?: string;
  children?: React.ReactNode;
}

const Shimmer: React.FC<ShimmerProps> = ({ className, children }) => {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {children}
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
};

export default Shimmer;
