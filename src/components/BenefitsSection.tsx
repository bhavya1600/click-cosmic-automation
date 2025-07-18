import { useEffect, useRef } from "react";
import { siteContent } from "@/data/content";
import { 
  Zap, 
  Heart, 
  Clock, 
  TrendingDown, 
  BarChart3, 
  TrendingUp 
} from "lucide-react";

const iconMap = {
  Zap,
  Heart,
  Clock,
  TrendingDown,
  BarChart3,
  TrendingUp
};

export const BenefitsSection = () => {
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
              }, index * 150);
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
            Benefits
          </span>
          <h2 className="services-title mb-6" dangerouslySetInnerHTML={{ __html: siteContent.benefits.title }} />
          <p className="services-subtitle text-muted-foreground max-w-3xl mx-auto" dangerouslySetInnerHTML={{ __html: siteContent.benefits.subtitle }} />
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteContent.benefits.items.map((benefit, index) => {
            const IconComponent = iconMap[benefit.icon as keyof typeof iconMap];
            
            return (
              <div key={index} className="benefit-card border border-muted-foreground/30 rounded-lg p-6 fade-in-up group hover:scale-105 transition-transform duration-300">
                <div className="text-left">
                  <div className="mb-4">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed opacity-90" style={{fontSize: 'calc(1rem - 1px)'}}>
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};