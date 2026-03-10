import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { siteContent } from "@/data/content";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Zap, Target, Users, Award } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { MagneticButton } from "@/components/MagneticButton";
import { motion } from "framer-motion";

const About = () => {
  const values = [
    {
      icon: <Zap className="w-8 h-8 text-purple-400" />,
      title: "Innovation First",
      description: "We're constantly pushing the boundaries of what's possible with automation technology."
    },
    {
      icon: <Target className="w-8 h-8 text-purple-400" />,
      title: "Results Driven",
      description: "Every solution we build is designed to deliver measurable impact for your business."
    },
    {
      icon: <Users className="w-8 h-8 text-purple-400" />,
      title: "Client Focused",
      description: "Your success is our success. We work as an extension of your team."
    },
    {
      icon: <Award className="w-8 h-8 text-purple-400" />,
      title: "Excellence Always",
      description: "We maintain the highest standards in everything we do, from code to customer service."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-16">
        <AnimatedBackground />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <ScrollReveal direction="down">
             <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 animate-gradient-x">BehindTheClick</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
              We're the automation experts who make complex workflows feel effortless. 
              Our mission is to help businesses unlock their potential through intelligent automation.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-4 relative">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-col items-center justify-center text-center mb-16">
              <span className="inline-block px-4 py-1.5 text-sm font-medium bg-purple-900/30 border border-purple-500/30 rounded-full text-purple-300 mb-4 backdrop-blur-sm">
                Our Story
              </span>
              <h2 className="text-4xl font-bold mb-6">The Magic Behind the Automation</h2>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <div className="glass-panel rounded-2xl p-8 md:p-12 neon-border text-center">
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Founded on the belief that technology should work for people, not against them, 
                BehindTheClick was born from a simple observation: businesses were drowning in 
                repetitive tasks that computers could handle better.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Our team of automation specialists, developers, and business consultants came 
                together with one goal: to make powerful automation accessible to every business, 
                regardless of size or technical expertise.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                As a growing startup, we're passionate about delivering exceptional results for our clients. 
                Every project teaches us something new, and we're committed to using that knowledge to 
                build better automation solutions for businesses ready to scale.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Values & CTA Section */}
      <section className="py-24 px-4 relative overflow-hidden">
         {/* Background Gradient */}
         <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black pointer-events-none" />

        {/* Values */}
        <div className="max-w-6xl mx-auto mb-24 relative z-10">
          <ScrollReveal>
            <div className="flex flex-col items-center justify-center text-center mb-16">
              <span className="inline-block px-4 py-1.5 text-sm font-medium bg-purple-900/30 border border-purple-500/30 rounded-full text-purple-300 mb-4 backdrop-blur-sm">
                Our Values
              </span>
              <h2 className="text-4xl font-bold mb-6">What Drives Us Every Day</h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                These core principles guide every decision we make and every solution we build.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <ScrollReveal key={index} delay={index * 0.1} width="100%">
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="text-center p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors h-full"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-purple-900/30 flex items-center justify-center border border-purple-500/20 shadow-[0_0_15px_-5px_rgba(168,85,247,0.5)]">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-white">{value.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{value.description}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto relative z-10">
          <ScrollReveal direction="up">
            <div className="relative rounded-3xl p-12 text-center overflow-hidden border border-purple-500/30">
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-black z-0" />
              
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Transform Your Business?</h3>
                <p className="text-gray-300 mb-8 text-lg">
                  Let's discuss how our automation solutions can help you work smarter, not harder.
                </p>
                
                <MagneticButton 
                  className="bg-purple-600 text-white font-bold py-4 px-8 text-lg shadow-[0_0_30px_-5px_rgba(147,51,234,0.6)]"
                  onClick={() => window.open(siteContent.company.calendlyUrl, '_blank')}
                >
                  Start Your Journey
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 16 16" 
                    fill="none" 
                    className="ml-2 inline-block"
                  >
                    <path 
                      d="M4 12L12 4M12 4H6M12 4V10" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </MagneticButton>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
