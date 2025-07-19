import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { siteContent } from "@/data/content";

export const PricingSection = () => {
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
          <span className="inline-block px-3 py-1 text-xs tag-style border border-muted-foreground/30 rounded-lg text-white opacity-100 mb-4">
            Pricing
          </span>
          <h2 className="services-title mb-6" dangerouslySetInnerHTML={{ __html: siteContent.pricing.title }} />
          <p className="services-subtitle text-muted-foreground max-w-3xl mx-auto opacity-100">
            {siteContent.pricing.subtitle}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {siteContent.pricing.plans.map((plan, index) => {
            const getGradientClass = () => {
              if (index === 0 || index === 2) return 'pricing-card-bottom';
              if (index === 1) return 'pricing-card-top';
              return '';
            };

            const getEmoji = () => {
              if (index === 0) return '🚀';
              if (index === 1) return '⚡';
              if (index === 2) return '👑';
              return '';
            };

            return (
              <div 
                key={index} 
                className={`pricing-card ${getGradientClass()} pricing-card-content border border-muted-foreground/30 rounded-lg p-6 fade-in-up relative`}
              >
                <div className="text-left mb-5">
                  <div className="flex items-center mb-3">
                    <h3 className="pricing-card-title font-semibold text-foreground flex items-center">
                      <span className="mr-2">{getEmoji()}</span>
                      {plan.name}
                    </h3>
                    {plan.popular && (
                      <span className="ml-3 px-2 py-1 text-xs tag-style border border-muted-foreground/30 rounded-lg text-white opacity-100">
                        Popular
                      </span>
                    )}
                  </div>
                  <div className="mb-3">
                    <span className="pricing-card-price font-semibold text-foreground">
                      {plan.price}
                    </span>
                    <span className="pricing-card-period text-muted-foreground ml-1">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-muted-foreground opacity-100 mb-4">
                    {plan.description}
                  </p>
                  
                  <Button 
                    className={`w-full py-4 font-semibold rounded-xl mb-4 ${
                      plan.popular 
                        ? 'cosmic-btn' 
                        : 'border-2 border-primary/50 bg-background/10 hover:bg-primary/20'
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </div>
                
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-4 h-4 text-white mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-white opacity-100 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};