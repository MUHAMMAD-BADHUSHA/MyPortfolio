"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import GlassSurface from "./GlassSurface";
import Dock from "./Dock";
import { House, User, Code2, FolderGit2, Mail } from "lucide-react";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const dockItems = [
  { label: "Home", icon: <House size={22} />, href: "#hero" },
  { label: "About", icon: <User size={22} />, href: "#about" },
  { label: "Skills", icon: <Code2 size={22} />, href: "#skills" },
  { label: "Projects", icon: <FolderGit2 size={22} />, href: "#projects" },
  { label: "Contact", icon: <Mail size={22} />, href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
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

  const handleNavClick = (href: string) => {
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-50 max-md:hidden flex justify-center pt-3 sm:pt-4 px-2 sm:px-4"
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
          className="w-full max-w-5xl!"
          style={{
            boxShadow: glassShadow,
            transition: "box-shadow 0.3s ease, border-color 0.3s ease",
            overflow: "visible",
          }}
        >
          <nav className="flex flex-col w-full">
            <div className="flex items-center justify-between min-h-14 sm:min-h-16 px-3 sm:px-4 md:px-5">
              <a href="#hero" className="text-base sm:text-lg font-bold tracking-tight shrink-0">
                <span className="gradient-text">Portfolio</span>
              </a>

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
            </div>
          </nav>
        </GlassSurface>
      </motion.div>

      <div className="fixed bottom-4 left-0 right-0 z-50 md:hidden flex justify-center">
        <Dock
          items={dockItems.map((item) => ({
            label: item.label,
            icon: item.icon,
            onClick: () => handleNavClick(item.href),
            className: activeSection === item.href.slice(1) ? "dock-item-active" : "",
          }))}
          panelHeight={76}
          baseItemSize={48}
          magnification={48}
          distance={160}
          dockHeight={76}
        />
      </div>
    </>
  );
}
