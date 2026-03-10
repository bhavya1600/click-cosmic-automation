import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  strength?: number; // How strong the magnetic pull is (default: 30)
}

export const MagneticButton = ({ 
  children, 
  className, 
  strength = 30,
  onClick,
  ...props 
}: MagneticButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    
    // Calculate distance from center
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    
    setPosition({ x: x * 0.2, y: y * 0.2 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={buttonRef}
      className={cn(
        "relative overflow-hidden rounded-lg transition-colors group",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      {...(props as any)} // Type assertion for framer-motion compatibility
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500" />
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center">
        {children}
      </span>
    </motion.button>
  );
};


