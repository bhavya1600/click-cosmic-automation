import { useState } from "react";
import { Button } from "@/components/ui/button";
import { siteContent } from "@/data/content";
import { Menu, X } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { MagneticButton } from "@/components/MagneticButton";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Company Name */}
          <div className="flex items-center gap-3">
            {/* Logo */}
            <img 
              src={`${import.meta.env.BASE_URL}logo.png`}
              alt="BehindTheClick Logo"
              className="w-8 h-8 object-contain"
            />
            {/* Company Name */}
            <Link to="/" className="text-xl font-bold text-white hover:text-purple-400 transition-colors">
              {siteContent.company.name}
            </Link>
          </div>

          {/* Desktop Navigation & CTA Button */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors duration-200 relative group ${
                    isActive(item.href)
                      ? "text-purple-400"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {item.name}
                  {/* Hover underline effect */}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-purple-500 transition-all duration-200 ${
                    isActive(item.href) 
                      ? "w-full" 
                      : "w-0 group-hover:w-full"
                  }`}></span>
                </Link>
              ))}
            </nav>
            
            <MagneticButton 
               className="bg-purple-600 text-white rounded-md font-semibold py-2 px-4 shadow-[0_0_15px_-5px_rgba(147,51,234,0.6)]"
               onClick={() => window.open(siteContent.company.calendlyUrl, '_blank')}
             >
               Book a Call
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
             </MagneticButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white/80 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 py-4 bg-black/95 backdrop-blur-xl">
            <nav className="flex flex-col gap-4 px-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors duration-200 py-2 ${
                    isActive(item.href)
                      ? "text-purple-400"
                      : "text-white/80 hover:text-white"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-2">
                <Button 
                  className="bg-purple-600 text-white w-full"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.open(siteContent.company.calendlyUrl, '_blank');
                  }}
                >
                  Book a Call
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
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
