import { Button } from "@/components/ui/button";
import { siteContent } from "@/data/content";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    // Show buttons after the text animation completes
    const timer = setTimeout(() => {
      setShowButtons(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center cosmic-bg overflow-hidden">
      {/* Cosmic Animation */}
      <div className="plasma-container">
        <div className="plasma"></div>
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <AnimatedText 
            text={siteContent.hero.title} 
            className="block text-foreground"
            delay={100}
          />
          <AnimatedText 
            text={siteContent.hero.titleHighlight} 
            className="block text-gradient mt-2"
            delay={400}
          />
        </h1>
        
        <AnimatedText 
          text={siteContent.hero.subtitle} 
          className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed block"
          delay={700}
        />
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className={`cosmic-btn text-lg px-8 py-6 rounded-xl font-semibold button-animate ${showButtons ? 'animate' : ''}`}
            style={{
              animationDelay: showButtons ? '0s' : '0s',
            }}
          >
            {siteContent.hero.buttons.primary}
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className={`text-lg px-8 py-6 rounded-xl font-semibold border-2 border-primary/50 bg-background/10 backdrop-blur-sm hover:bg-primary/20 button-animate ${showButtons ? 'animate' : ''}`}
            style={{
              animationDelay: showButtons ? '0.2s' : '0s',
            }}
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