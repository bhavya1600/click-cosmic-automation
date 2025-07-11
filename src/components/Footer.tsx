import { siteContent } from "@/data/content";

export const Footer = () => {
  return (
    <footer className="py-16 px-4 border-t border-border/20 black-bg">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-gradient mb-4">
              {siteContent.company.name}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              {siteContent.company.description}
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {siteContent.footer.links.company.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Social</h4>
            <ul className="space-y-3">
              {siteContent.footer.links.social.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
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