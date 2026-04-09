/* Navbar component - Sticky transparent nav with blur on scroll */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Download', href: '#download' },
  { label: 'Join Waitlist', href: '#waitlist' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 h-20 flex items-center ${
        scrolled
          ? 'bg-black/70 backdrop-blur-xl border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a href="#" data-testid="navbar-logo" className="font-['Syne'] text-2xl font-extrabold tracking-tight">
          Cult<span className="text-[#EAFF00]">Gig</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.slice(0, 3).map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-testid={`nav-link-${link.label.toLowerCase().replace(/\s/g, '-')}`}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium text-[#a0a0a0] hover:text-white transition-colors duration-300 font-['Satoshi']"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#waitlist"
            data-testid="nav-cta-join-waitlist"
            onClick={(e) => handleNavClick(e, '#waitlist')}
            className="bg-[#EAFF00] text-black text-sm font-bold px-6 py-2.5 rounded-full hover:bg-[#d4e600] transition-all duration-300 shadow-[0_0_20px_rgba(234,255,0,0.3)] hover:shadow-[0_0_30px_rgba(234,255,0,0.5)]"
          >
            Join Waitlist
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          data-testid="navbar-mobile-menu-toggle"
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Overlay Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            data-testid="navbar-mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-20 bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-10 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                data-testid={`mobile-nav-link-${link.label.toLowerCase().replace(/\s/g, '-')}`}
                onClick={(e) => handleNavClick(e, link.href)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`text-2xl font-['Syne'] font-bold ${
                  link.label === 'Join Waitlist'
                    ? 'text-[#EAFF00]'
                    : 'text-white hover:text-[#EAFF00]'
                } transition-colors`}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
