"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const ids = navItems.map((n) => n.href.slice(1));
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(ids[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleMouseMove = (e: React.MouseEvent, idx: number) => {
    const el = linkRefs.current[idx];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  };

  const handleMouseLeave = (idx: number) => {
    const el = linkRefs.current[idx];
    if (el) el.style.transform = "translate(0, 0)";
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] sm:w-[85%] max-w-6xl hidden md:block"
      >
        <div
          className="rounded-2xl px-5 py-3 flex items-center justify-between transition-all duration-500"
          style={{
            background: scrolled ? "rgba(2,0,20,0.9)" : "rgba(2,0,20,0.5)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid",
            borderColor: scrolled
              ? "rgba(6,182,212,0.15)"
              : "rgba(6,182,212,0.08)",
            boxShadow: scrolled
              ? "0 8px 32px rgba(0,0,0,0.5), 0 0 30px rgba(6,182,212,0.05)"
              : "0 4px 24px rgba(0,0,0,0.3)",
          }}
        >
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNavClick("#hero"); }}
            className="text-lg font-bold tracking-tight"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] via-[#8B5CF6] to-[#A855F7] bg-[length:200%_200%] animate-gradient">
              Portfolio
            </span>
          </a>

          <nav className="flex items-center gap-1">
            {navItems.slice(0, 5).map((item, i) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  ref={(el) => { linkRefs.current[i] = el; }}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                  onMouseMove={(e) => handleMouseMove(e, i)}
                  onMouseLeave={() => handleMouseLeave(i)}
                  className="relative px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200"
                  style={{
                    color: isActive ? "#06B6D4" : "rgba(148,163,184,0.7)",
                    willChange: "transform",
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-lg"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      style={{
                        background: "rgba(6,182,212,0.06)",
                        border: "1px solid rgba(6,182,212,0.15)",
                        boxShadow: "0 0 15px rgba(6,182,212,0.08)",
                      }}
                    />
                  )}
                  <span className="relative z-10 tracking-wide">{item.label}</span>
                </a>
              );
            })}
          </nav>

          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
            className="px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #06B6D4, #8B5CF6)",
              color: "#fff",
              boxShadow: "0 0 20px rgba(6,182,212,0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 0 30px rgba(6,182,212,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 0 20px rgba(6,182,212,0.3)";
            }}
          >
            Hire Me
          </a>
        </div>
      </motion.div>

      <div className="fixed bottom-6 left-0 right-0 z-50 md:hidden flex justify-center px-4">
        <div
          className="flex items-center justify-evenly w-full max-w-sm rounded-2xl py-3 px-1"
          style={{
            background: "rgba(2,0,20,0.9)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(6,182,212,0.12)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          }}
        >
          {navItems.slice(0, 5).map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="flex flex-col items-center gap-0.5 py-1 px-1.5 rounded-xl transition-all duration-300"
                style={{
                  color: isActive ? "#06B6D4" : "rgba(148,163,184,0.5)",
                }}
              >
                <div
                  className="w-1 h-1 rounded-full transition-all duration-300"
                  style={{
                    background: isActive ? "#06B6D4" : "transparent",
                    boxShadow: isActive ? "0 0 6px rgba(6,182,212,0.6)" : "none",
                  }}
                />
                <span className="text-[9px] font-medium tracking-wider uppercase">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
