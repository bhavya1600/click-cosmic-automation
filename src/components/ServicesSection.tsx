import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { siteContent } from "@/data/content";

export const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.fade-in-up');
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('animate');
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 black-bg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            {siteContent.services.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {siteContent.services.subtitle}
          </p>
        </div>
        
        <div className="grid gap-8 md:gap-12">
          {siteContent.services.items.map((service, index) => (
            <div 
              key={index}
              className={`grid md:grid-cols-2 gap-8 items-center fade-in-up ${
                index % 2 === 1 ? 'md:grid-flow-dense' : ''
              }`}
            >
              <div className={index % 2 === 1 ? 'md:col-start-2' : ''}>
                <Card className="cosmic-card rounded-3xl overflow-hidden">
                  <CardContent className="p-8">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {service.ctas.map((cta, ctaIndex) => (
                        <Button
                          key={ctaIndex}
                          variant={ctaIndex === 0 ? "default" : "outline"}
                          className={ctaIndex === 0 ? "cosmic-btn rounded-xl" : "rounded-xl border-primary/50 hover:bg-primary/20"}
                        >
                          {cta}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className={index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}>
                <div className="cosmic-card rounded-3xl overflow-hidden aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-primary animate-pulse"></div>
                    </div>
                    <p className="text-muted-foreground">Service Preview</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};