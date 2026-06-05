"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import TechParticles from "./TechParticles";
import BorderGlow from "./BorderGlow";

interface Tech {
  name: string;
  logo: React.ReactNode;
  color: string;
}

interface Category {
  title: string;
  icon: string;
  techs: Tech[];
}

const ReactLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="2.5" />
    <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(0 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(120 12 12)" />
  </svg>
);

const NextLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-4-4 4-4 1.41 1.41L10.83 12l2.58 2.59L11 17zm5-4l-4 4-1.41-1.41L13.17 12l-2.58-2.59L12 8l4 4z" />
  </svg>
);

const JSLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <rect x="2" y="2" width="20" height="20" rx="2" />
    <path d="M15 18.5c.8.5 1.8.8 2.8.8 1.2 0 2-.5 2-1.5s-.8-1.2-2-1.5c-1.5-.4-3.2-1-3.2-3 0-2 1.8-3.3 4-3.3 1.4 0 2.5.4 3.3 1l-1.5 2c-.5-.4-1-.6-1.8-.6-1 0-1.5.5-1.5 1s.5.8 1.5 1.1c1.5.5 3.2 1 3.2 3 0 2.2-1.8 3.5-4.2 3.5-1.5 0-3-.5-4-1.5l1.5-2zm-7 .5c.3.5.8 1 1.5 1s1.2-.3 1.2-1V12h3v7c0 2-1.5 3-3.5 3s-3-1-3.5-2l1.8-1z" fill="#0A0A0A" />
  </svg>
);

const HTMLLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 2l1.8 18.2L12 22l7.2-1.8L21 2H3zm15.4 4.6H8.6l.2 2.4h9.4l-.6 6.8L12 17.6l-5.6-1.8-.2-2.8h2.6l.2 1.4 3 1 3-1 .4-4H6.2l-.6-6.2h12.8l-.2 2z" />
  </svg>
);

const TailwindLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 6C9.3 6 7.5 7.5 6.5 10.5c1-1.5 2.2-2.1 3.5-1.8.8.2 1.3.7 1.9 1.3C13 10.5 14.2 12 16.5 12c2.7 0 4.5-1.5 5.5-4.5-1 1.5-2.2 2.1-3.5 1.8-.8-.2-1.3-.7-1.9-1.3C15 7.5 13.8 6 12 6zM6.5 12C3.8 12 2 13.5 1 16.5c1-1.5 2.2-2.1 3.5-1.8.8.2 1.3.7 1.9 1.3C7 16.5 8.2 18 10.5 18c2.7 0 4.5-1.5 5.5-4.5-1 1.5-2.2 2.1-3.5 1.8-.8-.2-1.3-.7-1.9-1.3C9 13.5 7.8 12 6.5 12z" />
  </svg>
);

const NodeLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7v10l10 5 10-5V7l-10-5zm-1 17.6l-7-3.5v-7l7 3.5v7zm1-5.1L4.6 11 12 7.5 19.4 11 12 14.5zm8-5.4l-7 3.5v7l7-3.5v-7z" />
  </svg>
);

const ExpressLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-4-4 4-4 1.41 1.41L10.83 12l2.58 2.59L11 17zm5-4l-4 4-1.41-1.41L13.17 12l-2.58-2.59L12 8l4 4z" />
  </svg>
);

const StrapiLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M8 8h8v2H10v2h4v2h-4v4H8V8z" fill="#0A0A0A" />
  </svg>
);

const RestLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M7 12h10M7 12l4-4m-4 4l4 4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17 12l-4-4m4 4l-4 4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MongoLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2l2-8v-2h2v2l2 8h-2l-1-4-1 4z" />
  </svg>
);

const PostgresLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9v-2h2v2zm0-4H9V7h2v6zm4 4h-2v-2h2v2zm0-4h-2V7h2v6z" />
  </svg>
);

const DbLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <ellipse cx="12" cy="6" rx="8" ry="3" />
    <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6" />
    <path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
  </svg>
);

const GitLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6zm4 4h-2v-2h2v2zm0-4h-2V7h2v6z" />
  </svg>
);

const VercelLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 22h20L12 2z" />
  </svg>
);

const RenderLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17l-4-4 4-4 1.41 1.41L10.83 12l2.58 2.59L11 19zm5-4l-4 4-1.41-1.41L13.17 12l-2.58-2.59L12 8l4 4z" />
  </svg>
);

