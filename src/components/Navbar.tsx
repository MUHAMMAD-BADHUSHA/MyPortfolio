"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassSurface from "./GlassSurface";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const ids = navItems.map((n) => n.href.slice(1));
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top <= 160) {
          setActiveSection(ids[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const glassShadow = scrolled
    ? "0 8px 32px rgba(0,0,0,0.45), 0 0 0 1px rgba(139,92,246,0.15), 0 0 20px rgba(109,40,217,0.06)"
    : "0 4px 24px rgba(0,0,0,0.30), 0 0 0 1px rgba(139,92,246,0.10), 0 0 12px rgba(109,40,217,0.04)";

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 sm:pt-4 px-3 sm:px-4"
    >
      <GlassSurface
        width="100%"
        borderRadius={20}
        borderWidth={0.04}
        brightness={52}
        opacity={scrolled ? 0.92 : 0.85}
        blur={scrolled ? 18 : 14}
        backgroundOpacity={0.18}
        saturation={1.2}
        distortionScale={-160}
        redOffset={0}
        greenOffset={8}
        blueOffset={18}
        className="!max-w-5xl"
        style={{
          boxShadow: glassShadow,
          transition: "box-shadow 0.4s ease, border-color 0.3s ease",
          overflow: "visible",
        }}
      >
        <nav className="flex flex-col w-full">
          <div className="flex items-center justify-between h-14 sm:h-16 px-3 sm:px-4">
            <a href="#hero" className="text-base sm:text-lg font-bold tracking-tight shrink-0">
              <span className="gradient-text">Portfolio</span>
            </a>

            <div className="flex items-center gap-1 sm:gap-2">
              <div className="hidden md:flex items-center gap-0.5">
                {navItems.map((item) => {
                  const isActive = activeSection === item.href.slice(1);
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      className={`relative px-3 lg:px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                        isActive
                          ? "text-primary-light"
                          : "text-text-muted hover:text-text"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="nav-indicator"
                          className="absolute inset-0 rounded-lg"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          style={{
                            background: "rgba(109,40,217,0.08)",
                            boxShadow:
                              "0 0 16px rgba(109,40,217,0.30), 0 0 0 1px rgba(139,92,246,0.35)",
                          }}
                        />
                      )}
                      <span className="relative z-10">{item.label}</span>
                    </a>
                  );
                })}
              </div>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 transition-colors shrink-0"
                aria-label="Toggle menu"
              >
                <div className="flex flex-col items-center gap-1">
                  <motion.span
                    animate={mobileOpen ? { rotate: 45, y: 4.5 } : { rotate: 0, y: 0 }}
                    className="block w-5 h-[2px] bg-text-dim rounded-full origin-center"
                  />
                  <motion.span
                    animate={mobileOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
                    className="block w-4 h-[2px] bg-text-dim/60 rounded-full"
                  />
                  <motion.span
                    animate={mobileOpen ? { rotate: -45, y: -4.5 } : { rotate: 0, y: 0 }}
                    className="block w-5 h-[2px] bg-text-dim rounded-full origin-center"
                  />
                </div>
              </button>
            </div>
          </div>

          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-2 pb-1 space-y-1 border-t border-glass-border px-3 sm:px-4">
                  {navItems.map((item, i) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      initial={{ opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => setMobileOpen(false)}
                      className={`block px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        activeSection === item.href.slice(1)
                          ? "bg-primary/15 text-primary-light"
                          : "text-text-muted hover:text-text hover:bg-white/5"
                      }`}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </GlassSurface>
    </motion.div>
  );
}
