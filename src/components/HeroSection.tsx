import { Button } from "@/components/ui/button";
import { siteContent } from "@/data/content";
import { useEffect, useState } from "react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { useNavigate } from "react-router-dom";
import { MagneticButton } from "@/components/MagneticButton";
import { motion } from "framer-motion";

// Glitch Text Component
const GlitchText = ({ text, className }: { text: string, className?: string }) => {
  return (
    <div className={`relative inline-block group ${className}`}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-purple-500 opacity-0 group-hover:opacity-70 animate-glitch-1 translate-x-[2px]">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-cyan-500 opacity-0 group-hover:opacity-70 animate-glitch-2 -translate-x-[2px]">
        {text}
      </span>
    </div>
  );
};

export const HeroSection = () => {
  const [showButtons, setShowButtons] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButtons(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleGetInTouch = () => {
    navigate('/contact');
  };

  const handleViewServices = () => {
    const servicesSection = document.getElementById('services-section');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* New Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center mb-8"
        >
          <div className="relative group cursor-default">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-400 rounded-full blur opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 rounded-full px-5 py-2 flex items-center gap-3 shadow-2xl">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 text-sm font-medium tracking-wide">
                AI Voice Assistants
              </span>
            </div>
          </div>
        </motion.div>
        
        <h1 className="hero-title mb-8 font-bold tracking-tight">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="block text-5xl md:text-7xl lg:text-8xl text-white mb-2"
          >
             {siteContent.hero.title}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="block mt-2"
          >
            <GlitchText 
              text={siteContent.hero.titleHighlight} 
              className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 text-5xl md:text-7xl lg:text-8xl animate-gradient-x" 
            />
          </motion.div>
        </h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="hero-subtitle text-gray-400 mb-10 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-light"
        >
          {siteContent.hero.subtitle}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
           <MagneticButton 
             className="bg-purple-600 text-white font-bold py-4 px-8 text-lg shadow-[0_0_30px_-5px_rgba(147,51,234,0.6)] hover:shadow-[0_0_50px_-5px_rgba(147,51,234,0.8)]"
             onClick={handleGetInTouch}
           >
             {siteContent.hero.buttons.primary}
           </MagneticButton>

           <MagneticButton 
             className="bg-transparent text-white border border-white/20 backdrop-blur-md font-medium py-4 px-8 text-lg hover:bg-white/10 hover:border-white/40"
             onClick={handleViewServices}
           >
             {siteContent.hero.buttons.secondary}
           </MagneticButton>
         </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">Scroll</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-purple-500 to-transparent opacity-50"></div>
        </div>
      </motion.div>
    </section>
  );
};
