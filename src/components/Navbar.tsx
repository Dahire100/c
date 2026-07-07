/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  activeSection: string;
  onNavClick: (sectionId: string) => void;
}

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Certificates" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function Navbar({ activeSection, onNavClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleItemClick = (id: string) => {
    onNavClick(id);
    setIsOpen(false);
  };

  return (
    <>
      {/* Navbar Container */}
      <nav
        id="navbar"
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl transition-all duration-500`}
      >
        <div
          className={`glass-panel rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between transition-all duration-300 ${
            scrolled ? "bg-[rgba(13,16,28,0.7)] shadow-lg shadow-purple-accent/5 py-2 border-white/15" : ""
          }`}
        >
          {/* Logo */}
          <button
            onClick={() => handleItemClick("home")}
            className="flex items-center gap-2 group cursor-pointer"
            aria-label="Scroll to home"
          >
            <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-slate-900 border border-white/10 group-hover:border-purple-accent/40 transition-all duration-300">
              {/* Spinning gradient ring on hover */}
              <div className="absolute inset-[-1px] rounded-full bg-gradient-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 animate-spin" style={{ animationDuration: "3s" }} />
              <span className="text-sm font-extrabold text-gradient tracking-tight">PK</span>
            </div>
            <span className="text-xs font-mono font-bold tracking-wider hidden md:inline-block text-white/80 group-hover:text-white transition-colors">
              PRATIKSHA.K
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1.5">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 cursor-pointer ${
                    isActive ? "text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  {/* Glowing active background */}
                  {isActive && (
                    <motion.div
                      layoutId="activeGlow"
                      className="absolute inset-0 bg-purple-500/15 border border-purple-500/30 shadow-[0_0_15px_rgba(167,139,250,0.15)] rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Call To Action button (hidden on smaller screens) */}
          <div className="hidden sm:flex items-center">
            <button
              onClick={() => handleItemClick("contact")}
              className="relative px-4 py-1.5 rounded-full text-xs font-medium tracking-wider text-white overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-accent rounded-full opacity-80 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10">Connect</span>
            </button>
          </div>

          {/* Hamburger Menu Toggle (Mobile) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-1.5 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer (Glass Overlay) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-4 top-20 z-40 lg:hidden p-4 rounded-3xl glass-panel max-h-[80vh] overflow-y-auto"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full py-3 px-6 rounded-2xl text-sm font-semibold tracking-wide text-left transition-all ${
                      isActive
                        ? "bg-gradient-accent text-white shadow-lg shadow-purple-500/20"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}

              <button
                onClick={() => handleItemClick("contact")}
                className="w-full mt-4 py-3.5 px-6 rounded-2xl text-sm font-bold text-center text-bg bg-white shadow-lg hover:opacity-90 transition-all"
              >
                Get In Touch
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
