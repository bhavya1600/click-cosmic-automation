import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Mail, Phone, MapPin, Clock, MessageCircle, Calendar, Instagram } from "lucide-react";
import { useState } from "react";
import { siteContent } from "@/data/content";
import emailjs from '@emailjs/browser';
import { emailConfig } from "@/config/email";

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
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company || 'Not specified',
        message: formData.message,
        to_email: 'bhavyac@behindtheclick.io'
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
    },
    {
      icon: <Instagram className="w-6 h-6 text-white" />,
      title: "Follow Us",
      description: "Latest updates and behind the scenes",
      value: "@behindtheclick_io",
      action: "https://instagram.com/behindtheclick_io"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-16">
        <AnimatedBackground />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="hero-title mb-6">
            Get in <span className="text-gradient">Touch</span>
          </h1>
          <p className="hero-subtitle text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Ready to automate your business? Let's discuss how we can help you 
            streamline your operations and boost productivity.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-24 px-4 black-bg">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 text-xs tag-style border border-muted-foreground/30 rounded-lg text-white opacity-100 mb-4">
              Contact Methods
            </span>
            <h2 className="services-title mb-6">Multiple Ways to Connect</h2>
            <p className="services-subtitle text-muted-foreground max-w-2xl mx-auto">
              Choose the method that works best for you. We're here to help!
            </p>
          </div>
          
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <a 
                key={index} 
                href={method.action}
                target={method.title === "Book a Call" ? "_blank" : "_self"}
                rel={method.title === "Book a Call" ? "noopener noreferrer" : undefined}
                className="benefit-card border border-muted-foreground/30 rounded-lg p-6 group hover:scale-105 transition-transform duration-300 bg-black relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, black 0%, black 60%, rgba(147, 51, 234, 0.15) 90%, rgba(147, 51, 234, 0.3) 100%)'
                }}
              >
                <div className="text-left">
                  <div className="mb-4">
                    {method.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    {method.title}
                  </h3>
                  <p className="text-white/90 leading-relaxed mb-2" style={{fontSize: 'calc(1rem - 1px)'}}>
                    {method.value}
                  </p>
                  <p className="text-white/70 leading-relaxed" style={{fontSize: 'calc(1rem - 1px)'}}>
                    {method.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 px-4 bg-gradient-to-b from-black to-neutral-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <span className="inline-block px-3 py-1 text-xs tag-style border border-muted-foreground/30 rounded-lg text-white opacity-100 mb-4">
                  Send Message
                </span>
                <h3 className="services-title mb-4">Tell Us About Your Project</h3>
                <p className="text-white/80">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      required
                      className="bg-black/40 border-neutral-700 text-white placeholder:text-white/40"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      required
                      className="bg-black/40 border-neutral-700 text-white placeholder:text-white/40"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Company Name
                  </label>
                  <Input
                    type="text"
                    className="bg-black/40 border-neutral-700 text-white placeholder:text-white/40"
                    placeholder="Your Company"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Project Details *
                  </label>
                  <Textarea
                    required
                    rows={5}
                    className="bg-black/40 border-neutral-700 text-white placeholder:text-white/40 resize-none"
                    placeholder="Tell us about your automation needs, current challenges, and goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>
                
                                 <Button 
                   type="submit" 
                   className="cosmic-btn rounded-md font-semibold py-3 px-6 w-full" 
                   disabled={isLoading}
                 >
                   {isLoading ? 'Sending...' : 'Send Message'}
                   {!isLoading && (
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
                   )}
                 </Button>
                 
                 {/* Status Messages */}
                 {submitStatus === 'success' && (
                   <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                     <p className="text-green-400 text-sm">
                       ✅ Message sent successfully! We'll get back to you within 24 hours.
                     </p>
                   </div>
                 )}
                 
                 {submitStatus === 'error' && (
                   <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                     <p className="text-red-400 text-sm">
                       ❌ Failed to send message. Please try again or contact us directly at bhavyac@behindtheclick.io
                     </p>
                   </div>
                 )}
              </form>
            </div>

            {/* Quick CTA */}
            <div className="lg:pl-8">
              <div className="cosmic-card p-6 rounded-2xl bg-black relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, black 0%, black 60%, rgba(147, 51, 234, 0.15) 90%, rgba(147, 51, 234, 0.3) 100%)'
                }}>
                <h4 className="text-lg font-semibold text-white mb-2">
                  Prefer to Talk First?
                </h4>
                <p className="text-white/70 mb-4">
                  Schedule a free 30-minute consultation to discuss your automation needs.
                </p>
                                 <Button 
                   variant="outline" 
                   className="border-primary/50 text-primary hover:bg-primary/10"
                   onClick={() => window.open(siteContent.company.calendlyUrl, '_blank')}
                 >
                   Schedule Call
                 </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact; 