"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ExternalLink, Terminal, ChevronDown } from "lucide-react";
import FloatingPanelLeft from "@/components/hero/FloatingPanelLeft";
import FloatingPanelRight from "@/components/hero/FloatingPanelRight";
import SocialDock from "@/components/hero/SocialDock";

const HeroScene = dynamic(() => import("@/components/hero/HeroScene"), { ssr: false });

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLSpanElement>(null);
  const nameLine1Ref = useRef<HTMLSpanElement>(null);
  const nameLine2Ref = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cta1Ref = useRef<HTMLAnchorElement>(null);
  const cta2Ref = useRef<HTMLAnchorElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5 }
      )
        .fromTo(
          greetingRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4 },
          "-=0.2"
        )
        .fromTo(
          nameLine1Ref.current,
          { opacity: 0, y: 30, clipPath: "inset(0 100% 0 0)" },
          { opacity: 1, y: 0, clipPath: "inset(0 0% 0 0)", duration: 0.7 },
          "-=0.2"
        )
        .fromTo(
          nameLine2Ref.current,
          { opacity: 0, y: 30, clipPath: "inset(0 100% 0 0)" },
          { opacity: 1, y: 0, clipPath: "inset(0 0% 0 0)", duration: 0.7 },
          "-=0.3"
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.3"
        )
        .fromTo(
          ctaRef.current ? Array.from(ctaRef.current.children) : [],
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 },
          "-=0.2"
        )
        .fromTo(
          ".hero-left-panel",
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.6 },
          "-=0.5"
        )
        .fromTo(
          ".hero-right-panel",
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.6 },
          "-=0.5"
        )
        .fromTo(
          ".hero-social",
          { opacity: 0, x: -15 },
          { opacity: 1, x: 0, duration: 0.5 },
          "-=0.4"
        )
        .fromTo(
          scrollRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4 },
          "-=0.2"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleNavClick = (href: string) => {
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleMagneticMove = (e: React.MouseEvent, el: HTMLAnchorElement | null) => {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  };

  const handleMagneticLeave = (el: HTMLAnchorElement | null) => {
    if (!el) return;
    el.style.transform = "translate(0, 0)";
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-4 pt-24 overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      <HeroScene />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
        <div
          className="w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
          }}
        />
        <div
          className="w-[400px] h-[400px] rounded-full absolute"
          style={{
            background: "radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 70%)",
          }}
        />
      </div>

      <FloatingPanelLeft />
      <FloatingPanelRight />
      <SocialDock />

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
        <div
          ref={badgeRef}
          className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-wider mb-6"
          style={{
            opacity: 0,
            background: "rgba(6,182,212,0.06)",
            border: "1px solid rgba(6,182,212,0.12)",
            color: "#06B6D4",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: "#06B6D4",
              boxShadow: "0 0 6px rgba(6,182,212,0.6)",
              animation: "pulse-glow 2s ease-in-out infinite",
            }}
          />
          <span>Full Stack Developer</span>
        </div>

        <span
          ref={greetingRef}
          className="hero-greeting block text-sm sm:text-base font-mono tracking-[0.3em] uppercase mb-3"
          style={{ opacity: 0, color: "rgba(148,163,184,0.5)" }}
        >
          Hi, I&apos;m
        </span>

        <h1 className="hero-name leading-[1.05] mb-4">
          <span
            ref={nameLine1Ref}
            className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight"
            style={{
              opacity: 0,
              background: "linear-gradient(135deg, #06B6D4, #8B5CF6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 0 60px rgba(6,182,212,0.15), 0 0 120px rgba(139,92,246,0.1)",
            }}
          >
            Muhammad
          </span>
          <span
            ref={nameLine2Ref}
            className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight"
            style={{
              opacity: 0,
              background: "linear-gradient(135deg, #8B5CF6, #A855F7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 0 60px rgba(139,92,246,0.2), 0 0 120px rgba(168,85,247,0.1)",
            }}
          >
            Badhusha
          </span>
        </h1>

        <p
          ref={descRef}
          className="hero-desc text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-8"
          style={{ opacity: 0, color: "rgba(148,163,184,0.6)" }}
        >
          Junior MERN Stack Developer at WebCastle Technologies.
          Building modern web applications with React, Next.js, Node.js, and Strapi.
        </p>

        <div
          ref={ctaRef}
          className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{ opacity: 0 }}
        >
          <a
            ref={cta1Ref}
            href="#projects"
            onClick={(e) => { e.preventDefault(); handleNavClick("#projects"); }}
            onMouseMove={(e) => handleMagneticMove(e, cta1Ref.current)}
            onMouseLeave={() => handleMagneticLeave(cta1Ref.current)}
            className="group relative px-8 py-3.5 rounded-xl font-medium text-sm tracking-wide overflow-hidden transition-transform duration-100"
            style={{
              background: "linear-gradient(135deg, #06B6D4, #8B5CF6)",
              color: "#fff",
              boxShadow: "0 0 25px rgba(6,182,212,0.3), 0 0 0 1px rgba(6,182,212,0.2)",
              willChange: "transform",
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              View Projects
              <ExternalLink size={14} />
            </span>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
              style={{
                background: "linear-gradient(135deg, #8B5CF6, #06B6D4)",
                filter: "brightness(1.2)",
              }}
            />
          </a>

          <a
            ref={cta2Ref}
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
            onMouseMove={(e) => handleMagneticMove(e, cta2Ref.current)}
            onMouseLeave={() => handleMagneticLeave(cta2Ref.current)}
            className="group relative px-8 py-3.5 rounded-xl font-medium text-sm tracking-wide flex items-center gap-2 overflow-hidden transition-transform duration-100"
            style={{
              background: "rgba(2,0,20,0.5)",
              border: "1px solid rgba(6,182,212,0.2)",
              color: "#06B6D4",
              boxShadow: "0 0 0 1px rgba(6,182,212,0.06)",
              willChange: "transform",
            }}
          >
            <Terminal size={14} />
            Open Terminal
            <span
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "rgba(6,182,212,0.06)" }}
            />
          </a>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: 0 }}
      >
        <span className="text-[10px] font-mono tracking-widest" style={{ color: "rgba(148,163,184,0.3)" }}>
          SCROLL
        </span>
        <div
          style={{ animation: "float 3s ease-in-out infinite" }}
        >
          <ChevronDown size={14} style={{ color: "rgba(148,163,184,0.4)" }} />
        </div>
      </div>
    </section>
  );
}
