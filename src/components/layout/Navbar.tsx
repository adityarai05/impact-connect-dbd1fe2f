import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  to?: string;
  label: string;
  children?: { to: string; label: string }[];
}

const navItems: NavItem[] = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/our-work", label: "Our Work" },
  {
    label: "Get Involved",
    children: [
      { to: "/get-involved/volunteer", label: "Join as Volunteer" },
      { to: "/get-involved/partner", label: "Partner With Us" },
      { to: "/get-involved/careers", label: "Careers" },
      { to: "/get-involved/internships", label: "Internships" },
    ],
  },
  { to: "/opportunities", label: "Opportunities" },
  { to: "/events", label: "Events" },
  { to: "/donate", label: "Donate" },
  { to: "/contact", label: "Contact" },
];

function DesktopDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isActive = item.children?.some((c) => location.pathname === c.to);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted ${isActive ? "bg-muted text-primary" : "text-muted-foreground"}`}
      >
        {item.label} <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute left-0 top-full z-50 mt-1 min-w-[200px] overflow-hidden rounded-xl border border-border bg-card shadow-card"
          >
            {item.children!.map((child) => (
              <Link
                key={child.to}
                to={child.to}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2.5 text-sm transition-colors hover:bg-muted ${location.pathname === child.to ? "bg-muted text-primary" : "text-muted-foreground"}`}
              >
                {child.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-card/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-extrabold text-primary">
          <Heart className="h-6 w-6 fill-secondary text-secondary" />
          <span>ImpactHands</span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) =>
            item.children ? (
              <DesktopDropdown key={item.label} item={item} />
            ) : (
              <Link
                key={item.to}
                to={item.to!}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted ${location.pathname === item.to ? "bg-muted text-primary" : "text-muted-foreground"}`}
              >
                {item.label}
              </Link>
            )
          )}
          <Button variant="hero" size="sm" className="ml-3" asChild>
            <Link to="/get-involved/volunteer">Volunteer Now</Link>
          </Button>
        </div>

        <button className="lg:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border/50 bg-card lg:hidden"
          >
            <div className="container flex flex-col gap-1 py-4">
              {navItems.map((item) =>
                item.children ? (
                  <div key={item.label}>
                    <button
                      onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted"
                    >
                      {item.label}
                      <ChevronDown className={`h-4 w-4 transition-transform ${mobileExpanded === item.label ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {mobileExpanded === item.label && (
                        <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                          {item.children.map((child) => (
                            <Link
                              key={child.to}
                              to={child.to}
                              onClick={() => setOpen(false)}
                              className={`block rounded-lg py-2 pl-8 pr-3 text-sm font-medium transition-colors hover:bg-muted ${location.pathname === child.to ? "bg-muted text-primary" : "text-muted-foreground"}`}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.to}
                    to={item.to!}
                    onClick={() => setOpen(false)}
                    className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted ${location.pathname === item.to ? "bg-muted text-primary" : "text-muted-foreground"}`}
                  >
                    {item.label}
                  </Link>
                )
              )}
              <Button variant="hero" size="lg" className="mt-2" asChild>
                <Link to="/get-involved/volunteer" onClick={() => setOpen(false)}>Volunteer Now</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
