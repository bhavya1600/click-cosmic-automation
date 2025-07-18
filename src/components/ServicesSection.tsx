import { useEffect, useRef } from "react";
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
          <span className="inline-block px-3 py-1 text-xs bg-transparent border border-muted-foreground/30 rounded-lg text-white opacity-100 mb-4">
            Our Services
          </span>
          <h2 className="services-title mb-6" dangerouslySetInnerHTML={{ __html: siteContent.services.title }} />
          <p className="services-subtitle text-muted-foreground max-w-3xl mx-auto" dangerouslySetInnerHTML={{ __html: siteContent.services.subtitle }} />
        </div>
        
        <div className="grid gap-8 md:gap-12">
          {siteContent.services.items.map((service, index) => {
            const categoryTags = ["Workflow", "Leads", "Appointments", "Social", "Custom"];
            
            return (
                            <div 
                key={index}
                className={`grid md:grid-cols-2 gap-8 items-center fade-in-up ${
                  index % 2 === 0 ? 'md:grid-flow-dense' : ''
                }`}
              >
                <div className={index % 2 === 0 ? 'md:col-start-2' : ''}>
                  <div className="p-8">
                    <span className="inline-block px-3 py-1 text-xs bg-transparent border border-muted-foreground/30 rounded-lg text-white opacity-100 mb-4">
                      {categoryTags[index]}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-white mb-6 leading-relaxed italic opacity-90" style={{fontSize: '0.9rem'}}>
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.ctas.map((cta, ctaIndex) => (
                        <span
                          key={ctaIndex}
                          className="px-2 py-1 text-xs bg-transparent border border-muted-foreground/30 rounded-lg text-white opacity-100 cursor-default"
                        >
                          {cta}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className={index % 2 === 0 ? 'md:col-start-1 md:row-start-1' : ''}>
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
            );
          })}
        </div>
      </div>
    </section>
  );
};