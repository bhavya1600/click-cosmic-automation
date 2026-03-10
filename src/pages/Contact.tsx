import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { CalEmbed } from "@/components/CalEmbed";
import { Mail, Phone, Calendar } from "lucide-react";
import { useState } from "react";
import { siteContent } from "@/data/content";
import emailjs from '@emailjs/browser';
import { emailConfig } from "@/config/email";
import { ScrollReveal } from "@/components/ScrollReveal";
import { MagneticButton } from "@/components/MagneticButton";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus('idle');

    try {
      const templateParams = {
        name: formData.name,
        title: formData.message,
        email: formData.email,
        company: formData.company || 'Not specified'
      };

       await emailjs.send(
         emailConfig.serviceId,
         emailConfig.templateId,
         templateParams,
         emailConfig.publicKey
       );
      
      setSubmitStatus('success');
      setFormData({ name: "", email: "", company: "", message: "" });
    } catch (error) {
      console.error('Email send failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6 text-white" />,
      title: "Email Us",
      description: "Send us an email anytime",
      value: "bhavyac@behindtheclick.io",
      action: "mailto:bhavyac@behindtheclick.io"
    },
    {
      icon: <Phone className="w-6 h-6 text-white" />,
      title: "Call Us",
      description: "Mon-Fri from 8am to 6pm EST",
      value: "+1 (519) 697-2236",
      action: "tel:+15196972236"
    },
    {
      icon: <Calendar className="w-6 h-6 text-white" />,
      title: "Book a Call",
      description: "Schedule a consultation",
      value: "30-min free consultation",
      action: siteContent.company.calendlyUrl
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-16">
        <AnimatedBackground />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <ScrollReveal direction="down" width="100%">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 animate-gradient-x">Touch</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2} width="100%">
            <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
              Ready to automate your business? Let's discuss how we can help you 
              streamline your operations and boost productivity.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Calendar Booking Section */}
      <section className="py-24 px-4 relative">
         <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-black pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <ScrollReveal width="100%">
            <div className="flex flex-col items-center justify-center text-center mb-12">
              <span className="inline-block px-4 py-1.5 text-sm font-medium bg-purple-900/30 border border-purple-500/30 rounded-full text-purple-300 mb-4 backdrop-blur-sm">
                Get a Quote
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Book Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Free Consultation</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Schedule a 30-minute call to discuss your automation needs and see how we can help transform your business.
              </p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2} width="100%">
            <div className="glass-panel rounded-3xl p-8 neon-border min-h-[600px]">
              <CalEmbed />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal width="100%">
            <div className="flex flex-col items-center justify-center text-center mb-16">
              <span className="inline-block px-4 py-1.5 text-sm font-medium bg-purple-900/30 border border-purple-500/30 rounded-full text-purple-300 mb-4 backdrop-blur-sm">
                Contact Methods
              </span>
              <h2 className="text-4xl font-bold mb-6">Multiple Ways to Connect</h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Choose the method that works best for you. We're here to help!
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <ScrollReveal key={index} delay={index * 0.1} width="100%">
                <a 
                  href={method.action}
                  target={method.title === "Book a Call" ? "_blank" : "_self"}
                  rel={method.title === "Book a Call" ? "noopener noreferrer" : undefined}
                  className="block group h-full"
                >
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="glass-panel border border-white/10 rounded-xl p-8 h-full hover:bg-white/5 transition-colors relative overflow-hidden text-center"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-12 h-12 rounded-lg bg-purple-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        {method.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-white">
                        {method.title}
                      </h3>
                      <p className="text-purple-300 font-medium mb-2 text-lg">
                        {method.value}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {method.description}
                      </p>
                    </div>
                  </motion.div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 px-4 bg-white/5 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <ScrollReveal direction="left" width="100%">
              <div>
                <div className="mb-8 flex flex-col items-center justify-center text-center">
                  <span className="inline-block px-4 py-1.5 text-sm font-medium bg-purple-900/30 border border-purple-500/30 rounded-full text-purple-300 mb-4 backdrop-blur-sm">
                    Send Message
                  </span>
                  <h3 className="text-3xl font-bold mb-4">Tell Us About Your Project</h3>
                  <p className="text-gray-400">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <Input
                        type="text"
                        required
                        className="bg-black/40 border-white/10 text-white placeholder:text-gray-600 focus:border-purple-500/50 focus:ring-purple-500/20 h-12"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        required
                        className="bg-black/40 border-white/10 text-white placeholder:text-gray-600 focus:border-purple-500/50 focus:ring-purple-500/20 h-12"
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Company Name
                    </label>
                    <Input
                      type="text"
                      className="bg-black/40 border-white/10 text-white placeholder:text-gray-600 focus:border-purple-500/50 focus:ring-purple-500/20 h-12"
                      placeholder="Your Company"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Project Details *
                    </label>
                    <Textarea
                      required
                      rows={5}
                      className="bg-black/40 border-white/10 text-white placeholder:text-gray-600 focus:border-purple-500/50 focus:ring-purple-500/20 resize-none"
                      placeholder="Tell us about your automation needs, current challenges, and goals..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                  </div>
                  
                  <MagneticButton 
                    type="submit" 
                    className="w-full bg-purple-600 text-white font-bold py-4 shadow-[0_0_20px_-5px_rgba(147,51,234,0.5)]"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Sending...' : 'Send Message'}
                    {!isLoading && (
                      <svg 
                        width="16" 
                        height="16" 
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
                    )}
                  </MagneticButton>
                   
                   {/* Status Messages */}
                   {submitStatus === 'success' && (
                     <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg"
                     >
                       <p className="text-green-400 text-sm flex items-center gap-2">
                         ✅ Message sent successfully! We'll get back to you within 24 hours.
                       </p>
                     </motion.div>
                   )}
                   
                   {submitStatus === 'error' && (
                     <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
                     >
                       <p className="text-red-400 text-sm flex items-center gap-2">
                         ❌ Failed to send message. Please try again or email us directly.
                       </p>
                     </motion.div>
                   )}
                </form>
              </div>
            </ScrollReveal>

            {/* Quick CTA */}
            <ScrollReveal direction="right" delay={0.2} width="100%">
              <div className="lg:pl-8 h-full flex items-center">
                <div className="glass-panel p-8 rounded-2xl w-full relative overflow-hidden neon-border text-center">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/20 blur-3xl rounded-full -mr-10 -mt-10"></div>
                   
                  <h4 className="text-2xl font-bold text-white mb-4">
                    Prefer to Talk First?
                  </h4>
                  <p className="text-gray-300 mb-8 text-lg">
                    Schedule a free 30-minute consultation to discuss your automation needs directly with an expert.
                  </p>
                  
                  <Button 
                    variant="outline" 
                    className="w-full py-6 text-lg border-purple-500/50 text-purple-300 hover:bg-purple-500/10 hover:text-white transition-all"
                    onClick={() => window.open(siteContent.company.calendlyUrl, '_blank')}
                  >
                    Schedule Call
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
