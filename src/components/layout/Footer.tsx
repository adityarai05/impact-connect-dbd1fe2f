import { Link } from "react-router-dom";
import { Heart, Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-xl font-extrabold text-primary">
              <Heart className="h-6 w-6 fill-secondary text-secondary" />
              ImpactHands
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Empowering communities through volunteerism. Together, we create lasting change.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="rounded-lg bg-muted p-2 text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {["About Us", "Opportunities", "Events", "Blog", "Donate"].map((label) => (
                <Link key={label} to={`/${label.toLowerCase().replace(" ", "-").replace("about-us", "about")}`} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">Support</h4>
            <div className="flex flex-col gap-2">
              {["Contact Us", "FAQ", "Privacy Policy", "Terms of Service"].map((label) => (
                <Link key={label} to="/contact" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">Stay Updated</h4>
            <p className="mb-3 text-sm text-muted-foreground">Get the latest volunteer opportunities in your inbox.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="h-10 flex-1 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
              <Button variant="hero" size="default">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container flex flex-col items-center justify-between gap-2 py-6 text-sm text-muted-foreground md:flex-row">
          <p>© 2026 ImpactHands. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="h-3 w-3 fill-secondary text-secondary" /> for our communities
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
