import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Mission & Vision", path: "/mission" },
  { label: "Our Work", path: "/our-work" },
  { label: "Projects", path: "/projects" },
  { label: "Donate", path: "/donate" },
  { label: "Contact", path: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-heading font-bold text-lg">IM</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-heading font-bold text-lg text-foreground tracking-tight">IMAM</span>
              <p className="text-[10px] text-muted-foreground leading-tight -mt-0.5">Imam Mahdi Awareness Mission</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <a
              href="https://zahoorinc.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download Zahoor App
            </a>
            <button
              className="lg:hidden p-2 rounded-md text-foreground hover:bg-muted"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-border overflow-hidden"
          >
            <nav className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? "text-primary bg-primary/5"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://zahoorinc.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 mt-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold"
              >
                <Download className="w-4 h-4" />
                Download Zahoor App
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}