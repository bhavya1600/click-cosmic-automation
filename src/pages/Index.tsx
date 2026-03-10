import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { PricingSection } from "@/components/PricingSection";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Header />
      
      <HeroSection />
      
      <ScrollReveal width="100%" direction="up" delay={0.2}>
        <ServicesSection />
      </ScrollReveal>
      
      <ScrollReveal width="100%" direction="up" delay={0.2}>
        <BenefitsSection />
      </ScrollReveal>
      
      <ScrollReveal width="100%" direction="up" delay={0.2}>
        <PricingSection />
      </ScrollReveal>
      
      <ScrollReveal width="100%" direction="up" delay={0.2}>
        <FAQSection />
      </ScrollReveal>
      
      <Footer />
    </div>
  );
};

export default Index;
