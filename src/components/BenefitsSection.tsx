import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            {siteContent.benefits.title}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteContent.benefits.items.map((benefit, index) => {
            const IconComponent = iconMap[benefit.icon as keyof typeof iconMap];
            
            return (
              <Card key={index} className="cosmic-card rounded-3xl fade-in-up group hover:scale-105 transition-transform duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:shadow-glow transition-shadow duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};