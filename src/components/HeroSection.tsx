import { Button } from "@/components/ui/button";
import { siteContent } from "@/data/content";
import { useEffect, useState } from "react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { useNavigate } from "react-router-dom";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const AnimatedText = ({ text, className, delay = 0 }: AnimatedTextProps) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    console.log('AnimatedText rendered:', text, 'delay:', delay);
    const timer = setTimeout(() => {
      console.log('Animation starting for:', text);
      setAnimate(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, text]);

  return (
    <span className={className}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className={`char-animate ${animate ? 'animate' : ''}`}
          style={{
            animationDelay: animate ? `${index * 0.03}s` : '0s',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

export const HeroSection = () => {
  const [showButtons, setShowButtons] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Show buttons immediately with other animations
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
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* New Badge */}
        <div className={`inline-flex items-center mb-8 button-animate ${showButtons ? 'animate' : ''}`}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full blur-sm opacity-75"></div>
            <div className="relative bg-black/80 backdrop-blur-lg border border-purple-500/30 rounded-full px-4 py-2 flex items-center gap-2">
              <span className="bg-gradient-to-r from-purple-600 to-purple-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                New
              </span>
              <span className="text-white text-sm font-medium">
                AI Voice Assistants
              </span>
            </div>
          </div>
        </div>
        
        <h1 className="hero-title mb-6">
          <AnimatedText 
            text={siteContent.hero.title} 
            className="block"
            delay={100}
          />
          <AnimatedText 
            text={siteContent.hero.titleHighlight} 
            className="block text-gradient mt-2"
            delay={100}
          />
        </h1>
        
        <AnimatedText 
          text={siteContent.hero.subtitle} 
          className="hero-subtitle text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed block"
          delay={100}
        />
        
                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
           <Button 
             className={`cosmic-btn rounded-md font-semibold py-3 px-5 button-animate ${showButtons ? 'animate' : ''}`}
             onClick={handleGetInTouch}
           >
             {siteContent.hero.buttons.primary}
             <svg 
               width="16" 
               height="16" 
               viewBox="0 0 16 16" 
               fill="none" 
               className="ml-2"
             >
               <path 
                 d="M4 12L12 4M12 4H6M12 4V10" 
                 stroke="currentColor" 
                 strokeWidth="2" 
                 strokeLinecap="round" 
                 strokeLinejoin="round"
               />
             </svg>
           </Button>
           <Button 
             variant="outline" 
             className={`rounded-md font-semibold py-3 px-5 border-2 border-primary/50 bg-background/10 backdrop-blur-sm hover:bg-primary/20 button-animate ${showButtons ? 'animate' : ''}`}
             onClick={handleViewServices}
           >
             {siteContent.hero.buttons.secondary}
           </Button>
         </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};