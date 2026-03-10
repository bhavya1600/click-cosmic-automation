import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export const ScrollReveal = ({ 
  children, 
  width = "fit-content", 
  delay = 0,
  className,
  direction = "up"
}: ScrollRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const getDirectionOffset = () => {
    switch (direction) {
      case "up": return { y: 75 };
      case "down": return { y: -75 };
      case "left": return { x: 75 };
      case "right": return { x: -75 };
      case "none": return {};
      default: return { y: 75 };
    }
  };

  return (
    <div ref={ref} style={{ width }} className={cn("overflow-visible", className)}>
      <motion.div
        variants={{
          hidden: { opacity: 0, scale: 0.95, filter: "blur(10px)", ...getDirectionOffset() },
          visible: { 
            opacity: 1, 
            scale: 1,
            filter: "blur(0px)",
            x: 0, 
            y: 0,
            transition: {
              duration: 0.8, 
              ease: [0.16, 1, 0.3, 1], // Custom ease curve
              delay: delay
            }
          },
        }}
        initial="hidden"
        animate={controls}
      >
        {children}
      </motion.div>
    </div>
  );
};


