import { siteContent } from "@/data/content";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="py-16 px-4 border-t border-border/20 black-bg footer-gradient">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              {/* Logo */}
              <img 
                src={`${import.meta.env.BASE_URL}logo.png`}
                alt="BehindTheClick Logo"
                className="w-8 h-8 object-contain"
              />
              <h3 className="text-2xl font-bold text-white">
                {siteContent.company.name}
              </h3>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md opacity-100">
              {siteContent.company.description}
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {siteContent.footer.links.company.map((link, index) => (
                <li key={index}>
                  {link.href.startsWith('http') ? (
                    <a 
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link 
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Social</h4>
            <ul className="space-y-3">
              {siteContent.footer.links.social.map((link, index) => (
                <li key={index}>
                  {link.href.startsWith('http') ? (
                    <a 
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link 
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border/20 text-center">
          <p className="text-muted-foreground">
            {siteContent.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};