const skillTechs: Category[] = [
  {
    title: "Frontend",
    icon: "⚡",
    techs: [
      { name: "React.js", logo: <ReactLogo />, color: "#61DAFB" },
      { name: "Next.js", logo: <NextLogo />, color: "#FFFFFF" },
      { name: "JavaScript", logo: <JSLogo />, color: "#F7DF1E" },
      { name: "HTML5 & CSS3", logo: <HTMLLogo />, color: "#E34F26" },
      { name: "Tailwind CSS", logo: <TailwindLogo />, color: "#06B6D4" },
    ],
  },
  {
    title: "Backend",
    icon: "🛠️",
    techs: [
      { name: "Node.js", logo: <NodeLogo />, color: "#339933" },
      { name: "Express.js", logo: <ExpressLogo />, color: "#FFFFFF" },
      { name: "Strapi CMS", logo: <StrapiLogo />, color: "#4945FF" },
      { name: "REST APIs", logo: <RestLogo />, color: "#8B5CF6" },
    ],
  },
  {
    title: "Database",
    icon: "🗄️",
    techs: [
      { name: "MongoDB", logo: <MongoLogo />, color: "#47A248" },
      { name: "PostgreSQL", logo: <PostgresLogo />, color: "#4169E1" },
      { name: "Database Design", logo: <DbLogo />, color: "#A78BFA" },
    ],
  },
  {
    title: "Tools",
    icon: "🔧",
    techs: [
      { name: "Git & GitHub", logo: <GitLogo />, color: "#F05032" },
      { name: "Vercel", logo: <VercelLogo />, color: "#FFFFFF" },
      { name: "Render", logo: <RenderLogo />, color: "#46E3B7" },
    ],
  },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0);

  const techs = useMemo(
    () =>
      skillTechs.flatMap((cat) =>
        cat.techs.map((t) => ({ name: t.name, color: t.color }))
      ),
    []
  );

  return (
    <section id="skills" className="relative py-24 sm:py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <TechParticles techs={techs} />
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16 sm:mb-20">
            <span className="inline-block text-sm font-semibold tracking-widest uppercase text-primary-light mb-4">
              Expertise
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Tech <span className="gradient-text">stack</span>
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {skillTechs.map((cat, i) => (
              <button
                key={cat.title}
                onClick={() => setActiveCategory(i)}
                className={`relative px-6 py-3 rounded-xl text-base font-semibold transition-all duration-300 ${activeCategory === i
                    ? "text-text shadow-lg shadow-primary/25"
                    : "text-text-muted bg-glass border border-glass-border hover:bg-glass-hover hover:border-primary/30"
                  }`}
              >
                {activeCategory === i && (
                  <motion.div
                    layoutId="skill-cat-bg"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-primary-light"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <span>{cat.icon}</span>
                  <span>{cat.title}</span>
                </span>
              </button>
            ))}
          </div>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-text">
                {skillTechs[activeCategory].title}
              </h3>
              <span className="text-sm font-medium text-text-dim">
                {skillTechs[activeCategory].techs.length} technologies
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {skillTechs[activeCategory].techs.map((tech) => (
                <BorderGlow
                  key={tech.name}
                  backgroundColor="#121212"
                  borderRadius={16}
                  glowColor="270 60 60"
                  colors={["#6D28D9", "#8B5CF6", "#A78BFA"]}
                  edgeSensitivity={25}
                  glowRadius={20}
                  glowIntensity={0.8}
                >
                  <div className="flex flex-col items-center text-center gap-4 p-5">
                    <div
                      className="w-14 h-14 flex items-center justify-center rounded-xl"
                      style={{
                        backgroundColor: `${tech.color}18`,
                        color: tech.color,
                      }}
                    >
                      <div className="w-8 h-8">{tech.logo}</div>
                    </div>
                    <span className="text-base font-semibold text-text">
                      {tech.name}
                    </span>
                  </div>
                </BorderGlow>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <ScrollReveal delay={0.2}>
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-glass border border-glass-border text-center">
            <p className="text-base sm:text-lg font-medium text-text-muted leading-relaxed max-w-2xl mx-auto">
              Passionate about building scalable, user-focused applications
              and continuously expanding my expertise in modern web technologies.
              Currently deepening my skills in full-stack development and CMS solutions.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
