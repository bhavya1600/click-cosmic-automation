import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { siteContent } from "@/data/content";

export const FAQSection = () => {
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
              }, index * 100);
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
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 fade-in-up">
          <span className="inline-block px-3 py-1 text-xs tag-style border border-muted-foreground/30 rounded-lg text-white opacity-100 mb-4">
            FAQs
          </span>
          <h2 className="services-title mb-6" dangerouslySetInnerHTML={{ __html: siteContent.faqs.title }} />
          <p className="services-subtitle text-muted-foreground max-w-3xl mx-auto opacity-100">
            {siteContent.faqs.subtitle}
          </p>
        </div>
        
        <div className="fade-in-up">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {siteContent.faqs.items.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="faq-item border border-muted-foreground/30 rounded-lg bg-card/20 backdrop-blur-sm"
              >
                <AccordionTrigger className="px-6 py-4 text-left font-medium text-white hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-muted-foreground opacity-100 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* CTA Section with Purple Gradient */}
      <div className="mt-24 mx-4">
        <div className="max-w-4xl mx-auto">
          <div className="faq-cta-gradient rounded-3xl p-12 text-center fade-in-up">
            <h3 className="services-title mb-4" dangerouslySetInnerHTML={{ __html: siteContent.faqs.cta.title }} />
            <p className="services-subtitle text-muted-foreground mb-8 opacity-100">
              {siteContent.faqs.cta.subtitle}
            </p>
            <Button 
              className="cosmic-btn cta-button font-semibold"
              onClick={() => window.open(siteContent.company.calendlyUrl, '_blank')}
            >
              {siteContent.faqs.cta.button}
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
          </div>
        </div>
      </div>
    </section>
  );
}; 