import { useEffect, useRef } from "react";
import { siteContent } from "@/data/content";
import ServicePreviewCard from "./ServicePreviewCard";
import LeadsPreviewCard from "./LeadsPreviewCard";
import AppointmentsPreviewCard from "./AppointmentsPreviewCard";
import SocialMediaPreviewCard from "./SocialMediaPreviewCard";
import CustomAutomationPreviewCard from "./CustomAutomationPreviewCard";

export const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Function to render appropriate preview component for each service
  const renderPreviewCard = (index: number) => {
    switch (index) {
      case 0:
        return <ServicePreviewCard />;
      case 1:
        return <LeadsPreviewCard />;
      case 2:
        return <AppointmentsPreviewCard />;
      case 3:
        return <SocialMediaPreviewCard />;
      case 4:
        return <CustomAutomationPreviewCard />;
      default:
        return <ServicePreviewCard />;
    }
  };

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
    <section id="services-section" ref={sectionRef} className="py-24 px-4 black-bg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 fade-in-up">
          <span className="inline-block px-3 py-1 text-xs tag-style border border-muted-foreground/30 rounded-lg text-white opacity-100 mb-4">
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
                    <span className="inline-block px-3 py-1 text-xs tag-style border border-muted-foreground/30 rounded-lg text-white opacity-100 mb-4">
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
                          className="px-2 py-1 text-xs tag-style border border-muted-foreground/30 rounded-lg text-white opacity-100 cursor-default"
                        >
                          {cta}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className={index % 2 === 0 ? 'md:col-start-1 md:row-start-1' : ''}>
                  <div className="cosmic-card rounded-3xl overflow-hidden aspect-video bg-gradient-to-br from-neutral-900/40 to-black/60 flex items-center justify-center p-6 max-w-md mx-auto">
                    {renderPreviewCard(index)}
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