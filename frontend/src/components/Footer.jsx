/* Footer - Dark footer with logo, links, and social icons */
import { motion } from 'framer-motion';
import { Instagram, Linkedin } from 'lucide-react';

/* Custom X/Twitter icon since lucide doesn't have the new X logo */
function XIcon({ size = 20, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 4l11.733 16H20L8.267 4H4z" />
      <path d="M4 20l6.768-6.768M15.232 7.232L20 4" />
    </svg>
  );
}

/* TikTok icon */
function TikTokIcon({ size = 20, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

const quickLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Download', href: '#download' },
  { label: 'Join Waitlist', href: '#waitlist' },
];

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: XIcon, label: 'Twitter/X', href: '#' },
  { icon: TikTokIcon, label: 'TikTok', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
];

export default function Footer() {
  const handleLinkClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      data-testid="footer"
      className="bg-black border-t border-[#EAFF00]/20 py-12 z-10 relative"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Logo & Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <a href="#" className="font-['Syne'] text-3xl font-extrabold tracking-tight inline-block mb-3">
              Cult<span className="text-[#EAFF00]">Gig</span>
            </a>
            <p className="text-[#a0a0a0] text-base font-['Satoshi'] leading-relaxed">
              Where Talent Meets Opportunity.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:flex md:justify-center"
          >
            <div>
              <h4 className="font-['Syne'] text-sm font-semibold text-[#666] uppercase tracking-widest mb-4">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      data-testid={`footer-link-${link.label.toLowerCase().replace(/\s/g, '-')}`}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-[#a0a0a0] hover:text-[#EAFF00] transition-colors duration-300 text-sm font-['Satoshi']"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:flex md:justify-end"
          >
            <div>
              <h4 className="font-['Syne'] text-sm font-semibold text-[#666] uppercase tracking-widest mb-4">
                Follow Us
              </h4>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    data-testid={`footer-social-${social.label.toLowerCase().replace(/[/\s]/g, '-')}`}
                    className="w-10 h-10 rounded-lg bg-[#111111] border border-white/10 flex items-center justify-center text-[#a0a0a0] hover:text-[#EAFF00] hover:border-[#EAFF00]/50 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#666] text-sm font-['Satoshi']">
            &copy; 2025 CultGig. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              data-testid="footer-privacy-policy"
              className="text-[#666] hover:text-[#a0a0a0] text-sm font-['Satoshi'] transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              data-testid="footer-terms"
              className="text-[#666] hover:text-[#a0a0a0] text-sm font-['Satoshi'] transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
