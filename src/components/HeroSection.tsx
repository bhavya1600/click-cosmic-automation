import { Button } from "@/components/ui/button";
import { siteContent } from "@/data/content";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center cosmic-bg overflow-hidden">
      {/* Cosmic Animation */}
      <div className="plasma-container">
        <div className="plasma"></div>
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="block text-foreground">{siteContent.hero.title}</span>
          <span className="block text-gradient mt-2">{siteContent.hero.titleHighlight}</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          {siteContent.hero.subtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="cosmic-btn text-lg px-8 py-6 rounded-xl font-semibold"
          >
            {siteContent.hero.buttons.primary}
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-lg px-8 py-6 rounded-xl font-semibold border-2 border-primary/50 bg-background/10 backdrop-blur-sm hover:bg-primary/20"
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