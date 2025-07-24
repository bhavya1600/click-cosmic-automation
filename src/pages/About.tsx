import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { siteContent } from "@/data/content";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Zap, Target, Users, Award } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: "Innovation First",
      description: "We're constantly pushing the boundaries of what's possible with automation technology."
    },
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "Results Driven",
      description: "Every solution we build is designed to deliver measurable impact for your business."
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Client Focused",
      description: "Your success is our success. We work as an extension of your team."
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: "Excellence Always",
      description: "We maintain the highest standards in everything we do, from code to customer service."
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-16">
        <AnimatedBackground />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="hero-title mb-6">
            About <span className="text-gradient">BehindTheClick</span>
          </h1>
          <p className="hero-subtitle text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            We're the automation experts who make complex workflows feel effortless. 
            Our mission is to help businesses unlock their potential through intelligent automation.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-4 black-bg">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 text-xs tag-style border border-muted-foreground/30 rounded-lg text-white opacity-100 mb-4">
              Our Story
            </span>
            <h2 className="services-title mb-6">The Magic Behind the Automation</h2>
          </div>
          
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-white/90 text-lg leading-relaxed mb-6">
              Founded on the belief that technology should work for people, not against them, 
              BehindTheClick was born from a simple observation: businesses were drowning in 
              repetitive tasks that computers could handle better.
            </p>
            <p className="text-white/80 leading-relaxed mb-6">
              Our team of automation specialists, developers, and business consultants came 
              together with one goal: to make powerful automation accessible to every business, 
              regardless of size or technical expertise.
            </p>
            <p className="text-white/80 leading-relaxed">
              As a growing startup, we're passionate about delivering exceptional results for our clients. 
              Every project teaches us something new, and we're committed to using that knowledge to 
              build better automation solutions for businesses ready to scale.
            </p>
          </div>
        </div>
      </section>

      {/* Values & CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-black to-neutral-900/50">
        {/* Values */}
        <div className="max-w-6xl mx-auto mb-24">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 text-xs tag-style border border-muted-foreground/30 rounded-lg text-white opacity-100 mb-4">
              Our Values
            </span>
            <h2 className="services-title mb-6">What Drives Us Every Day</h2>
            <p className="services-subtitle text-muted-foreground max-w-2xl mx-auto">
              These core principles guide every decision we make and every solution we build.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">{value.title}</h3>
                <p className="text-white/80 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto">
          <div className="cosmic-card rounded-3xl p-12 text-center bg-black relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, black 0%, black 60%, rgba(147, 51, 234, 0.15) 90%, rgba(147, 51, 234, 0.3) 100%)'
            }}>
            <div className="relative z-10">
              <h3 className="services-title mb-4">Ready to Transform Your Business?</h3>
              <p className="services-subtitle text-muted-foreground mb-8 opacity-100">
                Let's discuss how our automation solutions can help you work smarter, not harder.
              </p>
              <Button 
                className="cosmic-btn cta-button font-semibold"
                onClick={() => window.open(siteContent.company.calendlyUrl, '_blank')}
              >
                Start Your Journey
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

      <Footer />
    </div>
  );
};

export default About; 