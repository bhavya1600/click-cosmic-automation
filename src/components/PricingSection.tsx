import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Zap, Rocket, Target, CheckCircle, BarChart3, Clock, DollarSign } from "lucide-react";

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

  const services = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Workflow Automation",
      description: "Connect all your tools seamlessly"
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: "Lead Generation",
      description: "Capture and nurture leads 24/7"
    },
    {
      icon: <Rocket className="w-5 h-5" />,
      title: "Smart Websites",
      description: "Custom solutions built for growth"
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 px-4 black-bg">
      <div className="max-w-6xl mx-auto">
        <div className="text-center fade-in-up">
          {/* Tag - matching existing site style */}
          <span className="inline-block px-3 py-1 text-xs tag-style border border-muted-foreground/30 rounded-lg text-white opacity-100 mb-4">
            Custom Solutions
          </span>
          
          {/* Main heading - matching site's title style */}
          <div className="mb-8">
            <h2 className="services-title mb-6">
              💡 Ready to Automate Your <span className="text-gradient">Business</span>?
            </h2>
            <p className="services-subtitle text-muted-foreground max-w-3xl mx-auto opacity-100">
              Every business is unique — so is our pricing. We craft tailored automation 
              solutions to match your exact needs, goals, and budget.
            </p>
          </div>
        </div>

        {/* Services Grid - matching existing card styles */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 fade-in-up">
          {services.map((service, index) => (
            <div 
              key={index}
              className="benefit-card border border-muted-foreground/30 rounded-lg p-6 group hover:scale-105 transition-transform duration-300 bg-black relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, black 0%, black 60%, rgba(147, 51, 234, 0.15) 90%, rgba(147, 51, 234, 0.3) 100%)'
              }}
            >
              <div className="text-left">
                <div className="mb-4 text-white">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {service.title}
                </h3>
                <p className="text-white/70 leading-relaxed" style={{fontSize: 'calc(1rem - 1px)'}}>
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Main CTA Card - matching cosmic-card style */}
        <div className="cosmic-card rounded-3xl p-8 md:p-12 bg-gradient-to-br from-neutral-900/40 to-black/60 fade-in-up">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left side - Custom Pricing */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">
                ✨ Custom Pricing Based on Your Needs
              </h3>
              
              <p className="text-white/70 leading-relaxed">
                Whether you're looking for a full-scale AI automation system or a few strategic integrations, we'll design the perfect plan for you.
              </p>
              
              <div className="space-y-3">
                {[
                  "Full-scale AI automation systems",
                  "Strategic integrations",
                  "Custom workflows & solutions",
                  "Scalable pricing models"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 text-white/80">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right side - Get Quote */}
            <div className="space-y-6 text-center md:text-left">
              <h3 className="text-2xl font-bold text-white">
                📩 Get a Free Quote
              </h3>
              
              <p className="text-white/70 leading-relaxed">
                Tell us about your business and goals, and we'll create a personalized 
                proposal with clear timelines, deliverables, and investment details — no obligation.
              </p>
              
              <Link to="/contact" className="inline-block">
                <Button className="cosmic-btn rounded-md font-semibold py-3 px-6">
                  Get My Free Quote
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
              </Link>
            </div>
          </div>

          {/* Bottom section - What's included */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-center text-white/60 mb-6">What you'll get with your free quote:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: <BarChart3 className="w-5 h-5" />, text: "ROI Analysis" },
                { icon: <Target className="w-5 h-5" />, text: "Custom Strategy" },
                { icon: <Clock className="w-5 h-5" />, text: "Timeline & Milestones" },
                { icon: <DollarSign className="w-5 h-5" />, text: "Transparent Pricing" }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 justify-center">
                  <span className="text-white/50">{item.icon}</span>
                  <span className="text-sm text-white/70">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};